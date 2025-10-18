import React from "react";
import "./LogoutButton.css";

type Props = {
    onClick?: () => void;
};

const LogoutButton: React.FC<Props> = ({ onClick }) => {
    return (
        <div className="logout">
            <button
                className="logout__btn"
                type="button"
                onClick={onClick}
                aria-label="Cerrar sesión"
            >
                <span className="logout__icon" aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M16 17l5-5-5-5"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M21 12H9"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 19H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
                <span className="logout__label">Cerrar Sesión</span>
            </button>
        </div>
    );
};

export default LogoutButton;
