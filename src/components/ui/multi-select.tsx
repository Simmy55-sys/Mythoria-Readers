"use client";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

export interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: Option[];
  onChange: (selected: Option[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options",
  className,
  disabled = false,
}: MultiSelectProps) {
  const handleSelect = (option: Option) => {
    const isSelected = selected.some((s) => s.value === option.value);
    if (isSelected) {
      onChange(selected.filter((s) => s.value !== option.value));
    } else {
      onChange([...selected, option]);
    }
  };

  const handleRemove = (option: Option) => {
    onChange(selected.filter((s) => s.value !== option.value));
  };

  return (
    <div className={cn("w-full", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className="w-full justify-between text-left font-normal border-none bg-[#27272A]"
          >
            <span className="text-sm">
              {selected.length > 0
                ? `${selected.length} selected`
                : placeholder}
            </span>
            <ChevronDown className="size-4 opacity-30" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-[200px] border-none bg-[#27272A]"
        >
          {options.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={selected.some((s) => s.value === option.value)}
              onCheckedChange={() => handleSelect(option)}
              className="hover:bg-gray-200"
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selected.map((option, idx) => (
            <div
              key={option.value}
              className="flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-800 rounded text-sm"
            >
              {option.label}
              <button
                onClick={() => !disabled && handleRemove(option)}
                disabled={disabled}
                className="ml-1 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
