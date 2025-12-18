"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function PurchaseCancelPage() {
  const router = useRouter();

  useEffect(() => {
    toast.info("Payment was cancelled", {
      style: {
        "--normal-bg":
          "color-mix(in oklab, light-dark(var(--color-sky-600), var(--color-sky-400)) 10%, var(--background))",
        "--normal-text":
          "light-dark(var(--color-sky-600), var(--color-sky-400))",
        "--normal-border":
          "light-dark(var(--color-sky-600), var(--color-sky-400))",
      } as React.CSSProperties,
    });
    // Redirect to purchase page after 2 seconds
    setTimeout(() => {
      router.push("/purchase");
    }, 2000);
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-900 via-pink-800 to-purple-950">
      <div className="text-center text-white p-8">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold mb-2">Payment Cancelled</h1>
        <p className="text-white/80">
          Your payment was cancelled. No charges were made.
        </p>
        <p className="text-white/60 mt-2">Redirecting you back...</p>
      </div>
    </main>
  );
}
