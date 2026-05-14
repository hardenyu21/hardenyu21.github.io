import publicationContent from '../../content/publications.json';

export type PublicationLink = {
  label: string;
  href: string;
};

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: string;
  status?: string;
  tags: string[];
  links: PublicationLink[];
  featured?: boolean;
};

export const publications: Publication[] = publicationContent;
