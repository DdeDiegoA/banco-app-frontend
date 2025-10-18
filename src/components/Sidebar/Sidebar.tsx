import { NavItem } from "../NavItem/NavItem";
import { IconButton } from "../IconButton/IconButton";
import "./Sidebar.css";
import { useUserStore } from "../../stores/useUserStore";
import { getInitials } from "../../utils/getInitials";

export default function Sidebar({
    collapsed,
    onToggle,
    mobileOpen,
}: {
    collapsed: boolean;
    onToggle: () => void;
    mobileOpen: boolean;
}) {
    const {
        userData: { client },
    } = useUserStore();

    if (!client) return null;
    const { name } = client;

    return (
        <aside
            className={`sidebar ${collapsed ? "collapsed" : ""} ${
                mobileOpen ? "mobile-open" : ""
            }`}
            aria-expanded={!collapsed}
        >
            <div className="sidebar-top">
                <div className="brand">
                    <div className="brand-logo">$</div>
                    {!collapsed && (
                        <div className="brand-text">Kairon Bank</div>
                    )}
                </div>

                <div className="profile">
                    {!collapsed && (
                        <div className="profile-info">
                            <div className="profile-name">{name}</div>
                            <div className="profile-sub">Usuario</div>
                        </div>
                    )}
                    <div className="profile-avatar">{getInitials(name)}</div>
                </div>
            </div>
            <nav className="sidebar-nav" aria-label="Main navigation">
                <ul role="menu">
                    <NavItem
                        label="Inicio"
                        icon={
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5z"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        }
                        to="/"
                    />

                    <NavItem
                        label="Cuentas"
                        icon={
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
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
                        to="/accounts"
                    />

                    <NavItem
                        label="Movimientos"
                        icon={
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M12 6v6l4 2"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        }
                        to="/movements"
                    />

                    <NavItem
                        label="Transacciones"
                        icon={
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M7 7h10M7 12h10M7 17h10"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        }
                        to="/transactions"
                    />

                    <NavItem
                        label="Perfil"
                        icon={
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 21a7 7 0 0 1 14 0"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        }
                        to="/profile"
                    />
                </ul>
            </nav>
            <div className="sidebar-controls">
                <IconButton
                    aria-label={
                        collapsed
                            ? "Expandir barra lateral"
                            : "Colapsar barra lateral"
                    }
                    onClick={onToggle}
                >
                    {collapsed ? (
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M8 4v16"
                                stroke="currentColor"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                            />
                            <path
                                d="M16 7l-4 5 4 5"
                                stroke="currentColor"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    ) : (
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M16 4v16"
                                stroke="currentColor"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                            />
                            <path
                                d="M8 7l4 5-4 5"
                                stroke="currentColor"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </IconButton>

                {/* <IconButton
                    aria-label="Abrir menu movil"
                    onClick={() => setMobileOpen((s) => !s)}
                    className="mobile-toggle"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M3 12h18"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                        />
                        <path
                            d="M3 6h18"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                        />
                        <path
                            d="M3 18h18"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                        />
                    </svg>
                </IconButton> */}
            </div>
            {/* mobile backdrop (click to close) */}
            {mobileOpen && <div className="sidebar-backdrop" />}
        </aside>
    );
}
