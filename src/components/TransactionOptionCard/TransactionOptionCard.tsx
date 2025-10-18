import React from "react";
import { Link } from "react-router-dom";
import "./TransactionOptionCard.css";

type Props = {
    to: string;
    icon?: "transfer" | "pay" | "recharge" | string;
    title: string;
    description?: string;
    role?: string;
};

const Icon: React.FC<{ name?: string }> = ({ name }) => {
    if (name === "transfer")
        return (
            <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
            >
                <path
                    d="M12 2v12"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                />
                <path
                    d="M5 9l7-7 7 7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );
    if (name === "pay")
        return (
            <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
            >
                <rect
                    x="3"
                    y="6"
                    width="18"
                    height="12"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                />
            </svg>
        );
    // recharge
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect
                x="7"
                y="2"
                width="10"
                height="20"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.6"
            />
        </svg>
    );
};

const TransactionOptionCard: React.FC<Props> = ({
    to,
    icon,
    title,
    description,
    role,
}) => {
    return (
        <Link className="tx-card" to={to} role={role} aria-label={title}>
            <div className="tx-card__icon" aria-hidden>
                <span className="tx-card__icon-bg">
                    <Icon name={icon} />
                </span>
            </div>

            <div className="tx-card__content">
                <div className="tx-card__title">{title}</div>
                {description && (
                    <div className="tx-card__desc">{description}</div>
                )}
            </div>
        </Link>
    );
};

export default TransactionOptionCard;