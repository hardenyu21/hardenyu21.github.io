import { useState } from 'react';
import type { Profile } from '../data/profile';

type HeroProps = {
  profile: Profile;
};

const coverWords = ['See.', 'Create.', 'Interact.', 'Trust.'];

/** 四个研究动词驱动封面构图；鼠标、触摸与键盘都可切换。 */
export function Hero({ profile }: HeroProps) {
  const [frame, setFrame] = useState(0);

  return (
    <section className="hero" id="top" aria-labelledby="hero-name">
      <div className="hero-heading">
        <h1 id="hero-name">{profile.name}</h1>
        <p className="hero-eyebrow">{profile.heroEyebrow}</p>
      </div>
      <div
        className="research-poster"
        data-frame={frame}
        onPointerMove={(event) => {
          if (event.pointerType !== 'mouse') return;
          const rect = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty(
            '--pointer-x',
            String((event.clientX - rect.left) / rect.width - 0.5)
          );
          event.currentTarget.style.setProperty(
            '--pointer-y',
            String((event.clientY - rect.top) / rect.height - 0.5)
          );
        }}
        onPointerLeave={(event) => {
          event.currentTarget.style.setProperty('--pointer-x', '0');
          event.currentTarget.style.setProperty('--pointer-y', '0');
        }}
      >
        <div className="poster-registration" aria-hidden="true">
          <span>+</span>
          <span>+</span>
        </div>
        <div className="poster-drawing" aria-hidden="true">
          <div className="poster-orbit" />
          <div className="poster-axis" />
          <span className="poster-word">{coverWords[frame]}</span>
          <span className="poster-outline">{coverWords[frame]}</span>
          <span className="poster-cross">+</span>
        </div>
        <div className="poster-caption" aria-hidden="true">
          <span>{String(frame + 1).padStart(2, '0')} / 04</span>
          <span>SEE. CREATE. INTERACT. TRUST.</span>
        </div>
      </div>
      <div className="cover-control">
        <div
          className="cover-words"
          role="group"
          aria-label="Explore the cover"
        >
          {coverWords.map((word, index) => (
            <button
              key={word}
              type="button"
              aria-pressed={frame === index}
              onClick={() => setFrame(index)}
            >
              <span className="cover-word-index" aria-hidden="true">
                0{index + 1}
              </span>
              {word}
            </button>
          ))}
        </div>
        <label className="cover-scrubber">
          <span>
            Drag to explore <span aria-hidden="true">⟷</span>
          </span>
          <input
            type="range"
            min="0"
            max="3"
            step="1"
            value={frame}
            onChange={(event) => setFrame(Number(event.target.value))}
            aria-label="Cover composition"
            aria-valuetext={coverWords[frame]}
          />
        </label>
      </div>
      <div className="hero-footer">
        <p className="hero-subhead">{profile.heroSubhead}</p>
        <div className="hero-actions" aria-label="Primary actions">
          <a href={profile.primaryCta.href}>
            {profile.primaryCta.label} <span aria-hidden="true">↘</span>
          </a>
          <a href={profile.secondaryCta.href}>
            {profile.secondaryCta.label} <span aria-hidden="true">↘</span>
          </a>
          {profile.links.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
