import React from "react";
import "./ProfilePage.css";

import ProfileCard from "../../components/ProfileCard/ProfileCard";
import SettingsCard from "../../components/SettingsCard/SettingsCard";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { useUserStore } from "../../stores/useUserStore";
import { getInitials } from "../../utils/getInitials";
import { useLogout } from "../../services/auth.service";

/**
 * ProfilePage - Página de Perfil (Mi Perfil)
 * Estructura semántica: header, main (section + aside), footer
 */

const ProfilePage: React.FC = () => {
    const {
        userData: { client },
    } = useUserStore();
    const logout = useLogout();

    const settings = [
        {
            id: "change-password",
            title: "Cambiar contraseña",
            subtitle: "",
            icon: "lock",
            href: "/profile/change-password",
        },
        {
            id: "help",
            title: "Ayuda y soporte",
            subtitle: "",
            icon: "help",
            href: "/support",
        },
    ];

    return (
        <div className="profile-page">
            <header className="profile-page__header" role="banner">
                <h1 className="profile-page__title">Mi Perfil</h1>
            </header>

            <main className="profile-page__main" role="main">
                <section
                    className="profile-page__col profile-page__col--left"
                    aria-labelledby="profile-card-title"
                >
                    {client && (
                        <ProfileCard
                            id="profile-card"
                            initials={getInitials(client.name)}
                            name={client.name}
                            // memberSince={user.memberSince}
                            email={client.email}
                            phone={client.phone}
                        />
                    )}

                    <div className="profile-page__spacer" />

                    <SettingsCard
                        id="config-card"
                        title="Configuración"
                        items={[
                            {
                                id: "push",
                                title: "Notificaciones push",
                                subtitle: "Recibe alertas de transacciones",
                                type: "toggle",
                                keyName: "push",
                                defaultValue: true,
                            },
                        ]}
                    />
                </section>

                <aside
                    className="profile-page__col profile-page__col--right"
                    aria-labelledby="profile-actions-title"
                >
                    <div className="profile-actions" aria-hidden>
                        <h2
                            id="profile-actions-title"
                            className="profile-actions__title sr-only"
                        >
                            Acciones
                        </h2>

                        <div className="profile-actions__list">
                            <SettingsCard
                                id="quick-actions"
                                title=""
                                items={settings.map((s) => ({
                                    ...s,
                                    type: "link",
                                }))}
                                compact
                            />
                        </div>

                        <div className="profile-actions__logout">
                            <LogoutButton onClick={logout} />
                        </div>
                    </div>
                </aside>
            </main>

            <footer className="profile-page__footer" role="contentinfo">
                <div className="profile-footer__text">
                    <div>Kairon Bank v2.1.0</div>
                    <div>
                        © 2024 Kairon Bank. Todos los derechos reservados.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ProfilePage;
