import React from "react";
import { NavItemMobile } from "../NavItemMobile/NavItemMobile";

export const MobileBottomNav: React.FC = () => {
    return (
        <nav className="mobile-bottom-nav" aria-label="Barra inferior">
            <NavItemMobile
                to="/"
                label="Inicio"
                icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5z"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                }
            />
            <NavItemMobile
                to="/accounts"
                label="Cuen.."
                icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <rect
                            x="3"
                            y="5"
                            width="18"
                            height="14"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="1.2"
                        />
                    </svg>
                }
            />
            <NavItemMobile
                to="/movements"
                label="Mov.."
                icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M12 6v6l4 2"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                }
            />
            <NavItemMobile
                to="/profile"
                label="Per.."
                icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 21a7 7 0 0 1 14 0"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                }
            />
        </nav>
    );
};