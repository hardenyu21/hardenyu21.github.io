import cvContent from '../../content/cv.json';

export type CvEntry = {
  period: string;
  institution?: string;
  title?: string;
  role: string;
  location?: string;
  venue?: string;
  details: string[];
};

export type CvProfile = {
  education: CvEntry[];
  experience: CvEntry[];
  academicActivities: CvEntry[];
};

export const cv: CvProfile = cvContent;
