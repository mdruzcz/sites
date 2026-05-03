import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase/server";

export const metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ next?: string; error?: string; sent?: string; email?: string }>;

async function sendMagicLink(formData: FormData) {
  "use server";
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const next = String(formData.get("next") ?? "/admin");
  if (!email) redirect(`/admin/login?error=missing_email&next=${encodeURIComponent(next)}`);

  const supabase = await getServerSupabase();
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3004";
  const proto = h.get("x-forwarded-proto") ?? "https";
  const origin = `${proto}://${host}`;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/confirm?next=${encodeURIComponent(next)}`,
      shouldCreateUser: true, // only admins seeded by us can sign in
    },
  });
  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(next)}`);
  }
  redirect(`/admin/login?sent=1&email=${encodeURIComponent(email)}&next=${encodeURIComponent(next)}`);
}

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;

  // If already signed in, send to dashboard
  const supabase = await getServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect(sp.next ?? "/admin");

  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-md flex-col justify-center px-6 py-12">
      <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Service Excellence Awards</p>
      <h1 className="mt-2 font-serif text-3xl tracking-tight">Admin sign in</h1>
      <p className="mt-2 text-sm text-stone-600">
        Enter your email and we'll send a one-time sign-in link.
      </p>

      {sp.sent && (
        <div className="mt-6 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          Sign-in link sent to <span className="font-medium">{sp.email}</span>. Check your inbox.
        </div>
      )}
      {sp.error === "not_authorized" && (
        <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          That account is signed in but not on the admin allow-list. Sign out and try again with an admin email.
        </div>
      )}
      {sp.error && sp.error !== "not_authorized" && (
        <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          {sp.error === "missing_email" ? "Please enter your email." : decodeURIComponent(sp.error)}
        </div>
      )}

      <form action={sendMagicLink} className="mt-6 space-y-4">
        <input type="hidden" name="next" value={sp.next ?? "/admin"} />
        <div>
          <label htmlFor="email" className="text-sm text-stone-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 h-11 w-full rounded-md border border-stone-300 bg-white px-3 text-sm focus:border-[var(--gold)] focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="inline-flex h-11 w-full items-center justify-center rounded-md bg-stone-900 px-5 text-sm font-medium text-white hover:bg-stone-700"
        >
          Send sign-in link
        </button>
      </form>
    </div>
  );
}
