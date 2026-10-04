import publicationContent from '../../content/publications.json';

export type PublicationLink = {
  label: string;
  href: string;
};

export type PublicationAuthor = {
  name: string;
  marker?: string;
  highlight?: boolean;
};

export type PublicationVideo = {
  title: string;
  duration: string;
  src: string;
  poster: string;
};

export type Publication = {
  title: string;
  badge: string;
  image: {
    src: string;
    alt: string;
  };
  authors: PublicationAuthor[];
  authorNote: string;
  venue: string;
  year: string;
  links: PublicationLink[];
  videos?: PublicationVideo[];
};

export const publications: Publication[] = publicationContent;
