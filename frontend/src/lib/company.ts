export const COMPANY = {
  legalName: "Bristi Educational Consultancy Pvt. Ltd.",
  shortName: "Bristi",
  foundedYear: "2024",
  tagline: "One of Nepal's top providers of study abroad services for students pursuing an international degree.",
  positioning:
    "Personalized counselling, university applications, visa processing and test preparation for Nepali students — under one roof, with no hidden information.",
  destinations: [
    "Australia",
    "United Kingdom",
    "Canada",
    "South Korea",
    "New Zealand",
    "United States",
    "Europe",
  ],
  hours: "Sunday – Friday: 9:00 AM – 6:00 PM (Saturday Closed)",
};

export const WHO_WE_ARE: string[] = [
  "Bristi Educational Consultancy Pvt. Ltd. was founded in 2024 with a single goal: to give Nepalese students who wish to pursue further education abroad the top-notch facilities, infrastructure and education that international degrees deserve. Numerous students have already been placed in the universities of their choice.",
  "Through our robust professional network of offices, we provide a professional platform to professionals and students looking for opportunities in foreign colleges. We offer our services for study abroad in Australia, the United Kingdom, Canada, South Korea, New Zealand, the United States and numerous other European nations.",
  "Our team is always eager and curious to provide prospective students with better counselling and visa application services in line with evolving international rules and courses. Our main goal is to help students select a course of study that aligns with their professional goals, academic standards and other considerations.",
  "Our helpful and knowledgeable staff walks students through every step of the visa application process — from selecting the course, university and country, to advice on offer letters, enrolment confirmation, visa processing and departure orientation.",
];

export const STATS: { icon: string; value: string; label: string }[] = [
  { icon: "calendar_today", value: "2024", label: "Established In Kathmandu" },
  { icon: "public", value: "8+", label: "Study Destinations" },
  { icon: "account_balance", value: "30+", label: "Partner Universities" },
  { icon: "task_alt", value: "95%", label: "Visa Success" },
];

export const VISION: string[] = [
  "Become a leader by offering clients professional, ethical and high-quality services — helping them reach their objectives by being creative, proactive and prompt.",
  "Keep working toward serving every incoming student and building long-term relationships with education providers, on the strength of the value we have created through honest consultation.",
];

export const MISSION: { icon: string; title: string; text: string }[] = [
  {
    icon: "hub",
    title: "Create Strategic Networks",
    text: "Establishing connections between students and educational providers around Nepal.",
  },
  {
    icon: "lightbulb",
    title: "Assure Clear Guidance",
    text: "Real, accurate information on visa and study abroad procedures.",
  },
  {
    icon: "handshake",
    title: "Develop Durable Alliances",
    text: "Enduring connections with our business partners, built on trust.",
  },
  {
    icon: "verified_user",
    title: "Maintain Ethics",
    text: "Excellent service, delivered with honesty in every single encounter.",
  },
  {
    icon: "sentiment_satisfied",
    title: "Promote Client Satisfaction",
    text: "Constant improvement to consistently surpass expectations.",
  },
];

export const COMMITMENTS: { icon: string; title: string; text: string }[] = [
  {
    icon: "favorite",
    title: "Client Contentment",
    text: "Prioritizing your goals with dedicated, personalized support at every step.",
  },
  {
    icon: "workspace_premium",
    title: "Assurance of Quality",
    text: "Dependable, consistent service that satisfies the highest levels of professionalism.",
  },
  {
    icon: "psychology_alt",
    title: "Comprehensive & Sincere Advice",
    text: "Sincere, knowledgeable guidance based on your academic and professional goals.",
  },
  {
    icon: "fact_check",
    title: "Clear Application Procedure",
    text: "Step-by-step instructions that are unambiguous and contain no hidden information.",
  },
];

export const OFFICES: {
  country: string;
  flag: string;
  icon: string;
  lines: string[];
  hours: string;
  note: string;
  mapUrl: string;
}[] = [
  {
    country: "Nepal",
    flag: "🇳🇵",
    icon: "location_on",
    lines: ["7th Floor, City Square Mall", "Samakhusi Chowk, Kathmandu, Nepal"],
    hours: COMPANY.hours,
    note: "An easily accessible location designed to minimize commuting hassle for our students. Extensive bus and tempo routes connect nearly every part of the city, so reaching our office stays quick and convenient — wherever you are coming from.",
    mapUrl:
      "https://www.google.com/maps/dir/?api=1&destination=City+Square+Mall+Samakhusi+Kathmandu",
  },
];

export const CSR_INTRO: string[] = [
  "In recent years, many business organizations in Nepal have embraced Corporate Social Responsibility and philanthropic initiatives as an integral part of their operations. Recognizing the importance of social awareness and active community engagement, Bristi Educational Consultancy remains committed to fulfilling its responsibility toward creating a positive impact on society.",
];

export const CSR_INITIATIVES: { icon: string; title: string; text: string }[] = [
  {
    icon: "bloodtype",
    title: "Blood Donation Programs",
    text: "Voluntary blood donation drives organised with partner hospitals and student volunteers.",
  },
  {
    icon: "vaccines",
    title: "Free Health Check-ups",
    text: "Health screening camps so preventive care reaches people who rarely get it.",
  },
  {
    icon: "visibility",
    title: "Free Eye Check-ups",
    text: "Eye health camps with visiting specialists, because clear sight changes lives.",
  },
  {
    icon: "flood",
    title: "Emergency Supplies",
    text: "Distribution of emergency supplies to families affected by floods and disasters.",
  },
];
