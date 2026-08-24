import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";
import { adminEnabled } from "@/lib/auth";

export const metadata = {
  title: "Sign in",
  robots: { index: false, follow: false }
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-[420px] py-10">
      {adminEnabled() ? (
        <Suspense fallback={<div className="card card-pad h-[300px] shimmer" />}>
          <LoginForm />
        </Suspense>
      ) : (
        <div className="card card-pad">
          <h1 className="text-[20px] font-bold">Admin not configured</h1>
          <p className="mt-3 text-[15px] text-[var(--muted)]">
            Set <code className="font-mono text-[13px]">ADMIN_PASSWORD</code> and{" "}
            <code className="font-mono text-[13px]">ADMIN_SESSION_SECRET</code> in the environment,
            then redeploy.
          </p>
        </div>
      )}
    </div>
  );
}
