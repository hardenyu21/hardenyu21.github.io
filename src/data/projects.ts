import projectContent from '../../content/projects.json';

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  name: string;
  summary: string;
  role: string;
  period: string;
  tags: string[];
  highlights: string[];
  links: ProjectLink[];
};

export const projects: Project[] = projectContent;
