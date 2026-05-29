import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gallery — Concrete Sealing Projects in London, ON',
  description: 'Browse our gallery of concrete sealing and repair projects across London, St. Thomas, Woodstock, and Stratford. See the quality of our driveway sealing work.',
  openGraph: {
    title: 'Gallery | London Concrete Sealing',
    description: 'See our concrete sealing and driveway projects across Southwestern Ontario.',
    url: 'https://londonconcretesealing.ca/gallery',
  },
};

const categories = [
  { label: 'All Projects', value: 'all' },
  { label: 'Driveway Sealing', value: 'driveway' },
  { label: 'Concrete Sealing', value: 'concrete' },
  { label: 'Stamped Concrete', value: 'stamped' },
  { label: 'Concrete Finishes', value: 'finishes' },
];

const projects = [
  { id: 1, title: 'Residential Driveway Sealing', location: 'London, ON', category: 'driveway', emoji: '🛤️' },
  { id: 2, title: 'Stamped Patio Restoration', location: 'London, ON', category: 'stamped', emoji: '🎨' },
  { id: 3, title: 'Concrete Sealing — Garage Floor', location: 'St. Thomas, ON', category: 'concrete', emoji: '🏠' },
  { id: 4, title: 'Exposed Aggregate Driveway', location: 'Woodstock, ON', category: 'finishes', emoji: '✨' },
  { id: 5, title: 'Driveway + Walkway Sealing', location: 'London, ON', category: 'driveway', emoji: '🛤️' },
  { id: 6, title: 'Broom Finish Driveway', location: 'Stratford, ON', category: 'finishes', emoji: '✨' },
  { id: 7, title: 'Patio & Pool Deck Sealing', location: 'London, ON', category: 'concrete', emoji: '🏗️' },
  { id: 8, title: 'Stamped Concrete Walkway', location: 'St. Thomas, ON', category: 'stamped', emoji: '🎨' },
  { id: 9, title: 'Full Driveway Reseal', location: 'Ingersoll, ON', category: 'driveway', emoji: '🛤️' },
];

export default function GalleryPage() {
  return (
    <>
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-200">Gallery</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Work</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Explore our portfolio of concrete sealing and repair projects across London and Southwestern Ontario. From residential driveways to commercial patios.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <p className="text-gray-600 text-center mb-10">
            At London Concrete Sealing, we take pride in the quality and scope of our work. This gallery showcases the excellence and variety of projects we've completed, demonstrating our commitment to enhancing the beauty and durability of concrete surfaces.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="group bg-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-7xl">{project.emoji}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{project.title}</h3>
                  <p className="text-sm text-gray-500">{project.location}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gray-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to Add Your Project to Our Portfolio?</h2>
            <p className="text-gray-600 mb-6">We look forward to adding your project to our growing portfolio of satisfied customers. Let London Concrete Sealing be your partner in protecting and beautifying your concrete surfaces.</p>
            <Link href="/contact" className="accent-btn inline-block px-8 py-4 rounded-lg font-bold text-lg">
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
