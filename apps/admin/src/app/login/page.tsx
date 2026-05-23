import { LoginForm } from "@/components/login-form";

interface PageProps {
  searchParams: Promise<{ error?: string; redirect?: string; message?: string }>;
}

export default async function LoginPage({ searchParams }: PageProps) {
  const params = await searchParams;
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold">Master Decker Admin</h1>
        <p className="mt-1 text-sm text-slate-600">
          Sign in with your Master Decker email to manage stores, products, and orders.
        </p>

        {params.error === "not_admin" && (
          <p className="mt-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
            That account isn&rsquo;t authorized for the admin. Ask the owner to add you to{" "}
            <code className="font-mono">ecom_admin_users</code>.
          </p>
        )}
        <LoginForm redirectTo={params.redirect} />
      </div>
    </main>
  );
}
