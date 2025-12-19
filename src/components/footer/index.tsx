"use client";

import Logo from "@/assets/logo";
import { account } from "@/routes/client";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const YEAR = new Date().getFullYear();

export default function ApplicationFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pathname = usePathname();

  if (pathname.startsWith(account)) return;

  return (
    <footer className="border-t border-gray-800 bg-background/50 backdrop-blur mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-1">
            <Logo className="size-20" />
            <p>The Special Vault Edition of Novels</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="text-muted-foreground hover:text-accent transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-accent transition-colors text-sm"
            >
              DMCA
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-accent transition-colors text-sm"
            >
              Discord
            </Link>
          </div>
        </div>
        <p className="text-muted-foreground text-center text-sm md:text-left mt-7 mx-auto w-fit">
          &copy; {YEAR} mythoriatales.com All rights reserved.
        </p>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-accent text-background flex items-center justify-center hover:bg-accent/90 transition-colors shadow-lg z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
