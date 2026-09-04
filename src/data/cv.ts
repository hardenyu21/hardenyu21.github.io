import cvContent from '../../content/cv.json';

export type CvLogo = {
  src?: string;
  label?: string;
  alt: string;
};

export type CvEntry = {
  period: string;
  institution?: string;
  title?: string;
  role: string;
  location?: string;
  venue?: string;
  details: string[];
  logo?: CvLogo;
};

export type CvProfileLink = {
  label: string;
  href: string;
  icon: string;
};

export type CvProfile = {
  headline: string;
  location: string;
  photo: {
    src: string;
    alt: string;
  };
  profileLinks: CvProfileLink[];
  education: CvEntry[];
  experience: CvEntry[];
  academicActivities: CvEntry[];
};

export const cv: CvProfile = cvContent;
