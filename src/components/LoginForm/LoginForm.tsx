import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";
import "./LoginForm.css";

export interface LoginFormValues {
    username: string;
    password: string;
    rememberMe: boolean;
}

interface LoginFormProps {
    onSubmit: (values: LoginFormValues) => void | Promise<void>;
    onForgotPassword?: () => void;
    isLoading?: boolean;
}

const loginValidationSchema = Yup.object({
    username: Yup.string()
        .required("El usuario es requerido")
        .min(3, "El usuario debe tener al menos 3 caracteres"),
    password: Yup.string()
        .required("La contraseña es requerida")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
    rememberMe: Yup.boolean(),
});

export const LoginForm: React.FC<LoginFormProps> = ({
    onSubmit,
    onForgotPassword,
    isLoading = false,
}) => {
    const formik = useFormik<LoginFormValues>({
        initialValues: {
            username: "",
            password: "",
            rememberMe: false,
        },
        validationSchema: loginValidationSchema,
        onSubmit: async (values) => {
            console.log(values);
            await onSubmit(values);
        },
    });

    return (
        <form className="login-form" onSubmit={formik.handleSubmit}>
            <div className="login-form__field">
                <Input
                    id="username"
                    name="username"
                    type="text"
                    label="Usuario"
                    placeholder="Ingresa tu usuario"
                    fullWidth
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.username && formik.errors.username
                            ? formik.errors.username
                            : undefined
                    }
                    disabled={isLoading}
                />
            </div>

            <div className="login-form__field">
                <Input
                    id="password"
                    name="password"
                    type="password"
                    label="Contraseña"
                    placeholder="Ingresa tu contraseña"
                    fullWidth
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.password && formik.errors.password
                            ? formik.errors.password
                            : undefined
                    }
                    disabled={isLoading}
                />
            </div>

            <div className="login-form__options">
                <Checkbox
                    id="rememberMe"
                    name="rememberMe"
                    label="Recordar usuario"
                    checked={formik.values.rememberMe}
                    onChange={formik.handleChange}
                    disabled={isLoading}
                />
            </div>

            <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isLoading}
                disabled={isLoading || !formik.isValid}
            >
                Ingresar
            </Button>

            {onForgotPassword && (
                <button
                    type="button"
                    className="login-form__forgot-link"
                    onClick={onForgotPassword}
                    disabled={isLoading}
                >
                    ¿Olvidaste tu contraseña?
                </button>
            )}
        </form>
    );
};
