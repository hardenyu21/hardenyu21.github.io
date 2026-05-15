import type { Profile } from '../data/profile';

type HeroProps = {
  profile: Profile;
};

export function Hero({ profile }: HeroProps) {
  return (
    <section className="hero" id="top">
      <div className="hero-main">
        <p className="kicker">{profile.heroEyebrow}</p>
        <h1>{profile.name}</h1>
        <p className="hero-title">{profile.tagline}</p>
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
              <strong>Evidence-first agent workflow</strong>
            </div>
            <div className="research-interface">
              <div className="evidence-graph interface-card">
                <div className="interface-label">Evidence Graph</div>
                <div className="graph-canvas" aria-hidden="true">
                  <span className="node node-source">Sources</span>
                  <span className="node node-claim">Claims</span>
                  <span className="node node-risk">Risks</span>
                  <span className="node node-report">Report</span>
                  <i className="edge edge-one" />
                  <i className="edge edge-two" />
                  <i className="edge edge-three" />
                </div>
              </div>
              <div className="agent-trace interface-card">
                <div className="interface-label">Agent Trace</div>
                <ol>
                  <li>
                    <span>01</span>
                    <strong>Retrieve evidence</strong>
                  </li>
                  <li>
                    <span>02</span>
                    <strong>Check assumptions</strong>
                  </li>
                  <li>
                    <span>03</span>
                    <strong>Write with citations</strong>
                  </li>
                </ol>
              </div>
              <div className="eval-panel interface-card">
                <div className="interface-label">Evaluation Panel</div>
                <div className="metric-row">
                  <span>Traceability</span>
                  <strong>92%</strong>
                </div>
                <div className="metric-row">
                  <span>Failure visibility</span>
                  <strong>High</strong>
                </div>
                <div className="metric-row">
                  <span>Domain</span>
                  <strong>Finance</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
