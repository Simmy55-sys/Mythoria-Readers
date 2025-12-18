import { Card } from "@/components/ui/card";
import Image from "next/image";
import NovelCarousel from "./carousel";

export default function AccountLayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full">
      <div className="h-dvh lg:grid lg:grid-cols-6">
        {/* LEFT SIDE — IMAGE PANEL */}
        <div className="max-lg:hidden lg:col-span-3 xl:col-span-4">
          <div className="bg-muted relative z-1 flex h-full items-center justify-center px-6">
            <Card className="relative shrink rounded-[20px] p-2.5 border-2">
              <NovelCarousel />

              {/* Floating gradient border beam */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] border-2 border-transparent
        mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)]
        mask-intersect
        [mask-clip:padding-box,border-box]"
              >
                <div
                  className="absolute aspect-square rounded-full bg-linear-to-l from-red-500 via-indigo-500 to-transparent"
                  style={{
                    width: "100px",
                    offsetPath: "rect(0px auto auto 0px round 100px)",
                    offsetDistance: "4.55%",
                  }}
                />
              </div>
            </Card>

            {/* SVG BACKGROUND */}
            <div className="absolute -z-1 opacity-80">
              {/* keep your full SVG unchanged */}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — FORM SECTION */}
        <div className="flex h-full flex-col items-center justify-center py-10 sm:px-5 lg:col-span-3 xl:col-span-2">
          {children}
        </div>
      </div>
    </div>
  );
}
