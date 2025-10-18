import React, { forwardRef } from "react";
import "./Input.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            helperText,
            fullWidth = false,
            className = "",
            ...props
        },
        ref
    ) => {
        const inputClasses = [
            "input",
            error && "input--error",
            fullWidth && "input--full-width",
            className,
        ]
            .filter(Boolean)
            .join(" ");

        const fieldClasses = [
            "input-field",
            fullWidth && "input-field--full-width",
        ]
            .filter(Boolean)
            .join(" ");

        return (
            <div className={fieldClasses}>
                {label && (
                    <label
                        className="input-field__label"
                        htmlFor={props.id || props.name}
                    >
                        {label}
                    </label>
                )}

                <input ref={ref} className={inputClasses} {...props} />

                {error && <span className="input-field__error">{error}</span>}

                {!error && helperText && (
                    <span className="input-field__helper">{helperText}</span>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
