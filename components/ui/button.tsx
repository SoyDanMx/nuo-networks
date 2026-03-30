import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "cyber" | "cyber-solid";
type ButtonSize = "default" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  cyber:
    "btn-drop-shadow-magenta border border-primary/40 bg-transparent text-primary hover:border-primary hover:bg-primary/10 hover:shadow-nuo-cyan",
  "cyber-solid":
    "btn-drop-shadow-cyan border border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-nuo-cyan"
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-11 px-4 py-2 text-sm",
  lg: "h-12 px-6 py-3 text-base"
};

export function Button({
  children,
  variant = "cyber",
  size = "default",
  className = "",
  type = "button",
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      type={type}
      className={`nuo-focus inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
