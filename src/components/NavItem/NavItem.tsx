import React from "react";
import { NavLink } from "react-router-dom";

export const NavItem: React.FC<{
    label: string;
    icon: React.ReactNode;
    to: string;
    onClick?: () => void;
}> = ({ label, icon, to, onClick }) => (
    <li>
        <NavLink
            to={to}
            role="menuitem"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            onClick={onClick}
            end
        >
            <span className="nav-icon">{icon}</span>
            <span className="nav-label">{label}</span>
        </NavLink>
    </li>
);