"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaDiscord, FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import Logo from "@/assets/logo";
import { home, login } from "@/routes/client";
import PasswordInput from "../password-input";
import { Field, FieldSeparator } from "@/components/ui/field";
import { registerAction } from "@/server-actions/auth";
import { Spinner } from "@/components/ui/spinner";

export default function RegisterAccount() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const result = await registerAction({ username, email, password });

      if (result.success && result.data) {
        // Auto-logged in after registration (token is in cookie)
        // Small delay to ensure cookie is set before redirect
        await new Promise((resolve) => setTimeout(resolve, 100));
        // Redirect to home
        router.push(redirect || home);
        router.refresh();
      } else {
        setError(result.error || "Registration failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      console.error("Registration error:", err);
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
          <h2 className="mb-1.5 text-2xl font-semibold">
            Register on Mythoria
          </h2>
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

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            type="text"
            placeholder="What is your username?"
            className="h-10 bg-[#27272A] border-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading}
          />
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
                Creating account...
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
          Already have an account?{" "}
          <Link
            href={login + "?redirect=" + redirect}
            className="text-foreground hover:underline hover:text-accent"
          >
            Login instead
          </Link>
        </p>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          By signing in, you agree to our{" "}
          <Button variant="link" className="p-0 h-auto">
            Terms of Service
          </Button>{" "}
          and{" "}
          <Button variant="link" className="p-0 h-auto">
            Privacy Policy
          </Button>
        </p>
      </div>
    </div>
  );
}
