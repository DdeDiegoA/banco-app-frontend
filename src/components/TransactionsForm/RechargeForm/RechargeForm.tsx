/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Select from "../../Select/Select";
import { Input } from "../../Input/Input";
import { Button } from "../../Button/Button";
import "./RechargeForm.css";

type Values = {
    account: string;
    phone: string;
    operator: string;
    amount: number | "";
    description: string;
};

const phoneRegex = /^[0-9]{7,15}$/;

const schema = Yup.object().shape({
    account: Yup.string().required("Selecciona una cuenta"),
    phone: Yup.string()
        .matches(phoneRegex, "Número de celular no válido")
        .required("Ingresa un número de celular"),
    operator: Yup.string().required("Selecciona un operador"),
    amount: Yup.number()
        .typeError("Ingresa un monto válido")
        .positive("El monto debe ser mayor que 0")
        .required("Ingresa un monto"),
    description: Yup.string().max(200, "Máximo 200 caracteres"),
});

const RechargeForm: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Formik<Values>
            initialValues={{
                account: "",
                phone: "",
                operator: "",
                amount: "",
                description: "",
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                console.log("Recharge submit", values);
                setTimeout(() => {
                    setSubmitting(false);
                    navigate("/transactions");
                }, 600);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue,
            }) => (
                <form className="tx-form" onSubmit={handleSubmit} noValidate>
                    <div className="tx-form__row">
                        <div className="tx-form__col">
                            <Select
                                id="recharge-account"
                                value={values.account}
                                onChange={(v) => setFieldValue("account", v)}
                                options={[
                                    {
                                        value: "",
                                        label: "Selecciona una cuenta",
                                    },
                                    {
                                        value: "savings",
                                        label: "Cuenta de Ahorros ****7890",
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    <div className="tx-form__row">
                        <div className="tx-form__col">
                            <Input
                                id="phone"
                                name="phone"
                                label="Número de celular"
                                placeholder="3001234567"
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                    touched.phone && errors.phone
                                        ? String(errors.phone)
                                        : undefined
                                }
                                fullWidth
                            />
                        </div>
                    </div>

                    <div className="tx-form__row">
                        <div className="tx-form__col">
                            <Select
                                id="operator"
                                value={values.operator}
                                onChange={(v) => setFieldValue("operator", v)}
                                options={[
                                    { value: "", label: "Selecciona operador" },
                                    { value: "movistar", label: "Movistar" },
                                    { value: "claro", label: "Claro" },
                                    { value: "tigo", label: "Tigo" },
                                ]}
                            />
                        </div>
                    </div>

                    <div className="tx-form__row">
                        <div className="tx-form__col">
                            <Input
                                id="amount"
                                name="amount"
                                label="Monto"
                                type="number"
                                placeholder="0"
                                value={values.amount as any}
                                onChange={(e) =>
                                    setFieldValue(
                                        "amount",
                                        e.target.value === ""
                                            ? ""
                                            : Number(e.target.value)
                                    )
                                }
                                onBlur={handleBlur}
                                error={
                                    touched.amount && errors.amount
                                        ? String(errors.amount)
                                        : undefined
                                }
                                fullWidth
                            />
                        </div>
                    </div>

                    <div className="tx-form__row">
                        <div className="tx-form__col">
                            <Input
                                id="description"
                                name="description"
                                label="Descripción (opcional)"
                                placeholder="Concepto de la transacción"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                    touched.description && errors.description
                                        ? String(errors.description)
                                        : undefined
                                }
                                fullWidth
                            />
                        </div>
                    </div>

                    <div className="tx-form__actions">
                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Procesando..." : "Continuar"}
                        </Button>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default RechargeForm;
