"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaDiscord, FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import Logo from "@/assets/logo";
import { home, register } from "@/routes/client";
import PasswordInput from "../password-input";
import { Field, FieldSeparator } from "@/components/ui/field";
import { loginAction } from "@/server-actions/auth";
import { useAuth } from "@/contexts/auth-context";
import { Spinner } from "@/components/ui/spinner";

export default function LoginAccount() {
  const router = useRouter();
  const { login: setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await loginAction({ email, password });

      if (result.success && result.data) {
        // Store user data (token is in cookie)
        setAuth(result.data.user);
        // Small delay to ensure cookie is set before redirect
        await new Promise((resolve) => setTimeout(resolve, 100));
        // Redirect to home
        router.push(redirect || home);
        router.refresh();
      } else {
        setError(
          result.error || "Login failed. Please check your credentials."
        );
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      console.error("Login error:", err);
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
          <h2 className="mb-1.5 text-2xl font-semibold">Sign in to Mythoria</h2>
          <p className="text-muted-foreground">
            Enjoy quality novels, The special vault for top novels.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            className="h-10 bg-[#27272A] border-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner className="mr-2" />
                Signing in...
              </>
            ) : (
              "Continue with Email"
            )}
          </Button>
        </form>

        <FieldSeparator>Or</FieldSeparator>
        <Field className="grid gap-4 sm:grid-cols-2">
          <Button
            variant="outline"
            type="button"
            className="bg-[#27272A] text-xs"
            disabled={isLoading}
          >
            <FaGoogle className="size-4" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            type="button"
            className="bg-[#27272A] text-xs"
            disabled={isLoading}
          >
            <FaDiscord className="size-4" />
            Continue with Discord
          </Button>
        </Field>

        <p className="text-muted-foreground text-center">
          New on our platform?{" "}
          <Link
            href={register + (redirect ? "?redirect=" + redirect : "")}
            className="text-foreground hover:underline hover:text-accent"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
