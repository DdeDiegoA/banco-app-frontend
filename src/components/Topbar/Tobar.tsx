import "./Topbar.css";

export const Topbar: React.FC<{ onToggleBalances?: () => void }> = ({
    onToggleBalances,
}) => {
    return (
        <header className="topbar">
            <div className="greeting">
                <h1>
                    ¡Hola, <span>Juan!</span>
                </h1>
                <p>Bienvenido a Kairon Bank</p>
            </div>

            <div className="topbar-actions">
                <button
                    className="eye"
                    aria-label="Ocultar saldos"
                    onClick={onToggleBalances}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <circle
                            cx="12"
                            cy="12"
                            r="3"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                <div className="avatar small">JD</div>
            </div>
        </header>
    );
};
