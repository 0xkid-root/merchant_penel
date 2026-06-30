import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SecondaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function SecondaryButton({
  children,
  onClick,
  disabled = false,
  className,
  type = "button",
}: SecondaryButtonProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center",
        "h-11 px-5 gap-2",
        "rounded-xl",
        "border border-slate-200",
        "bg-white",
        "text-sm font-semibold text-slate-900",
        "shadow-sm",
        "hover:bg-slate-50",
        "hover:border-slate-300",
        "transition-all duration-200",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
    >
      {children}
    </Button>
  );
}