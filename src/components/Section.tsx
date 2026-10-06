import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  title: string;
  eyebrow: string;
  children: ReactNode;
};

export function Section({ id, title, children }: SectionProps) {
  return (
    <section
      className="content-section"
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <div className="section-heading">
        <h2 id={`${id}-title`}>{title}</h2>
      </div>
      <div className="section-body">{children}</div>
    </section>
  );
}
