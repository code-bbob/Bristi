import type {
  BlogPost,
  Country,
  CountryDetail,
  EventItem,
  GallerySection,
  Highlight,
  Intake,
  Service,
  TeamMember,
  TestPreparation,
  Testimonial,
  University,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL ?? "http://127.0.0.1:8000";

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText} (${path})`);
  }
  return res.json();
}

interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * Collection fetcher for page composition. A collection that is missing or
 * unreachable degrades to an empty list so one bad endpoint cannot 500 the whole
 * page. Single-resource fetches keep throwing so callers can route to notFound().
 */
async function apiList<T>(path: string): Promise<T[]> {
  try {
    const data = await api<Paginated<T>>(path);
    return data.results ?? [];
  } catch (error) {
    console.warn(`[bristi] ${API_URL}${path} unavailable — rendering with empty data.`, error);
    return [];
  }
}

export async function getCountries(): Promise<Country[]> {
  return apiList<Country>("/api/countries/?limit=50");
}

export async function getCountry(slug: string): Promise<CountryDetail> {
  return api<CountryDetail>(`/api/countries/${slug}/`);
}

export async function getUniversities(countrySlug?: string): Promise<University[]> {
  const filter = countrySlug ? `?country__slug=${countrySlug}` : "";
  return apiList<University>(`/api/universities/${filter}&limit=100`.replace("?&", "?"));
}

export async function getServices(): Promise<Service[]> {
  return apiList<Service>("/api/services/");
}

export async function getService(slug: string): Promise<Service> {
  return api<Service>(`/api/services/${slug}/`);
}

export async function getTestPreparations(): Promise<TestPreparation[]> {
  return apiList<TestPreparation>("/api/test-preparations/");
}

export async function getTestPreparation(slug: string): Promise<TestPreparation> {
  return api<TestPreparation>(`/api/test-preparations/${slug}/`);
}

export async function getBlogs(): Promise<BlogPost[]> {
  return apiList<BlogPost>("/api/blogs/?limit=50");
}

export async function getBlog(slug: string): Promise<BlogPost> {
  return api<BlogPost>(`/api/blogs/${slug}/`);
}

export async function getEvents(): Promise<EventItem[]> {
  return apiList<EventItem>("/api/events/");
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return apiList<Testimonial>("/api/testimonials/?is_featured=true");
}

export async function getHighlights(): Promise<Highlight[]> {
  return apiList<Highlight>("/api/highlights/?is_active=true");
}

export async function getIntakes(): Promise<Intake[]> {
  return apiList<Intake>("/api/intakes/?is_active=true");
}

export async function getGallerySections(): Promise<GallerySection[]> {
  return apiList<GallerySection>("/api/gallery-sections/?limit=50");
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return apiList<TeamMember>("/api/team/?is_active=true&limit=50");
}

export async function sendInquiry(payload: {
  full_name: string;
  phone: string;
  email: string;
  preferred_country: string;
  current_qualification: string;
  message: string;
}): Promise<void> {
  await api("/api/inquiries/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export { API_URL };