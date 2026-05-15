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
            <p>Papers and protocols with evidence-first evaluation.</p>
          </a>
          <a className="promo-card" href="#projects">
            <span className="promo-kicker">Research systems</span>
            <strong>Projects</strong>
            <p>Agent workflows designed to fail loudly and trace decisions.</p>
          </a>
          <a className="promo-card" href="#news">
            <span className="promo-kicker">Recent updates</span>
            <strong>Recent News</strong>
            <p>Updates, notes, and milestones from ongoing research.</p>
          </a>
        </section>

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
          title="Recent News"
          eyebrow="Updates"
          aside="A compact log for milestones, notes, and active research directions."
        >
          <NewsList items={news} />
        </Section>

        <Section
          id="about"
          title="Research Agenda"
          eyebrow="About"
          aside="A concise view of the research stance behind the systems."
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
