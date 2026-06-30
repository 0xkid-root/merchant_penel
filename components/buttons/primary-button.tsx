import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function PrimaryButton({
  children,
  onClick,
  disabled = false,
  isLoading = false,
  className,
  type = "button",
}: PrimaryButtonProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center",
        "h-11 px-5 gap-2",
        "rounded-xl",
        "bg-indigo-600",
        "text-sm font-semibold text-white",
        "shadow-sm",
        "hover:bg-indigo-700",
        "transition-all duration-200",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
    >
      {isLoading ? (
        <>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  );
}