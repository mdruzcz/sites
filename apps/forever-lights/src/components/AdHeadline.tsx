'use client';
import { useEffect, useState } from 'react';

// Google Ads final URLs carry ?h=<variant> so the hero headline repeats the
// searcher's own wording ("permanent house lights installation St. Thomas").
// Only these fixed phrasings can appear; anything else keeps the default H1.
const VARIANTS: Record<string, (city: string) => string> = {
  install: c => `Permanent House Lights Installation in ${c}`,
  christmas: c => `Permanent Christmas Lights Installed in ${c}`,
  holiday: c => `Permanent Holiday Lights for ${c} Homes`,
  roofline: c => `Permanent Roofline & Soffit Lighting in ${c}`,
  outdoor: c => `Permanent Outdoor House Lighting in ${c}`,
};

export function AdHeadline({ city, children }: { city: string; children: React.ReactNode }) {
  const [text, setText] = useState<string | null>(null);
  useEffect(() => {
    const key = new URLSearchParams(window.location.search).get('h') ?? '';
    const make = VARIANTS[key];
    if (make) setText(make(city));
  }, [city]);
  return <>{text ?? children}</>;
}
