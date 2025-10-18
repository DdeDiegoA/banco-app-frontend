import React from "react";

export const IconButton: React.FC<
    React.ButtonHTMLAttributes<HTMLButtonElement> & { compact?: boolean }
> = ({ compact, className = "", ...rest }) => (
    <button
        className={`icon-button ${compact ? "compact" : ""} ${className}`}
        {...rest}
    />
);
