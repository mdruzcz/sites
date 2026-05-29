import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { gallery, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Gallery — Permanent LED Lighting Projects',
  description: `Browse real permanent LED lighting installations by ${site.name} across London, Ontario and Southwestern Ontario. See the transformation!`,
};

export default function GalleryPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-[#F5A623] text-sm font-semibold uppercase tracking-widest">Our Work</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">
            Real Homes. Real Results.
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Every image is a real installation by our team across London, Ontario and Southwestern Ontario.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 mb-14">
          {[...gallery, ...gallery].map((img, i) => (
            <div key={i} className="break-inside-avoid rounded-2xl overflow-hidden relative group">
              <Image
                src={img.src}
                alt={img.alt}
                width={800}
                height={600}
                quality={80}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              {img.caption && (
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-white font-medium bg-black/60 rounded-full px-3 py-1.5">{img.caption}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-[#10101e] to-[#16162a] border border-[#F5A623]/20 p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
            Could Your Home Look Like This?
          </h2>
          <p className="text-slate-400 mb-6">
            Book a free site visit and see exactly what your home would look like with permanent LED lighting.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center min-h-[52px] px-10 py-3.5 rounded-full font-bold text-lg bg-[#F5A623] text-black hover:bg-[#FFD47A] transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
