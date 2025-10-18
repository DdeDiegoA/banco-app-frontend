import React from "react";
import "./QuickActions.css";

const QuickActions: React.FC = () => {
    return (
        <nav className="quick-actions" aria-label="Accesos rápidos">
            <button className="quick-actions__item" type="button">
                <div className="quick-actions__icon" aria-hidden>
                    {/* up-down arrow */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M12 3v14"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        />
                        <path
                            d="M5 10l7-7 7 7"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        />
                    </svg>
                </div>
                <span className="quick-actions__label">Transferir</span>
            </button>

            <button className="quick-actions__item" type="button">
                <div className="quick-actions__icon" aria-hidden>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <rect
                            x="3"
                            y="6"
                            width="18"
                            height="12"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        />
                    </svg>
                </div>
                <span className="quick-actions__label">Pagar</span>
            </button>

            <button className="quick-actions__item" type="button">
                <div className="quick-actions__icon" aria-hidden>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <rect
                            x="7"
                            y="3"
                            width="10"
                            height="18"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        />
                    </svg>
                </div>
                <span className="quick-actions__label">Recargar</span>
            </button>
        </nav>
    );
};

export default QuickActions;
