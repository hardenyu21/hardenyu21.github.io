import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  title: string;
  eyebrow: string;
  aside?: string;
  children: ReactNode;
};

export function Section({ id, title, eyebrow, aside, children }: SectionProps) {
  return (
    <section className="content-section" id={id}>
      <div className="section-heading">
        <p className="kicker">{eyebrow}</p>
        <h2>{title}</h2>
        {aside ? <p>{aside}</p> : null}
      </div>
      <div className="section-body">{children}</div>
    </section>
  );
}
