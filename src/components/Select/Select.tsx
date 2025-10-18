import React from "react";
import "./Select.css";

type Option = { value: string; label: string };

type Props = {
    id?: string;
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    className?: string;
};

const Select: React.FC<Props> = ({
    id,
    value,
    onChange,
    options,
    className = "",
}) => {
    return (
        <div className={`select ${className}`}>
            <select
                id={id}
                className="select__native"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                aria-label={id}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <span className="select__chevron" aria-hidden>
                <svg width="14" height="8" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
        </div>
    );
};

export default Select;
