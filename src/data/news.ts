import newsContent from '../../content/news.json';

export type NewsItem = {
  date: string;
  emoji: string;
  text: string;
  href?: string;
};

export const news: NewsItem[] = newsContent;
