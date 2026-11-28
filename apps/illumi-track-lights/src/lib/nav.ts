// One list of links for the header rows, the mobile menu and the footer.

export interface NavLink {
  label: string;
  href: string;
}

/** Top strip, left side. */
export const UTILITY_LINKS: NavLink[] = [
  { label: "Guides & How-To", href: "/resources" },
  { label: "Shipping & Pickup", href: "/shipping-returns" },
  { label: "Warranty & Returns", href: "/warranty" },
  { label: "Contact Us", href: "/contact-us" }
];

/** Small-caps row: what to read and where to start. */
export const PRIMARY_LINKS: NavLink[] = [
  { label: "Track Lighting Kits", href: "/diy-kits" },
  { label: "All Parts", href: "/shop" },
  { label: "Brands Compared", href: "/brands" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Photo Gallery", href: "/gallery" },
  { label: "Installation", href: "/installation" }
];

/** Grey strip: straight to a shelf. */
export const SHELF_LINKS: NavLink[] = [
  { label: "50 ft Kit", href: "/product/led-housing-package-50" },
  { label: "75 ft", href: "/product/led-housing-package-75" },
  { label: "100 ft", href: "/product/led-housing-package-100" },
  { label: "150 ft", href: "/product/led-housing-package-150" },
  { label: "200 ft", href: "/product/led-housing-package-200" },
  { label: "250 ft", href: "/product/led-housing-package-250" },
  { label: "Puck Lights", href: "/product-category/lights" },
  { label: "Track & Screws", href: "/product-category/hardware" },
  { label: "Controllers", href: "/product-category/controllers" },
  { label: "Power Supplies", href: "/product-category/power-supplies" },
  { label: "Connectors", href: "/product-category/connectors" }
];

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: "Customer Service",
    links: [
      { label: "Track your order", href: "/track-order" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Shipping & pickup", href: "/shipping-returns" },
      { label: "Warranty & returns", href: "/warranty" },
      { label: "Questions & answers", href: "/faq" }
    ]
  },
  {
    title: "Shop",
    links: [
      { label: "Track lighting kits", href: "/diy-kits" },
      { label: "Puck lights", href: "/product-category/lights" },
      { label: "Track & screws", href: "/product-category/hardware" },
      { label: "Controllers", href: "/product-category/controllers" },
      { label: "Power supplies", href: "/product-category/power-supplies" },
      { label: "Connectors & cables", href: "/product-category/connectors" },
      { label: "Every part", href: "/shop" }
    ]
  },
  {
    title: "Learn",
    links: [
      { label: "Brands compared", href: "/brands" },
      { label: "Guides & how-to", href: "/resources" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Kit or installed?", href: "/compare" },
      { label: "Photo gallery", href: "/gallery" }
    ]
  },
  {
    title: "Information",
    links: [
      { label: "About Illumi", href: "/about" },
      { label: "Installation in SW Ontario", href: "/installation" },
      { label: "Find an installer", href: "/installers" },
      { label: "Installer program", href: "/professional-installer" }
    ]
  }
];
