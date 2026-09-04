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

export type Publication = {
  title: string;
  titleHref: string;
  badge: string;
  image: {
    src: string;
    alt: string;
  };
  authors: PublicationAuthor[];
  venue: string;
  year: string;
  links: PublicationLink[];
};

export const publications: Publication[] = publicationContent;
