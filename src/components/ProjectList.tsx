import type { Project } from '../data/projects';

type ProjectListProps = {
  projects: Project[];
};

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="project-list">
      {projects.map((project) => (
        <article className="project-item" key={project.name}>
          <div className="item-meta">
            <span>{project.period}</span>
            <strong>{project.role}</strong>
          </div>
          <div className="item-content">
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
