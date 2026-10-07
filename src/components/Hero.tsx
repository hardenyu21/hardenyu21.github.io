import type { Profile } from '../data/profile';
import { CoverFilm } from './CoverFilm';

type HeroProps = {
  profile: Profile;
};

/** 无标语的生成影片开场，身份信息留给导航和正文。 */
export function Hero({ profile }: HeroProps) {
  return (
    <section className="hero" id="top" aria-label={profile.name}>
      <h1 className="cover-accessible-title">{profile.name}</h1>
      <CoverFilm />
    </section>
  );
}
