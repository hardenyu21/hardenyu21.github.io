import { Fragment } from 'react';
import type { Publication } from '../data/publications';

type PublicationListProps = {
  publications: Publication[];
};

export function PublicationList({ publications }: PublicationListProps) {
  return (
    <div className="publication-list">
      <div className="publication-stack">
        {publications.map((publication) => (
          <article className="publication-item" key={publication.title}>
            <div className="publication-visual">
              <span className="publication-badge">{publication.badge}</span>
              <img src={publication.image.src} alt={publication.image.alt} loading="lazy" />
            </div>

            <div className="item-content publication-copy">
              <h3>
                <a href={publication.titleHref} target="_blank" rel="noreferrer">
                  {publication.title}
                </a>
              </h3>
              <p className="authors">
                {publication.authors.map((author, index) => (
                  <Fragment key={author.name}>
                    {author.highlight ? (
                      <strong className="publication-self">{author.name}</strong>
                    ) : (
                      author.name
                    )}
                    {author.marker ? <sup>{author.marker}</sup> : null}
                    {index < publication.authors.length - 1 ? ', ' : ''}
                  </Fragment>
                ))}
              </p>
              <p className="venue">
                In <em>{publication.venue}</em>, {publication.year}.
              </p>
              <div className="publication-links" aria-label={`${publication.title} links`}>
                {publication.links.map((link) => (
                  <span key={link.label}>
                    [<a href={link.href} target="_blank" rel="noreferrer">{link.label}</a>]
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="publication-author-note">* Equal contribution. † Corresponding author.</p>
    </div>
  );
}
