// Types designed for easy database migration

export type Skill = {
  id: string;
  name: string;
  iconName: string;
  category: 'language' | 'framework' | 'tool';
};

export type ProjectHighlight = {
  id: string;
  text: string;
  orderIndex: number;
};

export type Project = {
  id: string;
  title: string;
  role: string;
  description: string;
  highlights: ProjectHighlight[];
  images: string[];
  tags: string[];
  orderIndex: number;
};

export type Profile = {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  email: string;
  github: string;
  graduationYear: number;
  university: string;
};
