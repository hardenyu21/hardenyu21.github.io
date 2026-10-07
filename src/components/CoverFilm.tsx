import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
  PlayIcon,
  SpeakerHighIcon,
  SpeakerSlashIcon,
} from '@phosphor-icons/react';

const filmUrl = '/media/hero/landscape.mp4';
const posterUrl = '/images/landscape-poster.webp';
const soundIdleDelayMs = 2500;

type CoverFilmProps = {
  children?: ReactNode;
};

/** 背景、前景与控制分层；声音只在用户明确开启后播放。 */
export function CoverFilm({ children }: CoverFilmProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [requested, setRequested] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(!document.hidden);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let idleTimer: number;
    const hideSoundControl = () => {
      window.clearTimeout(idleTimer);
      stage.dataset.soundIdle = 'true';
    };
    // 高频指针事件只重置计时器，不触发 React 逐帧渲染。
    const showSoundControl = () => {
      window.clearTimeout(idleTimer);
      stage.dataset.soundIdle = 'false';
      idleTimer = window.setTimeout(hideSoundControl, soundIdleDelayMs);
    };
    showSoundControl();
    stage.addEventListener('pointerenter', showSoundControl);
    stage.addEventListener('pointermove', showSoundControl);
    stage.addEventListener('pointerdown', showSoundControl);
    stage.addEventListener('pointerleave', hideSoundControl);
    return () => {
      window.clearTimeout(idleTimer);
      stage.removeEventListener('pointerenter', showSoundControl);
      stage.removeEventListener('pointermove', showSoundControl);
      stage.removeEventListener('pointerdown', showSoundControl);
      stage.removeEventListener('pointerleave', hideSoundControl);
    };
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video || failed) return;
    const nextMuted = !video.muted;
    // 在点击事件中同步更新，保留浏览器要求的用户激活上下文。
    video.muted = nextMuted;
    setMuted(nextMuted);
  };

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setRequested(!preference.matches);
    const updateVisibility = () => setVisible(!document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.intersectionRatio > 0.1),
      { threshold: 0.1, rootMargin: '-80px 0px 0px 0px' }
    );
    if (stageRef.current) observer.observe(stageRef.current);
    preference.addEventListener('change', updatePreference);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', updatePreference);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (requested && inView && visible) setLoaded(true);
  }, [requested, inView, visible]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !filmUrl || !loaded || failed) return;
    let cancelled = false;
    if (requested && inView && visible) {
      void video.play().catch((error: unknown) => {
        if (cancelled) return;
        if (error instanceof DOMException && error.name === 'AbortError')
          return;
        // 自动播放被阻止时，保留静帧并提供明确的手动播放入口。
        setRequested(false);
      });
    } else {
      video.pause();
    }
    return () => {
      cancelled = true;
      video.pause();
    };
  }, [requested, inView, visible, loaded, failed]);

  return (
    <div className="cover-film" ref={stageRef}>
      <div className="cover-film-media" aria-hidden="true">
        <img
          className="cover-film-poster"
          src={posterUrl}
          alt=""
          width="1920"
          height="1080"
          fetchPriority="high"
        />
        {filmUrl && (
          <video
            ref={videoRef}
            className="cover-film-video"
            data-ready={hasFrame && !failed}
            src={loaded ? filmUrl : undefined}
            poster={posterUrl}
            muted={muted}
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            onPlaying={() => setHasFrame(true)}
            onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <div className="cover-film-foreground">{children}</div>
      {filmUrl && (
        <div
          className="cover-film-controls"
          role="group"
          aria-label="Background film controls"
        >
          {!requested && !failed && (
            <button
              className="cover-film-toggle"
              type="button"
              onClick={() => setRequested(true)}
              aria-label="Play background film"
              title="Play background film"
            >
              <PlayIcon size={23} weight="regular" aria-hidden="true" />
            </button>
          )}
          <button
            className="cover-film-toggle cover-film-sound"
            type="button"
            disabled={failed || !hasFrame}
            onClick={toggleSound}
            aria-label="Background sound"
            aria-pressed={!muted}
            title={
              failed
                ? 'Background film unavailable'
                : muted
                  ? 'Turn sound on'
                  : 'Mute sound'
            }
          >
            {muted ? (
              <SpeakerSlashIcon size={24} weight="regular" aria-hidden="true" />
            ) : (
              <SpeakerHighIcon size={24} weight="regular" aria-hidden="true" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
