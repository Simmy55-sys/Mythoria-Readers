"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { createCoinPurchaseOrderAction } from "@/server-actions/payment";
import { toast } from "sonner";

export default function PurchaseCoinsComponent() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [loadingPlanId, setLoadingPlanId] = useState<number | null>(null);

  const coinPlans = [
    {
      id: 1,
      amount: 100,
      price: 5,
      label: "Let's Do this",
      icon: "https://storage.novelshub.org/public/upload/2025/10/18/ChatGPT Image Oct 18, 2025, 11_44_52 PM-bdf99002e30b339d.webp",
    },
    {
      id: 2,
      amount: 300,
      price: 14,
      label: "I'm Intrested.",
      icon: "https://storage.novelshub.org/public/upload/2025/10/18/11-a25217c9dba571e8.webp",
    },
    {
      id: 3,
      amount: 500,
      price: 22,
      label: "This Novel Looks Nice~",
      icon: "https://storage.novelshub.org/public/upload/2025/10/18/22-65d3c24e52a424ce.webp",
    },
    {
      id: 4,
      amount: 700,
      price: 29,
      label: "I'm hooked Up!",
      icon: "https://storage.novelshub.org/public/upload/2025/10/18/30-34e794472e603ecc.webp",
    },
    {
      id: 5,
      amount: 1000,
      price: 38,
      label: "Spendin Goood!",
      icon: "https://storage.novelshub.org/public/upload/2025/10/18/50-b684fa55cd64df7b.webp",
    },
  ];

  const faqs = [
    {
      question: "How Long Does It take to get my Coins?",
      answer: "Instantly!",
    },
    {
      question: "I faced a problem while buying, where can I get help?",
      answer: "Join Our Discord!",
    },
  ];

  const handlePurchase = async (plan: {
    id: number;
    amount: number;
    price: number;
  }) => {
    if (!isAuthenticated) {
      toast.error("Please login to purchase coins", {
        style: {
          "--normal-bg":
            "color-mix(in oklab, var(--destructive) 10%, var(--background))",
          "--normal-text": "var(--destructive)",
          "--normal-border": "var(--destructive)",
        } as React.CSSProperties,
      });
      router.push(`/account/login?redirect=${encodeURIComponent("/purchase")}`);
      return;
    }

    setLoadingPlanId(plan.id);

    try {
      const result = await createCoinPurchaseOrderAction({
        coinAmount: plan.amount,
        amountPaid: plan.price,
      });

      if (!result.success) {
        toast.error(result.error || "Failed to create payment order", {
          style: {
            "--normal-bg":
              "color-mix(in oklab, var(--destructive) 10%, var(--background))",
            "--normal-text": "var(--destructive)",
            "--normal-border": "var(--destructive)",
          } as React.CSSProperties,
        });
        setLoadingPlanId(null);
        return;
      }

      // Redirect to PayPal approval URL
      if (result.data?.approvalUrl) {
        // Open in new tab
        window.open(
          result.data.approvalUrl + `?orderId=${result.data.orderId}`,
          "_blank"
        );
      } else {
        toast.error("Failed to get payment URL", {
          style: {
            "--normal-bg":
              "color-mix(in oklab, var(--destructive) 10%, var(--background))",
            "--normal-text": "var(--destructive)",
            "--normal-border": "var(--destructive)",
          } as React.CSSProperties,
        });
        setLoadingPlanId(null);
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred", {
        style: {
          "--normal-bg":
            "color-mix(in oklab, var(--destructive) 10%, var(--background))",
          "--normal-text": "var(--destructive)",
          "--normal-border": "var(--destructive)",
        } as React.CSSProperties,
      });
      setLoadingPlanId(null);
    }
  };

  return (
    <main className="relative overflow-hidden min-h-screen bg-linear-to-br from-purple-900 via-pink-800 to-purple-950">
      {/* Background decoration */}
      <div className="fixed -bottom-[20%] -left-[20%] z-0 opacity-30">
        <div className="w-[500px] h-[500px] bg-red-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto py-8 md:py-14 px-4 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="bg-white/10 backdrop-blur-md mb-3 group relative shadow-2xl shadow-purple-500/20 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block">
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-radial from-pink-500/50 to-transparent"></span>
            </span>
            <div className="relative flex space-x-2 uppercase items-center z-10 rounded-full bg-black/20 py-0.5 px-4 ring-1 ring-white/10">
              <span>Coins</span>
              <p className="ml-1 font-bold text-pink-500">+</p>
            </div>
            <span className="absolute bottom-0 left-4.5 h-px w-[calc(100%-2.25rem)] bg-linear-to-r from-emerald-400/0 via-purple-500 to-pink-500/0 opacity-0 group-hover:opacity-40 transition-opacity duration-500"></span>
          </div>

          {/* Title */}
          <h1 className="relative w-full max-w-3xl text-center leading-[1.1] text-white text-4xl sm:text-5xl md:text-6xl lg:text-[3.375rem] font-bold tracking-wide">
            <span>Get Your Coins </span>
            <span className="relative inline-block text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-purple-500">
              Now!
            </span>
          </h1>

          <p className="max-w-3xl mt-4 md:mt-6 text-white/80 text-base sm:text-lg md:text-xl lg:text-2xl">
            Choose the plan that works for you
          </p>
        </div>

        {/* Coin Plans Grid */}
        <div className="container mx-auto mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
          {coinPlans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => handlePurchase(plan)}
              disabled={loadingPlanId === plan.id}
              className="flex flex-col sm:flex-row justify-between items-center w-full bg-white/10 backdrop-blur-md hover:bg-white/20 p-4 rounded-lg transition-all duration-300 border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-4 mb-4 sm:mb-0 flex-col sm:flex-row">
                <img
                  draggable="false"
                  alt="V-COIN Icon"
                  className="h-10 sm:h-12 md:h-16"
                  src={plan.icon}
                />
                <div className="text-left">
                  {/* <div className="inline-flex items-center justify-between whitespace-nowrap h-7 text-xs text-yellow-300 bg-yellow-300/20 px-3 py-0.5 rounded-full mb-1">
                    <span className="font-normal">{plan.label}</span>
                  </div> */}
                  <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-xl md:text-2xl text-white font-semibold">
                      {plan.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-center sm:text-right flex flex-col items-center sm:items-end gap-2">
                <div className="text-lg sm:text-xl md:text-2xl text-white font-semibold">
                  ${plan.price}
                </div>
                <span className="bg-orange-500/50 backdrop-blur-sm hover:bg-orange-600/50 text-white rounded-full py-1 px-4 text-sm transition-colors">
                  {loadingPlanId === plan.id ? "Processing..." : "Purchase"}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* FAQ Section */}
        <section className="py-32 bg-background mt-15 text-white">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center">
              <span className="inline-flex items-center justify-center rounded-full border border-transparent bg-accent text-black px-3 py-1 text-xs font-medium">
                FAQ
              </span>
              <h1 className="mt-4 text-4xl font-semibold">
                Common Questions &amp; Answers
              </h1>
              <p className="text-slate-300 mt-6 font-medium max-w-2xl mx-auto">
                Find out all the essential details about our platform and how it
                can serve your needs.
              </p>
            </div>

            {/* FAQ Items */}
            <div className="mx-auto mt-14 max-w-xl">
              {faqs.map((faq, idx) => (
                <div key={idx} className="mb-8 flex gap-4">
                  {/* Number Badge */}
                  <span className="bg-gray-100 text-[#333] flex size-6 shrink-0 items-center justify-center rounded-sm font-mono text-xs">
                    {idx + 1}
                  </span>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-medium text-white dark:text-white">
                        {faq.question}
                      </h3>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
