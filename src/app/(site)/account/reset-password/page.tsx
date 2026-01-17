import ResetPasswordAccount from "@/components/pages/accounts/reset-password";
import { validateResetTokenAction } from "@/server-actions/auth";
import { redirect } from "next/navigation";
import { login } from "@/routes/client";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    redirect(
      login + "?error=Invalid reset link. Please request a new password reset."
    );
  }

  // Validate token before rendering
  const validation = await validateResetTokenAction(token);

  if (!validation.success || !validation.valid) {
    redirect(
      login + "?error=" + encodeURIComponent("Invalid or expired reset link")
    );
  }

  return <ResetPasswordAccount />;
}
