/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./PayForm.css";
import { useNavigate } from "react-router-dom";
import Select from "../../Select/Select";
import { Input } from "../../Input/Input";
import { Button } from "../../Button/Button";

type Values = {
    account: string;
    service: string;
    reference: string;
    amount: number | "";
    description: string;
};

const schema = Yup.object().shape({
    account: Yup.string().required("Selecciona una cuenta"),
    service: Yup.string().required("Selecciona un servicio"),
    reference: Yup.string().required("Ingresa la referencia de pago"),
    amount: Yup.number()
        .typeError("Ingresa un monto válido")
        .positive("El monto debe ser mayor que 0")
        .required("Ingresa un monto"),
    description: Yup.string().max(200, "Máximo 200 caracteres"),
});

const PayForm: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Formik<Values>
            initialValues={{
                account: "",
                service: "",
                reference: "",
                amount: "",
                description: "",
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                console.log("Pay submit", values);
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
                                id="pay-account"
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
                            <Select
                                id="service"
                                value={values.service}
                                onChange={(v) => setFieldValue("service", v)}
                                options={[
                                    {
                                        value: "",
                                        label: "Selecciona el servicio",
                                    },
                                    {
                                        value: "water",
                                        label: "Agua - Empresa X",
                                    },
                                    {
                                        value: "electric",
                                        label: "Electricidad - Empresa Y",
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    <div className="tx-form__row">
                        <div className="tx-form__col">
                            <Input
                                id="reference"
                                name="reference"
                                label="Referencia de pago"
                                placeholder="Número de contrato o referencia"
                                value={values.reference}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                    touched.reference && errors.reference
                                        ? String(errors.reference)
                                        : undefined
                                }
                                fullWidth
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

export default PayForm;
