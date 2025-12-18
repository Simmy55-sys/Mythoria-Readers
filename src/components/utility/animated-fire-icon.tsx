import { FlameIcon } from "lucide-react";

export default function AnimatedFireIcon() {
  return (
    <div className="relative inline-block">
      <style>{`
    @keyframes flicker {
      0% { opacity: 0.97; filter: drop-shadow(0 0 3px rgba(239, 68, 68, 0.7)); }
      20% { opacity: 0.9; filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.8)); }
      40% { opacity: 0.96; filter: drop-shadow(0 0 6px rgba(239, 68, 68, 0.9)); }
      60% { opacity: 0.92; filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.75)); }
      80% { opacity: 0.98; filter: drop-shadow(0 0 7px rgba(239, 68, 68, 1)); }
      100% { opacity: 0.97; filter: drop-shadow(0 0 5px rgba(239, 68, 68, 0.9)); }
    }

    @keyframes wave {
      0%, 100% { transform: scaleY(1); }
      50% { transform: scaleY(1.12); }
    }

    .animated-flame {
      animation: flicker 2.2s infinite ease-in-out, wave 1s ease-in-out infinite;
      transform-origin: bottom center;
    }
  `}</style>

      <FlameIcon className="animated-flame size-4 text-red-500 fill-red-500" />
    </div>
  );
}
