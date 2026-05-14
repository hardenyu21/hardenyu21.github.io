import type { Profile } from '../data/profile';

type HeroProps = {
  profile: Profile;
};

export function Hero({ profile }: HeroProps) {
  return (
    <section className="hero" id="top">
      <div className="hero-main">
        <p className="kicker">{profile.location}</p>
        <h1>{profile.name}</h1>
        <p className="hero-title">{profile.tagline}</p>
        <p className="hero-affiliation">
          {profile.title} · {profile.affiliation}
        </p>
        <div className="hero-actions" aria-label="Primary actions">
          <a className="button button-primary" href="#about">
            Learn more
          </a>
          <a className="button button-secondary" href="#publications">
            View work
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
      <div className="hero-visual" aria-label="Research workspace preview">
        <div className="device-shell">
          <div className="device-toolbar">
            <span />
            <span />
            <span />
          </div>
          <div className="device-screen">
            <div className="screen-title">
              <span>Research OS</span>
              <strong>Evidence-first agents</strong>
            </div>
            <div className="screen-grid">
              <div className="screen-panel panel-large">
                <span>Focus</span>
                <strong>{profile.researchInterests[0]}</strong>
              </div>
              <div className="screen-panel">
                <span>Mode</span>
                <strong>Evaluate</strong>
              </div>
              <div className="screen-panel">
                <span>Output</span>
                <strong>Traceable</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="floating-card card-top">
          {profile.researchInterests.slice(0, 2).join(' + ')}
        </div>
        <div className="floating-card card-bottom">AI systems for research and finance</div>
      </div>
    </section>
  );
}
