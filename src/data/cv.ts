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

export type CvProfile = {
  headline: string;
  location: string;
  education: CvEntry[];
  experience: CvEntry[];
  academicActivities: CvEntry[];
};

export const cv: CvProfile = cvContent;
