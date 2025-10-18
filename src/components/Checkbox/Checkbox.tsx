import React, { forwardRef } from "react";
import "./Checkbox.css";

interface CheckboxProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, className = "", id, ...props }, ref) => {
        const checkboxId =
            id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

        const checkboxClasses = ["checkbox", className]
            .filter(Boolean)
            .join(" ");

        return (
            <div className={checkboxClasses}>
                <input
                    ref={ref}
                    type="checkbox"
                    id={checkboxId}
                    className="checkbox__input"
                    {...props}
                />

                <label htmlFor={checkboxId} className="checkbox__label">
                    <span className="checkbox__box">
                        <svg
                            className="checkbox__icon"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13.5 4L6 11.5L2.5 8"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>

                    {label && <span className="checkbox__text">{label}</span>}
                </label>
            </div>
        );
    }
);

Checkbox.displayName = "Checkbox";
