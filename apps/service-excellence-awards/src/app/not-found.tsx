import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-[0.22em] text-stone-500">404</p>
      <h1 className="mt-3 font-serif text-5xl tracking-tight">Not found.</h1>
      <p className="mt-3 text-stone-600">The page you're looking for doesn't exist or was moved.</p>
      <Link href="/" className="mt-8 inline-flex h-11 items-center rounded-full bg-stone-900 px-6 text-sm font-medium text-white hover:bg-stone-700">
        Back to home
      </Link>
    </div>
  );
}
