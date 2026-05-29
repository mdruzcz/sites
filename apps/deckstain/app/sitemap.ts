import { MetadataRoute } from "next";
import { getServices, getCities } from "@/lib/content";
import { site } from "@/lib/site";

const SERVICE_CITY_PAGES = [
  { slug: "deck-staining", city: "london-on" },
  { slug: "deck-staining", city: "woodstock-on" },
  { slug: "deck-staining", city: "kitchener-on" },
  { slug: "deck-staining", city: "cambridge-on" },
  { slug: "deck-staining", city: "brantford-on" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const services = getServices();
  const cities = getCities();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/stain-choices`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/service-areas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/testimonials`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${site.url}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const serviceCityPages: MetadataRoute.Sitemap = SERVICE_CITY_PAGES.map(({ slug, city }) => ({
    url: `${site.url}/services/${slug}/${city}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${site.url}/service-areas/${city.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...serviceCityPages, ...cityPages];
}
