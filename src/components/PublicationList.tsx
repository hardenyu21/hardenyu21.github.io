import type { Publication } from '../data/publications';

type PublicationListProps = {
  publications: Publication[];
};

export function PublicationList({ publications }: PublicationListProps) {
  const featured = publications.find((publication) => publication.featured);
  const secondary = publications.filter((publication) => publication !== featured);

  return (
    <div className="publication-list">
      {featured ? (
        <article className="featured-publication" key={featured.title}>
          <div className="feature-copy">
            <div className="item-meta">
              <span>{featured.year}</span>
              <strong>Featured</strong>
            </div>
            <h3>{featured.title}</h3>
            <p className="authors">{featured.authors}</p>
            <p className="venue">
              {featured.venue}
              {featured.status ? ` · ${featured.status}` : ''}
            </p>
            <p className="feature-summary">
              A working line on reliable agentic workflows, explicit evaluation, and
              research-grade failure visibility.
            </p>
            <div className="tag-row">
              {featured.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            {featured.links.length > 0 ? (
              <div className="inline-links">
                {featured.links.map((link) => (
                  <a key={link.label} href={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
          <div className="feature-visual" aria-hidden="true">
            <span>Problem</span>
            <strong>Can agents show their work?</strong>
            <i />
            <span>Method</span>
            <strong>Trace every claim to evidence.</strong>
          </div>
        </article>
      ) : null}

      <div className="publication-stack">
        {secondary.map((publication) => (
          <article className="publication-item" key={publication.title}>
            <div className="item-meta">
              <span>{publication.year}</span>
              {publication.featured ? <strong>Selected</strong> : null}
            </div>
            <div className="item-content">
              <h3>{publication.title}</h3>
              <p className="authors">{publication.authors}</p>
              <p className="venue">
                {publication.venue}
                {publication.status ? ` · ${publication.status}` : ''}
              </p>
              <div className="tag-row">
                {publication.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              {publication.links.length > 0 ? (
                <div className="inline-links">
                  {publication.links.map((link) => (
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
    </div>
  );
}
