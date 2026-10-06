import type { Profile } from '../data/profile';
import { MotionStudy } from './MotionStudy';

type HeroProps = {
  profile: Profile;
};

/** 以纯动画开场，身份信息留给导航和正文。 */
export function Hero({ profile }: HeroProps) {
  return (
    <section className="hero" id="top" aria-label={profile.name}>
      <h1 className="cover-accessible-title">{profile.name}</h1>
      <MotionStudy />
      <nav className="cover-links" aria-label="Primary actions">
        {profile.links.map((link) => (
          <a key={link.label} href={link.href}>
            {link.label} <span aria-hidden="true">↗</span>
          </a>
        ))}
        <a href={profile.primaryCta.href}>{profile.primaryCta.label}</a>
        <a href={profile.secondaryCta.href}>
          {profile.secondaryCta.label} <span aria-hidden="true">↘</span>
        </a>
      </nav>
    </section>
  );
}
