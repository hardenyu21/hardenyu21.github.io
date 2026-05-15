import type { Project } from '../data/projects';

type ProjectListProps = {
  projects: Project[];
};

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="project-list">
      {projects.map((project, index) => (
        <article className="project-item system-card" key={project.name}>
          <div className="system-card-visual" aria-hidden="true">
            <span className="system-index">{String(index + 1).padStart(2, '0')}</span>
            <div className="system-lines">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="item-content">
            <div className="item-meta">
              <span>{project.period}</span>
              <strong>{project.role}</strong>
            </div>
            <h3>{project.name}</h3>
            <p>{project.summary}</p>
            <ul className="compact-list">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <div className="tag-row">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            {project.links.length > 0 ? (
              <div className="inline-links">
                {project.links.map((link) => (
                  <a key={link.label} href={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
