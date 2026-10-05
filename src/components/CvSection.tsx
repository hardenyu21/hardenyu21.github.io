import type { CvEntry, CvProfile } from '../data/cv';
import type { Profile } from '../data/profile';

type CvSectionProps = {
  cv: CvProfile;
  profile: Profile;
};

type CvGroupProps = {
  title: string;
  items: CvEntry[];
};

function CvGroup({ title, items }: CvGroupProps) {
  const headingId = `cv-${title.toLowerCase().replace(/[^a-z]+/g, '-')}`;

  return (
    <section className="cv-group" aria-labelledby={headingId}>
      <h3 id={headingId}>{title}</h3>
      <div className="cv-timeline">
        {items.map((item) => {
          const className = ['cv-item', item.logo ? null : 'cv-item-no-logo']
            .filter(Boolean)
            .join(' ');

          return (
            <article
              className={className}
              key={`${title}-${item.period}-${item.role}`}
            >
              {item.logo ? (
                <div className="cv-logo" aria-label={item.logo.alt}>
                  {item.logo.src ? (
                    <img
                      src={item.logo.src}
                      alt={item.logo.alt}
                      loading="lazy"
                    />
                  ) : (
                    <span>{item.logo.label}</span>
                  )}
                </div>
              ) : null}
              {item.institution ? (
                <div className="cv-copy">
                  {item.period ? (
                    <p className="cv-period">{item.period}</p>
                  ) : null}
                  <p className="cv-entry-role">{item.role}</p>
                  <p className="cv-entry-institution">{item.institution}</p>
                  {item.details.length > 0 ? (
                    <ul>
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : (
                <div className="cv-copy cv-service-copy">
                  <strong>{item.title}:</strong>
                  <ul>
                    <li>{item.role}</li>
                  </ul>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function CvSection({ cv, profile }: CvSectionProps) {
  return (
    <div className="cv-layout">
      <aside className="profile-card" aria-label="Profile summary">
        <img
          className="profile-card-photo"
          src={cv.photo.src}
          alt={cv.photo.alt}
          loading="lazy"
        />
        <strong>{profile.name}</strong>
        <p>{cv.headline}</p>
        <dl>
          <div>
            <dt>Location</dt>
            <dd>{cv.location}</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>{profile.researchInterests.join(' / ')}</dd>
          </div>
        </dl>
        <nav
          className="profile-card-links"
          aria-label="Academic and social profiles"
        >
          {cv.profileLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
              aria-label={link.label}
              title={link.label}
            >
              <img src={link.icon} alt="" aria-hidden="true" />
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      <div className="cv-groups">
        <CvGroup title="Education" items={cv.education} />
        <CvGroup title="Experience & Internships" items={cv.experience} />
        <CvGroup title="Academic Activities" items={cv.academicActivities} />
      </div>
    </div>
  );
}
