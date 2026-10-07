import { Fragment, useRef } from 'react';
import { FileTextIcon, GithubLogoIcon, GlobeIcon } from '@phosphor-icons/react';
import type { Publication, PublicationVideo } from '../data/publications';

type PublicationListProps = {
  publications: Publication[];
};

/** 资源图标只作视觉提示，链接名称仍由可见文字提供。 */
function PublicationLinkIcon({ label }: { label: string }) {
  if (label === 'Dataset') {
    return (
      <img
        className="publication-link-icon"
        src="/icons/hugging-face.svg"
        alt=""
        aria-hidden="true"
        width="16"
        height="16"
      />
    );
  }
  const Icon =
    label === 'Paper'
      ? FileTextIcon
      : label === 'Code'
        ? GithubLogoIcon
        : GlobeIcon;
  return (
    <Icon
      className="publication-link-icon"
      size={16}
      weight="regular"
      aria-hidden="true"
    />
  );
}

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
        {publications.map((publication) => (
          <article className="publication-item" key={publication.title}>
            <div className="publication-visual">
              <div className="publication-caption">
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
                    <PublicationLinkIcon label={link.label} />
                    {link.label}
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
