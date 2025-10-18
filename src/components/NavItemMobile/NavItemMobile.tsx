import React from "react";
import { NavLink } from "react-router-dom";

export const NavItemMobile: React.FC<{
    label: string;
    icon: React.ReactNode;
    to: string;
    onClick?: () => void;
}> = ({ label, icon, to, onClick }) => (
    <NavLink
        to={to}
        className={({ isActive }) => `mbn-item ${isActive ? "active" : ""}`}
        onClick={onClick}
        end
    >
        {icon}
        <span>{label}</span>
    </NavLink>
);
