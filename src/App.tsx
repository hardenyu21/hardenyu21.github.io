import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { NewsList } from './components/NewsList';
import { ProjectList } from './components/ProjectList';
import { PublicationList } from './components/PublicationList';
import { Section } from './components/Section';
import { Footer } from './components/Footer';
import { news } from './data/news';
import { profile } from './data/profile';
import { projects } from './data/projects';
import { publications } from './data/publications';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero profile={profile} />

        <section className="promo-grid" aria-label="Homepage highlights">
          <a className="promo-card promo-dark" href="#publications">
            <span className="promo-kicker">Selected work</span>
            <strong>Publications</strong>
            <p>Representative papers, working manuscripts, and evaluation protocols.</p>
          </a>
          <a className="promo-card" href="#projects">
            <span className="promo-kicker">Research systems</span>
            <strong>Projects</strong>
            <p>Agent workflows and financial evidence analysis tools built for traceability.</p>
          </a>
          <a className="promo-card" href="#news">
            <span className="promo-kicker">Updates</span>
            <strong>News</strong>
            <p>A compact log of academic, research, and project milestones.</p>
          </a>
        </section>

        <Section
          id="about"
          title="About"
          eyebrow="Research profile"
          aside="A concise biography and research agenda."
        >
          <div className="prose">
            {profile.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="interest-grid" aria-label="Research interests">
            {profile.researchInterests.map((interest) => (
              <span key={interest}>{interest}</span>
            ))}
          </div>
        </Section>

        <Section
          id="publications"
          title="Publications"
          eyebrow="Selected work"
          aside="Representative papers and working manuscripts."
        >
          <PublicationList publications={publications} />
        </Section>

        <Section
          id="projects"
          title="Projects"
          eyebrow="Research systems"
          aside="Systems, agents, and reproducible research infrastructure."
        >
          <ProjectList projects={projects} />
        </Section>

        <Section
          id="news"
          title="News"
          eyebrow="Updates"
          aside="A compact log for notable academic and project milestones."
        >
          <NewsList items={news} />
        </Section>

        <Section
          id="contact"
          title="Contact"
          eyebrow="Collaboration"
          aside="For research discussion, collaboration, and talks."
        >
          <div className="contact-block">
            <p>{profile.contactNote}</p>
            <a className="primary-link" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
