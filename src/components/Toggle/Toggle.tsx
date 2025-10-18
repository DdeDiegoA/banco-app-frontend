import React from "react";
import "./Toggle.css";

type Props = {
    id?: string;
    checked?: boolean;
    onChange?: () => void;
    ariaLabel?: string;
    disabled?: boolean;
};

const Toggle: React.FC<Props> = ({
    id,
    checked = false,
    onChange,
    ariaLabel,
    disabled = false,
}) => {
    return (
        <button
            id={id}
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={ariaLabel}
            className={`toggle ${checked ? "toggle--on" : "toggle--off"} ${
                disabled ? "toggle--disabled" : ""
            }`}
            onClick={() => !disabled && onChange && onChange()}
            disabled={disabled}
        >
            <span className="toggle__track" aria-hidden>
                <span className="toggle__thumb" />
            </span>
        </button>
    );
};

export default Toggle;
