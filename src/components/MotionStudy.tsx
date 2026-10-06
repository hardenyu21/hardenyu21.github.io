import { useEffect, useRef, useState } from 'react';

const LOOP_DURATION = 32000;
const INITIAL_TIME = 0.08;
const SEGMENTS = 192;
const STRANDS = 36;
const TAU = Math.PI * 2;
type Vector = { x: number; y: number; z: number };
type Vertex = Vector & { screenX: number; screenY: number };

/** 将连续曲面编织成丝带，按深度绘制以保留前后遮挡。 */
function drawRibbon(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: { x: number; y: number },
  dark: boolean
) {
  const phase = time * TAU;
  const fold = 0.7 + 0.2 * Math.sin(phase);
  const yaw = 0.32 * Math.sin(phase) + pointer.x * 0.3;
  const tilt = 0.22 + 0.18 * Math.cos(phase) + pointer.y * 0.22;
  const roll = (width < 540 ? -0.82 : -0.28) + 0.12 * Math.sin(phase);
  const scale = Math.min(width / (width < 540 ? 540 : 640), height / 470);
  const vertices: Vertex[][] = [];
  const faces: { points: Vertex[]; depth: number; strand: number }[] = [];
  for (let step = 0; step <= SEGMENTS; step += 1) {
    const u = (step / SEGMENTS) * TAU;
    const center = {
      x: 215 * Math.cos(u),
      y: 120 * Math.sin(u) * (1 - fold) + 100 * Math.sin(2 * u) * fold,
      z: 90 * Math.sin(u) + 25 * Math.sin(2 * u + phase),
    };
    const tangent = {
      x: -215 * Math.sin(u),
      y: 120 * Math.cos(u) * (1 - fold) + 200 * Math.cos(2 * u) * fold,
      z: 90 * Math.cos(u) + 50 * Math.cos(2 * u + phase),
    };
    const length = Math.hypot(tangent.x, tangent.y, tangent.z);
    const flatLength = Math.hypot(tangent.x, tangent.y);
    const normal = {
      x: -tangent.y / flatLength,
      y: tangent.x / flatLength,
      z: 0,
    };
    const binormal = {
      x: (-tangent.z * normal.y) / length,
      y: (tangent.z * normal.x) / length,
      z: (tangent.x * normal.y - tangent.y * normal.x) / length,
    };
    const twist = u + 0.45 * Math.sin(2 * u - phase) + phase;
    const span = 35 + 8 * Math.sin(u + phase);
    vertices.push([]);
    for (let strand = 0; strand <= STRANDS; strand += 1) {
      const v = (strand / STRANDS) * 2 - 1;
      const across = v * span;
      // 横向弧度产生连续高光，不依赖模糊发光。
      const arc = 9 * (1 - v * v);
      const a = across * Math.cos(twist) - arc * Math.sin(twist);
      const b = across * Math.sin(twist) + arc * Math.cos(twist);
      const x = center.x + normal.x * a + binormal.x * b;
      const y = center.y + normal.y * a + binormal.y * b;
      const z = center.z + normal.z * a + binormal.z * b;
      const rx = x * Math.cos(yaw) + z * Math.sin(yaw);
      const rz = -x * Math.sin(yaw) + z * Math.cos(yaw);
      const ry = y * Math.cos(tilt) - rz * Math.sin(tilt);
      const depth = y * Math.sin(tilt) + rz * Math.cos(tilt);
      const rotatedX = rx * Math.cos(roll) - ry * Math.sin(roll);
      const rotatedY = rx * Math.sin(roll) + ry * Math.cos(roll);
      const perspective = 1000 / (1000 - depth);
      vertices[step].push({
        x: rotatedX,
        y: rotatedY,
        z: depth,
        screenX: width / 2 + rotatedX * perspective * scale,
        screenY: height / 2 + rotatedY * perspective * scale,
      });
    }
  }
  for (let step = 0; step < SEGMENTS; step += 1) {
    for (let strand = 0; strand < STRANDS; strand += 1) {
      const points = [
        vertices[step][strand],
        vertices[step + 1][strand],
        vertices[step + 1][strand + 1],
        vertices[step][strand + 1],
      ];
      faces.push({
        points,
        depth: points.reduce((sum, p) => sum + p.z, 0) / 4,
        strand,
      });
    }
  }
  faces.sort((a, b) => a.depth - b.depth);
  context.clearRect(0, 0, width, height);
  context.lineJoin = 'round';
  const low = dark ? [27, 48, 83] : [36, 63, 104];
  const high = dark ? [205, 224, 249] : [195, 216, 241];
  for (const { points, strand } of faces) {
    const [a, b, c] = points;
    const ab = { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z };
    const ac = { x: c.x - a.x, y: c.y - a.y, z: c.z - a.z };
    const n = {
      x: ab.y * ac.z - ab.z * ac.y,
      y: ab.z * ac.x - ab.x * ac.z,
      z: ab.x * ac.y - ab.y * ac.x,
    };
    const normalLength = Math.hypot(n.x, n.y, n.z) || 1;
    const light = Math.abs(
      (-0.32 * n.x - 0.58 * n.y + 0.75 * n.z) / normalLength
    );
    const tone = Math.min(1, 0.12 + light * 0.65 + Math.pow(light, 12) * 0.23);
    const fiber = strand % 2 === 0 ? 2 : -2;
    const color = low.map((value, i) =>
      Math.round(value + (high[i] - value) * tone + fiber)
    );
    context.fillStyle = 'rgb(' + color.join(',') + ')';
    context.strokeStyle = context.fillStyle;
    context.lineWidth = 0.6;
    context.beginPath();
    points.forEach((point, index) => {
      if (index === 0) context.moveTo(point.screenX, point.screenY);
      else context.lineTo(point.screenX, point.screenY);
    });
    context.closePath();
    context.fill();
    context.stroke();
    // 经线沿曲面延伸，强调折叠的方向。
    context.strokeStyle = dark
      ? 'rgba(220,235,255,0.19)'
      : 'rgba(27,55,97,0.15)';
    context.lineWidth = 0.45;
    context.beginPath();
    context.moveTo(a.screenX, a.screenY);
    context.lineTo(b.screenX, b.screenY);
    context.stroke();
  }
}

/** 独立的首屏动态装置，离屏和后台时停止逐帧工作。 */
export function MotionStudy() {
  const [playing, setPlaying] = useState(false);
  const [dragging, setDragging] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timelineRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef(INITIAL_TIME);
  const playingRef = useRef(false);
  const redrawRef = useRef<() => void>(() => {});
  const pointerRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef<{ x: number; time: number } | null>(null);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);
  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!stage || !canvas || !context) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let inView = true;
    let frameId = 0;
    let lastFrame = 0;
    let dark = document.documentElement.dataset.theme === 'dark';
    const pointer = { x: 0, y: 0 };
    const draw = () => {
      drawRibbon(context, width, height, timeRef.current, pointer, dark);
      if (timelineRef.current)
        timelineRef.current.value = String(Math.round(timeRef.current * 1000));
    };
    redrawRef.current = draw;
    const resize = () => {
      width = stage.clientWidth;
      height = stage.clientHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw();
    };
    const animate = (timestamp: number) => {
      if (!inView || document.hidden) {
        frameId = 0;
        lastFrame = 0;
        return;
      }
      if (!lastFrame) lastFrame = timestamp;
      const elapsed = timestamp - lastFrame;
      if (elapsed >= 1000 / 30) {
        const target = preference.matches ? { x: 0, y: 0 } : pointerRef.current;
        const moving =
          Math.abs(target.x - pointer.x) + Math.abs(target.y - pointer.y) >
          0.001;
        pointer.x += (target.x - pointer.x) * 0.08;
        pointer.y += (target.y - pointer.y) * 0.08;
        if (playingRef.current)
          timeRef.current =
            (timeRef.current + Math.min(elapsed, 100) / LOOP_DURATION) % 1;
        if (playingRef.current || moving) draw();
        lastFrame = timestamp;
      }
      frameId = requestAnimationFrame(animate);
    };
    const resume = () => {
      if (inView && !document.hidden && !frameId)
        frameId = requestAnimationFrame(animate);
    };
    const updatePreference = () => setPlaying(!preference.matches);
    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      resume();
    });
    const themeObserver = new MutationObserver(() => {
      dark = document.documentElement.dataset.theme === 'dark';
      draw();
    });
    updatePreference();
    resize();
    resizeObserver.observe(stage);
    visibilityObserver.observe(stage);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    preference.addEventListener('change', updatePreference);
    document.addEventListener('visibilitychange', resume);
    resume();
    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      preference.removeEventListener('change', updatePreference);
      document.removeEventListener('visibilitychange', resume);
      redrawRef.current = () => {};
    };
  }, []);

  return (
    <div className="motion-study">
      <div
        className="motion-stage"
        ref={stageRef}
        data-dragging={dragging}
        role="group"
        aria-label="Interactive ribbon sculpture"
        aria-describedby="motion-instructions"
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          dragRef.current = { x: event.clientX, time: timeRef.current };
          setDragging(true);
          setPlaying(false);
        }}
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          if (dragRef.current) {
            timeRef.current =
              (((dragRef.current.time +
                (event.clientX - dragRef.current.x) / rect.width) %
                1) +
                1) %
              1;
            redrawRef.current();
          } else if (event.pointerType !== 'touch') {
            pointerRef.current = {
              x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
              y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
            };
          }
        }}
        onPointerLeave={() => {
          pointerRef.current = { x: 0, y: 0 };
        }}
        onLostPointerCapture={() => {
          dragRef.current = null;
          setDragging(false);
        }}
        onPointerUp={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            event.currentTarget.releasePointerCapture(event.pointerId);
        }}
      >
        <canvas ref={canvasRef} aria-hidden="true" />
        <span className="motion-instructions" id="motion-instructions">
          Move the pointer to change the view. Drag horizontally or use the
          animation timeline to unfold the ribbon.
        </span>
      </div>
      <div className="motion-transport">
        <button
          type="button"
          className="motion-play"
          onClick={() => setPlaying((value) => !value)}
          aria-label={playing ? 'Pause animation' : 'Play animation'}
          title={playing ? 'Pause animation' : 'Play animation'}
        >
          <span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span>
        </button>
        <input
          type="range"
          min="0"
          max="1000"
          step="1"
          ref={timelineRef}
          defaultValue={Math.round(INITIAL_TIME * 1000)}
          aria-label="Animation timeline"
          onChange={(event) => {
            setPlaying(false);
            timeRef.current = Number(event.target.value) / 1000;
            redrawRef.current();
          }}
        />
      </div>
    </div>
  );
}
