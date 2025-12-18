import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {}

export function ScrollPrevious(props: ButtonProps) {
  return (
    <button {...props}>
      <span
        className={clsx(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input shadow-sm hover:bg-primary hover:text-accent-foreground h-8 w-8 rounded-full -translate-y-1/2 cursor-pointer group bg-gray-800",
          props.disabled && "pointer-events-none opacity-30"
        )}
      >
        <ChevronLeft className="group-hover:text-white" />
      </span>
      <span className="sr-only">Previous slide</span>
    </button>
  );
}

export function ScrollNext(props: ButtonProps) {
  return (
    <button {...props}>
      <span
        className={clsx(
          "inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input shadow-sm hover:bg-primary hover:text-accent-foreground h-8 w-8 rounded-full -translate-y-1/2 group bg-gray-800",
          props.disabled && "pointer-events-none opacity-30"
        )}
      >
        <ChevronRight className="group-hover:text-white" />
      </span>
      <span className="sr-only">Next slide</span>
    </button>
  );
}
