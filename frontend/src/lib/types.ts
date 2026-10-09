export interface Country {
  id: number;
  name: string;
  slug: string;
  flag_emoji: string;
  tagline: string;
  description: string;
  highlights: string;
  intake: string;
  tuition_range: string;
  work_rights: string;
  image: string | null;
  universities_count: number;
  order: number;
}

export interface University {
  id: number;
  name: string;
  slug: string;
  country: string;
  country_name: string;
  city: string;
  description: string;
  courses: string;
  intake: string;
  website: string;
  image: string | null;
  order: number;
}

export interface CountrySection {
  id: number;
  heading: string;
  style: "text" | "facts" | "list" | "steps" | "table" | "banner";
  body: string;
  items: string[];
  rows: { label: string; value: string }[];
  image: string | null;
  order: number;
}

export interface CountryDetail extends Country {
  universities: University[];
  sections: CountrySection[];
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  icon: string;
  short_description: string;
  description: string;
  image: string | null;
  order: number;
}

export interface TestPreparation {
  id: number;
  title: string;
  slug: string;
  icon: string;
  short_description: string;
  description: string;
  image: string | null;
  order: number;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  author: string;
  cover_image: string | null;
  published_at: string;
  tags: string;
}

export interface EventItem {
  id: number;
  title: string;
  slug: string;
  event_date: string;
  location: string;
  short_description: string;
  description: string;
  image: string | null;
}

export interface Testimonial {
  id: number;
  name: string;
  destination: string;
  university: string;
  course: string;
  quote: string;
  rating: number;
  is_featured: boolean;
  order: number;
}

export interface Highlight {
  id: number;
  text: string;
  link: string;
  order: number;
}

export interface Intake {
  id: number;
  country_name: string;
  country_slug: string;
  country_flag: string;
  intake: string;
  start_date: string | null;
  deadline: string;
  order: number;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  group: string;
  qualification: string;
  bio: string;
  photo: string | null;
  order: number;
}

export interface GalleryImage {
  id: number;
  title: string;
  image: string | null;
  section: string;
  section_name: string;
  order: number;
}

export interface GallerySection {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
  image_count: number;
  images: GalleryImage[];
  order: number;
}
