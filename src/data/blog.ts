import blogContent from '../../content/blog.json';

export type BlogPost = {
  slug: string;
  title: string;
  titleChunks?: string[];
  summary: string;
  date: string;
  category: string;
  tags: string[];
  href: string;
};

export const blogPosts: BlogPost[] = blogContent;
