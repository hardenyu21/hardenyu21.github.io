import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  title: string;
  eyebrow: string;
  children: ReactNode;
};

export function Section({ id, title, eyebrow, children }: SectionProps) {
  return (
    <section className="content-section" id={id}>
      <div className="section-heading">
        <p className="kicker">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <div className="section-body">{children}</div>
    </section>
  );
}
