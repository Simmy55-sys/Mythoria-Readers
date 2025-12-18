"use client";

import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/assets/logo";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { CgClose, CgMenuLeft } from "react-icons/cg";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  account,
  allSeries,
  home,
  purchase,
  reading,
  login,
} from "@/routes/client";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { LogOut, User } from "lucide-react";

const navigationLinks = [
  {
    title: "Home",
    href: home,
  },
  {
    title: "Series",
    href: allSeries,
  },
  {
    title: "Purchase coins",
    href: purchase,
  },
  {
    title: "My-novels",
    href: reading,
  },
  {
    title: "Contact us",
    href: "mailto:support@apexnovels.com",
  },
];
const menuVariants = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: [0.12, 0, 0.39, 0],
    },
  },
  exit: {
    scaleY: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const mobileLinkVariants = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0, 0.55, 0.45, 1],
    },
  },
};

const containerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.09,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.09,
      staggerDirection: 1,
    },
  },
};

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const { isAuthenticated, user, logout } = useAuth();

  const pathname = usePathname();
  const router = useRouter();

  if (pathname.startsWith(account)) return;

  const handleLogout = async () => {
    await logout();
    router.push(home);
    router.refresh();
  };

  return (
    <>
      <div>
        <header className="bg-background sticky top-0 z-50">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-7 sm:px-6">
            <div className="text-muted-foreground flex flex-1 items-center gap-8 font-medium md:justify-center lg:gap-16">
              {navigationLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="hover:text-primary max-md:hidden"
                >
                  {link.title}
                </Link>
              ))}

              <Logo className="size-15" />

              {navigationLinks.slice(2).map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="hover:text-primary max-md:hidden"
                >
                  {link.title}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <Button variant="ghost" size="icon">
                <SearchIcon />
                <span className="sr-only">Search</span>
              </Button>
              {isAuthenticated ? (
                <>
                  <div className="max-md:hidden flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>{user?.username}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="max-md:hidden"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link href={login} className="max-md:hidden">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
              )}
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                onClick={() => setOpen(true)}
              >
                <CgMenuLeft className="size-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </div>
          </div>
        </header>
      </div>

      <AnimatePresence>
        {open && isMobile && (
          <motion.div
            // @ts-ignore
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 w-full h-screen bg-accent origin-top text-black p-10 z-999 lg:hidden"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-between items-center">
                <span className="">
                  <Logo className="size-14" />
                </span>
                <p
                  className="cursor-pointer text-md text-accent-foreground"
                  onClick={() => setOpen(false)}
                >
                  <CgClose />
                </p>
              </div>

              <motion.div
                variants={containerVariants}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col h-full justify-center font-poly items-center space-y-2.5 mt-[25%]"
              >
                {navigationLinks.map(({ title, href }) => {
                  return (
                    <div key={title} className="overflow-hidden">
                      <motion.div
                        // @ts-ignore
                        variants={mobileLinkVariants}
                        // initial="initial"
                        // animate="open"
                        className="text-4xl uppercase text-accent-foreground text-center"
                      >
                        <Link href={href}>{title}</Link>
                      </motion.div>
                    </div>
                  );
                })}
                {isAuthenticated ? (
                  <div className="overflow-hidden mt-auto">
                    <motion.div
                      // @ts-ignore
                      variants={mobileLinkVariants}
                      className="text-2xl uppercase text-accent-foreground text-center"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span>{user?.username}</span>
                        <Button
                          variant="outline"
                          onClick={handleLogout}
                          className="text-sm bg-transparent"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <div className="overflow-hidden mt-auto">
                    <motion.div
                      // @ts-ignore
                      variants={mobileLinkVariants}
                      className="text-xl uppercase text-accent-foreground text-center"
                    >
                      <Link className="font-medium" href={login}>
                        Login
                      </Link>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
