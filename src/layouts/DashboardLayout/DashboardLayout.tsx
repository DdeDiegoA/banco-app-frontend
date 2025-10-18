import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MobileBottomNav } from "../../components/MobileBottomNav/MobileBottomNav";
import "./DashboardLayout.css";
import { Outlet } from "react-router-dom";
import GlobalSpinner from "../../components/GlobalSpinner/GlobalSpinner";

export default function DashboardLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="dashboard-shell" data-collapsed={collapsed}>
            <GlobalSpinner />
            <Sidebar
                collapsed={collapsed}
                onToggle={() => setCollapsed((s) => !s)}
                mobileOpen={mobileOpen}
                // setMobileOpen={setMobileOpen}
            />

            <main className="main-area">
                <Outlet />
            </main>

            <MobileBottomNav />
        </div>
    );
}
