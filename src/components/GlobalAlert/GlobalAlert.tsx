import React, { useEffect, useRef, type JSX } from "react";
import { useAlertStore } from "../../stores/useAlertStore";
import "./GlobalAlert.css";

const ICONS: Record<string, JSX.Element> = {
    success: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
                d="M20 6L9 17l-5-5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    warning: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
                d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 9v4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 17h.01"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    error: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6 6l12 12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
};

const GlobalAlert: React.FC = () => {
    const { visible, type, title, message, hideAlert } = useAlertStore();
    const panelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!visible) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") hideAlert();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [visible, hideAlert]);

    if (!visible) return null;

    const onOverlayClick = (e: React.MouseEvent) => {
        // If clicking overlay (not inside panel) -> close
        if (e.target === e.currentTarget) hideAlert();
    };

    return (
        <div
            className="global-alert__overlay"
            onMouseDown={onOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-live="polite"
        >
            <div
                className={`global-alert__panel global-alert__panel--${type}`}
                ref={panelRef}
            >
                <button
                    className="global-alert__close"
                    onClick={() => hideAlert()}
                    aria-label="Cerrar alerta"
                >
                    ×
                </button>

                <div className="global-alert__body">
                    <div className="global-alert__icon" aria-hidden>
                        {ICONS[type]}
                    </div>

                    <div className="global-alert__content">
                        {title && (
                            <div className="global-alert__title">{title}</div>
                        )}
                        {message && (
                            <div className="global-alert__message">
                                {message}
                            </div>
                        )}
                    </div>
                </div>

                <div className="global-alert__actions">
                    <button
                        className="global-alert__action-btn"
                        onClick={() => hideAlert()}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GlobalAlert;
