import { type RouteObject } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import AccountsPage from "../pages/AccountsPage/AccountsPage";
import MovementsPage from "../pages/MovementsPage/MovementsPage";
import TransactionsPage from "../pages/TransactionPage/TransactionPage";
import RechargePage from "../pages/RechargePage/RechargePage";
import TransferPage from "../pages/TransferPage/TransferPage";
import PayPage from "../pages/PayPage/PayPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";

export const privateRoutes: RouteObject[] = [
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/",
                element: <DashboardPage />,
            },
            {
                path: "/accounts",
                element: <AccountsPage />,
            },
            {
                path: "/movements",
                element: <MovementsPage />,
            },
            {
                path: "/transactions",
                element: <TransactionsPage />,
            },
            {
                path: "transactions/recharge",
                element: <RechargePage />,
            },
            {
                path: "transactions/transfer",
                element: <TransferPage />,
            },
            {
                path: "transactions/pay",
                element: <PayPage />,
            },
            {
                path: "/profile",
                element: <ProfilePage />,
            },
        ],
    },
];
