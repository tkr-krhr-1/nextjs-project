export interface Post {
  title: string;
  slug: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  coverImage?: string;
  content: string;
}
