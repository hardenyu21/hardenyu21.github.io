import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CvSection } from './components/CvSection';
import { NewsList } from './components/NewsList';
// import { ProjectList } from './components/ProjectList';
import { PublicationList } from './components/PublicationList';
import { Section } from './components/Section';
import { Footer } from './components/Footer';
import { cv } from './data/cv';
import { news } from './data/news';
import { profile } from './data/profile';
// import { projects } from './data/projects';
import { publications } from './data/publications';

function renderInlineMarkdown(text: string) {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a key={`${part}-${index}`} href={link[2]}>
          {link[1]}
        </a>
      );
    }

    return part;
  });
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero profile={profile} />

        <Section
          id="about"
          title="About Me"
          eyebrow="Research agenda"
        >
          <div className="prose">
            {profile.bio.map((paragraph) => (
              <p key={paragraph}>{renderInlineMarkdown(paragraph)}</p>
            ))}
          </div>
          <div className="interest-grid" aria-label="Research interests">
            {profile.researchInterests.map((interest) => (
              <span key={interest}>{interest}</span>
            ))}
          </div>
        </Section>

        <Section
          id="news"
          title="Recent News"
          eyebrow="Updates"
        >
          <NewsList items={news} />
        </Section>

        <Section
          id="publications"
          title="Publications"
          eyebrow="Selected work"
        >
          <PublicationList publications={publications} />
        </Section>

        {/* Projects is temporarily hidden.
        <Section id="projects" title="Projects" eyebrow="Research systems">
          <ProjectList projects={projects} />
        </Section>
        */}

        <Section
          id="profile"
          title="Academic Profile"
          eyebrow="CV"
        >
          <CvSection cv={cv} profile={profile} />
        </Section>
      </main>
      <Footer />
    </>
  );
}
