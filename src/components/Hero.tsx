import type { Profile } from '../data/profile';

type HeroProps = {
  profile: Profile;
};

export function Hero({ profile }: HeroProps) {
  return (
    <section className="hero" id="top">
      <div className="hero-atmosphere" aria-hidden="true">
        <span className="orbit orbit-one" />
        <span className="orbit orbit-two" />
        <span className="signal signal-one" />
        <span className="signal signal-two" />
        <span className="signal signal-three" />
        <span className="trace trace-one" />
        <span className="trace trace-two" />
      </div>

      <div className="hero-brand">
        <a className="hero-mark" href="#top" aria-label="Back to top">
          HY
        </a>
        <span>{profile.name}</span>
      </div>

      <div className="hero-main">
        <p className="kicker">{profile.heroEyebrow}</p>
        <h1 className="mission-title">
          <span>Reliable</span>
          <span className="mission-accent">AI agents</span>
          <span>for</span>
          <span>evidence.</span>
        </h1>
        <p className="hero-subhead">{profile.heroSubhead}</p>
        <p className="hero-affiliation">{profile.title}</p>
        <div className="hero-actions" aria-label="Primary actions">
          <a className="button button-primary" href={profile.primaryCta.href}>
            {profile.primaryCta.label}
          </a>
          <a className="button button-secondary" href={profile.secondaryCta.href}>
            {profile.secondaryCta.label}
          </a>
        </div>
        <div className="hero-links" aria-label="Profile links">
          {profile.links.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
