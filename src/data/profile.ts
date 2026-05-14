import profileContent from '../../content/profile.json';
import bioMarkdown from '../../content/bio.md?raw';
import { markdownParagraphs } from './markdown';

export type ProfileLink = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  title: string;
  affiliation: string;
  location: string;
  email: string;
  tagline: string;
  researchInterests: string[];
  links: ProfileLink[];
  bio: string[];
  contactNote: string;
};

export const profile: Profile = {
  ...profileContent,
  bio: markdownParagraphs(bioMarkdown),
};
