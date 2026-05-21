export const site = {
  name: "Woodstock Concrete Forming",
  shortName: "WCF",
  // TODO: Replace with actual business phone number before launch
  phone: "(519) 539-0000",
  phoneHref: "tel:+15195390000",
  email: "info@woodstockconcreteforming.ca",
  emailHref: "mailto:info@woodstockconcreteforming.ca",
  address: {
    city: "Woodstock",
    region: "ON",
    country: "CA",
  },
  addressLine: "Woodstock, ON",
  hours: "Mon – Fri · 7 AM – 6 PM | Sat · 8 AM – 2 PM",
  yearsExperience: 10,
  url: "https://woodstockconcreteforming.ca",
  tagline: "Solid Foundations. Clean Finishes.",
  description:
    "Expert concrete driveways and patios in Woodstock, Brantford, and Cambridge. Natural broom finish and coloured stamped concrete built for Ontario winters — reinforced, properly graded, and backed by a written warranty.",
  serviceAreas: ["Woodstock", "Brantford", "Cambridge", "Ingersoll", "Paris", "London"],
  stats: {
    driveways: 350,
    patios: 200,
    happyHomes: 550,
    yearsLifespan: 30,
  },
  finishOptions: ["Natural Broom Finish", "Coloured Concrete", "Stamped Concrete", "Exposed Aggregate"],
  features: [
    "Written warranty on every pour",
    "Engineered for Ontario freeze-thaw cycles",
    "Reinforced rebar + wire mesh",
    "Proper drainage + grading included",
    "Free on-site quote within 48 hours",
    "Fully insured + WSIB compliant",
  ],
  trustBadges: [
    { label: "Google Reviews", value: "4.9 / 5 Stars" },
    { label: "Years in Business", value: "10+ Years" },
    { label: "Projects Completed", value: "550+ Pours" },
    { label: "Warranty", value: "Written Guarantee" },
  ],
  responseTime: "4 business hours",
} as const;
