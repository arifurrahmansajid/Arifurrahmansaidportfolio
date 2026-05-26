
export interface IBlogMeta {
  views?: number;
  readTime?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export interface IBlog {
  id?: string;
  _id?: string;
  slug: string;
  title: string;
  content: string;
  thumbnail?: string;
  tags: string[];
  categories?: string[];
  status?: "draft" | "published";
  views?: number;
  readTime?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  meta?: IBlogMeta;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IProject {
  id?: string;
  _id?: string;
  title: string;
  thumbnail?: string;
  description: string;
  features: string[];
  technologies: string[];
  githubLink?: string;
  liveSite?: string;
  status: "draft" | "published";
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
