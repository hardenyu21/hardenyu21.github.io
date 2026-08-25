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
  return (
    <section className="cv-group" aria-labelledby={`cv-${title}`}>
      <h3 id={`cv-${title}`}>{title}</h3>
      <div className="cv-timeline">
        {items.map((item) => {
          const className = ['cv-item', item.logo ? null : 'cv-item-no-logo']
            .filter(Boolean)
            .join(' ');

          return (
            <article className={className} key={`${title}-${item.period}-${item.role}`}>
              {item.logo ? (
                <div className="cv-logo" aria-label={item.logo.alt}>
                  {item.logo.src ? (
                    <img src={item.logo.src} alt={item.logo.alt} loading="lazy" />
                  ) : (
                    <span>{item.logo.label}</span>
                  )}
                </div>
              ) : null}
              {item.institution ? (
                <div className="cv-copy">
                  <p className="cv-entry-summary">
                    {item.period ? <em className="cv-period">{item.period}</em> : null}
                    {item.period ? ', ' : null}
                    {item.role},{' '}
                    {title === 'Education' ? (
                      <span>{item.institution}</span>
                    ) : (
                      <strong>{item.institution}</strong>
                    )}
                    .
                  </p>
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
        <span className="profile-card-mark">HY</span>
        <strong>{profile.name}</strong>
        <p>{cv.headline}</p>
        <dl>
          <div>
            <dt>Location</dt>
            <dd>{cv.location}</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>{profile.researchInterests.slice(0, 3).join(' / ')}</dd>
          </div>
        </dl>
      </aside>

      <div className="cv-groups">
        <CvGroup title="Education" items={cv.education} />
        <CvGroup title="Experience & Internships" items={cv.experience} />
        <CvGroup title="Academic Activities" items={cv.academicActivities} />
      </div>
    </div>
  );
}
