import { Fragment, useRef } from 'react';
import type { Publication, PublicationVideo } from '../data/publications';

type PublicationListProps = {
  publications: Publication[];
};

function PublicationVideos({ videos }: { videos: PublicationVideo[] }) {
  const videoGridRef = useRef<HTMLDivElement>(null);

  return (
    <section className="publication-media" aria-label="Video introductions">
      <h4>Video introductions</h4>
      <div className="publication-videos" ref={videoGridRef}>
        {videos.map((video) => (
          <figure className="publication-video" key={video.src}>
            <video
              src={video.src}
              poster={video.poster}
              controls
              playsInline
              preload="none"
              aria-label={video.title}
              onPlay={(event) => {
                videoGridRef.current
                  ?.querySelectorAll('video')
                  .forEach((otherVideo) => {
                    if (otherVideo !== event.currentTarget) {
                      otherVideo.pause();
                    }
                  });
              }}
            >
              Your browser does not support embedded video.{' '}
              <a href={video.src}>Watch the video</a>.
            </video>
            <figcaption>
              <span className="publication-video-title">{video.title}</span>
              <span className="publication-video-duration">
                {video.duration}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function PublicationList({ publications }: PublicationListProps) {
  return (
    <div className="publication-list">
      <div className="publication-stack">
        {publications.map((publication, index) => (
          <article className="publication-item" key={publication.title}>
            <div className="publication-visual">
              <div className="publication-caption">
                <span className="publication-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="publication-badge">{publication.badge}</span>
              </div>
              <img
                src={publication.image.src}
                alt={publication.image.alt}
                loading="lazy"
              />
            </div>

            <div className="item-content publication-copy">
              <h3>{publication.title}</h3>
              <p className="authors">
                {publication.authors.map((author, index) => (
                  <Fragment key={author.name}>
                    {author.highlight ? (
                      <strong className="publication-self">
                        {author.name}
                      </strong>
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
              <p className="publication-author-note">
                {publication.authorNote}
              </p>
              <div
                className="publication-links"
                aria-label={`${publication.title} links`}
              >
                {publication.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>

            {publication.videos?.length ? (
              <PublicationVideos videos={publication.videos} />
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
