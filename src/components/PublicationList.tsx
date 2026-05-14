import type { Publication } from '../data/publications';

type PublicationListProps = {
  publications: Publication[];
};

export function PublicationList({ publications }: PublicationListProps) {
  return (
    <div className="publication-list">
      {publications.map((publication) => (
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
  );
}
