import React from "react";
import {
    LoginForm,
    type LoginFormValues,
} from "../../components/LoginForm/LoginForm";
import { useLogin } from "../../services/auth.service";
import "./LoginPage.css";

export const LoginPage: React.FC = () => {
    const { mutate, isPending: isLoading } = useLogin();

    const handleLogin = (values: LoginFormValues) => {
        mutate({ username: values.username, password: values.password });
    };

    const handleForgotPassword = () => {
        console.log("Forgot password clicked");
        alert("Funcionalidad de recuperar contraseña");
    };

    return (
        <div className="login-page">
            {/* Branding Section */}
            <div className="login-page__branding">
                <div className="login-page__branding-content">
                    <div className="login-page__logo">
                        <svg
                            className="login-page__logo-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <text
                                x="12"
                                y="18"
                                fontSize="20"
                                fontWeight="bold"
                                textAnchor="middle"
                                fill="currentColor"
                            >
                                $
                            </text>
                        </svg>
                    </div>

                    <h1 className="login-page__title">Kairon Bank</h1>
                    <p className="login-page__subtitle">
                        Banca digital segura y moderna
                    </p>

                    <ul className="login-page__features">
                        <li className="login-page__feature">
                            <div className="login-page__feature-icon">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16.6667 5L7.50004 14.1667L3.33337 10"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div className="login-page__feature-content">
                                <h3 className="login-page__feature-title">
                                    Seguridad Avanzada
                                </h3>
                                <p className="login-page__feature-description">
                                    Protegemos tu información con los más altos
                                    estándares de seguridad
                                </p>
                            </div>
                        </li>

                        <li className="login-page__feature">
                            <div className="login-page__feature-icon">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16.6667 5L7.50004 14.1667L3.33337 10"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div className="login-page__feature-content">
                                <h3 className="login-page__feature-title">
                                    Acceso 24/7
                                </h3>
                                <p className="login-page__feature-description">
                                    Realiza tus operaciones en cualquier momento
                                    y desde cualquier lugar
                                </p>
                            </div>
                        </li>

                        <li className="login-page__feature">
                            <div className="login-page__feature-icon">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16.6667 5L7.50004 14.1667L3.33337 10"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div className="login-page__feature-content">
                                <h3 className="login-page__feature-title">
                                    Sin Comisiones
                                </h3>
                                <p className="login-page__feature-description">
                                    Disfruta de transferencias y consultas sin
                                    costos adicionales
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Form Section */}
            <div className="login-page__form-section">
                <div className="login-page__form-container">
                    <div className="login-page__form-header">
                        <h2 className="login-page__form-title">
                            Iniciar Sesión
                        </h2>
                        <p className="login-page__form-description">
                            Accede a tu cuenta de Kairon Bank
                        </p>
                    </div>

                    <LoginForm
                        onSubmit={handleLogin}
                        onForgotPassword={handleForgotPassword}
                        isLoading={isLoading}
                    />

                    <p className="login-page__terms">
                        Al iniciar sesión, aceptas nuestros{" "}
                        <a href="#" className="login-page__terms-link">
                            Términos y Condiciones
                        </a>{" "}
                        y{" "}
                        <a href="#" className="login-page__terms-link">
                            Política de Privacidad
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};
