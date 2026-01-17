"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Logo from "@/assets/logo";
import { home, login } from "@/routes/client";
import PasswordInput from "../password-input";
import { Field } from "@/components/ui/field";
import { resetPasswordAction } from "@/server-actions/auth";
import { Spinner } from "@/components/ui/spinner";

export default function ResetPasswordAccount() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Invalid reset link. Please request a new password reset.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Invalid reset link. Please request a new password reset.");
      return;
    }

    // Validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const result = await resetPasswordAction(token, password);

      if (result.success) {
        setSuccess(true);
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push(login);
        }, 2000);
      } else {
        setError(result.error || "Failed to reset password. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      console.error("Reset password error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md px-6 mx-auto">
      <Link href={home} className="block h-fit mb-12 sm:mb-16 lg:mb-24">
        <Button variant="ghost" className="group text-muted-foreground">
          <ChevronLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
          Back to the website
        </Button>
      </Link>

      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex items-center">
          <Logo className="size-15" />
          <span className="text-3xl font-semibold font-heading">Mythoria</span>
        </div>

        {/* Title and Description */}
        <div>
          <h2 className="mb-1.5 text-2xl font-semibold">Reset Password</h2>
          <p className="text-muted-foreground">
            Enter your new password below.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 text-sm">
            Password has been reset successfully! Redirecting to login...
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        {!success && token && (
          <>
            {/* Reset Password Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                placeholder="Enter new password"
              />
              <PasswordInput
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                required
                placeholder="Confirm new password"
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner className="mr-2" />
                    Resetting password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>

            <Field className="text-center">
              <Link
                href={login}
                className="text-foreground hover:underline hover:text-accent"
              >
                Back to login
              </Link>
            </Field>
          </>
        )}

        {!token && (
          <Field className="text-center">
            <Link
              href={login}
              className="text-foreground hover:underline hover:text-accent"
            >
              Back to login
            </Link>
          </Field>
        )}
      </div>
    </div>
  );
}
