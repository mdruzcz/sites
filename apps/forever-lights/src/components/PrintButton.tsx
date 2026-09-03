'use client';
import { Icon } from './icons';

export function PrintButton({ label = 'Print this page' }: { label?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-outline">
      <Icon.file size={18} /> {label}
    </button>
  );
}
