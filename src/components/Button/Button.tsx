import React from "react";
import "./Button.css";

interface ButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "danger" | "ghost";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    type = "button",
    variant = "primary",
    size = "md",
    fullWidth = false,
    disabled = false,
    loading = false,
    onClick,
    className = "",
}) => {
    const buttonClasses = [
        "button",
        `button--${variant}`,
        `button--${size}`,
        fullWidth && "button--full-width",
        loading && "button--loading",
        disabled && "button--disabled",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            type={type}
            className={buttonClasses}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {loading ? <span className="button__spinner" /> : children}
        </button>
    );
};
