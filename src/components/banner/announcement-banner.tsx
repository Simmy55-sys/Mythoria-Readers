"use client";

import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AnnouncementBannerProps {
  id?: string;
  type?: "info" | "success" | "warning" | "error";
  title?: string;
  message: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  dismissible?: boolean;
  onDismiss?: () => void;
}

const typeConfig = {
  info: {
    bgColor: "bg-announcement-info",
    textColor: "text-announcement-info-text",
    borderColor: "border-announcement-info-border",
    icon: Info,
  },
  success: {
    bgColor: "bg-announcement-success",
    textColor: "text-announcement-success-text",
    borderColor: "border-announcement-success-border",
    icon: CheckCircle,
  },
  warning: {
    bgColor: "bg-announcement-warning",
    textColor: "text-announcement-warning-text",
    borderColor: "border-announcement-warning-border",
    icon: AlertTriangle,
  },
  error: {
    bgColor: "bg-announcement-error",
    textColor: "text-announcement-error-text",
    borderColor: "border-announcement-error-border",
    icon: AlertCircle,
  },
};

export function AnnouncementBanner({
  id = "announcement",
  type = "info",
  title,
  message,
  action,
  dismissible = true,
  onDismiss,
}: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const config = typeConfig[type];
  const Icon = config.icon;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <div
      id={id}
      role="alert"
      className={cn(
        "w-full border-l-4 px-6 py-4 flex items-start gap-4 transition-all duration-300 ease-out",
        config.bgColor,
        config.borderColor,
      )}
    >
      {/* Icon */}
      <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", config.textColor)} />

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <h3 className={cn("font-semibold text-sm mb-1", config.textColor)}>
            {title}
          </h3>
        )}
        <p className={cn("text-sm leading-relaxed", config.textColor)}>
          {message}
        </p>

        {/* Action Button */}
        {action && (
          <div className="mt-3">
            {action.href ? (
              <a
                href={action.href}
                className={cn(
                  "inline-flex items-center text-sm font-medium underline underline-offset-2 hover:opacity-80 transition-opacity",
                  config.textColor,
                )}
              >
                {action.label}
                <span className="ml-1">→</span>
              </a>
            ) : (
              <button
                onClick={action.onClick}
                className={cn(
                  "inline-flex items-center text-sm font-medium underline underline-offset-2 hover:opacity-80 transition-opacity",
                  config.textColor,
                )}
              >
                {action.label}
                <span className="ml-1">→</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Close Button */}
      {dismissible && (
        <button
          onClick={handleDismiss}
          className={cn(
            "flex-shrink-0 h-5 w-5 rounded hover:opacity-80 transition-opacity",
            config.textColor,
          )}
          aria-label="Close announcement"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

