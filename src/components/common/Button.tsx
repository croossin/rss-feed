import clsx from "clsx";
import React, { ReactNode } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "primary" | "secondary" | "danger";
  preventDefault?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

function Button({
  children,
  className,
  variant = "primary",
  preventDefault = true,
  loading = false,
  onClick,
  ...props
}: Props) {
  return (
    <span className="block rounded-full shadow-sm">
      <button
        className={clsx(
          "w-full flex justify-center py-2 px-6 border text-sm font-medium rounded-md focus:outline-none transition duration-150 ease-in-out",
          variant === "primary" && "text-white bg-pink-500 hover:bg-pink-400 ",
          variant === "secondary" && "text-pink bg-white border-pink",
          variant === "danger" && "text-white bg-red-600 hover:bg-red-400 ",
          loading || props.disabled ? "opacity-60" : "opacity-100",
          className
        )}
        disabled={loading || props.disabled}
        onClick={(e) => {
          if (preventDefault) {
            e.preventDefault();
          }
          if (onClick) {
            onClick();
          }
        }}
        {...props}
      >
        {loading && (
          <svg
            className={clsx(
              "animate-spin -ml-1 mr-3 h-5 w-5",
              variant === "primary" ? "text-white" : "text-cortinablue"
            )}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    </span>
  );
}

export default Button;
