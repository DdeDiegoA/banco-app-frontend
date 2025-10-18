/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
import Select from "../../Select/Select";
import { Input } from "../../Input/Input";
import { Button } from "../../Button/Button";
import "./TransferForm.css";
import { useUserStore } from "../../../stores/useUserStore";
import { adjustAccountNumber } from "../../../utils/transactionAccounts";
import { AccountType } from "../../../types/user.types";
import { useTransfer } from "../../../hooks/useTransfer";

type Values = {
    fromAccount: string;
    toAccount: string;
    amount: number | "";
    description: string;
};

const schema = Yup.object().shape({
    fromAccount: Yup.string().required("Selecciona una cuenta de origen"),
    toAccount: Yup.string().required("Ingresa número de cuenta o usuario"),
    amount: Yup.number()
        .typeError("Ingresa un monto válido")
        .positive("El monto debe ser mayor que 0")
        .required("Ingresa un monto"),
    description: Yup.string().max(200, "Máximo 200 caracteres"),
});

const ensureAccountPrefix = (value: string) => {
    // Si ya viene con ACCT- no lo duplica
    if (!value) return value;
    const trimmed = value.trim();
    return trimmed.startsWith("ACCT-") ? trimmed : `ACCT-${trimmed}`;
};

const TransferForm: React.FC = () => {
    // const navigate = useNavigate();
    const {
        userData: { accounts },
    } = useUserStore();
    const transfer = useTransfer();

    return (
        <Formik<Values>
            initialValues={{
                fromAccount: "",
                toAccount: "",
                amount: "",
                description: "",
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
                transfer.mutate({
                    fromAccountNumber: values.fromAccount,
                    toAccountNumber: ensureAccountPrefix(values.toAccount),
                    amount: Number(values.amount),
                });
                setSubmitting(false);
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
                                id="fromAccount"
                                value={values.fromAccount}
                                onChange={(v) =>
                                    setFieldValue("fromAccount", v)
                                }
                                options={[
                                    {
                                        value: "",
                                        label: "Selecciona una cuenta",
                                    },
                                    ...accounts.map((account) => ({
                                        value: account.accountNumber,
                                        label: `Cuenta ${
                                            AccountType[account.type]
                                        } ${adjustAccountNumber(
                                            account.accountNumber
                                        )}`,
                                    })),
                                ]}
                            />
                        </div>
                    </div>

                    <div className="tx-form__row">
                        <div className="tx-form__col">
                            <Input
                                id="toAccount"
                                name="toAccount"
                                label="Cuenta destino"
                                placeholder="Número de cuenta o usuario"
                                value={values.toAccount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                    touched.toAccount && errors.toAccount
                                        ? String(errors.toAccount)
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
                                value={values.amount}
                                onChange={(e) => {
                                    const v = e.target.value;
                                    setFieldValue(
                                        "amount",
                                        v === "" ? "" : Number(v)
                                    );
                                }}
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

export default TransferForm;
