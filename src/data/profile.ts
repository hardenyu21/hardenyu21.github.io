import profileContent from '../../content/profile.json';
import bioMarkdown from '../../content/bio.md?raw';
import { markdownParagraphs } from './markdown';

export type ProfileLink = {
  label: string;
  href: string;
};

export type ProfileCta = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  heroEyebrow: string;
  heroSubhead: string;
  primaryCta: ProfileCta;
  secondaryCta: ProfileCta;
  researchInterests: string[];
  links: ProfileLink[];
  bio: string[];
};

export const profile: Profile = {
  ...profileContent,
  bio: markdownParagraphs(bioMarkdown),
};
