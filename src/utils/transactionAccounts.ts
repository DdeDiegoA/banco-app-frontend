import type { LedgerEntry } from "../types/user.types";

export const transactionAccount = (
    type: string,
    transaction: LedgerEntry["transaction"]
) => {
    if (type === "DEBIT") {
        return `Recibiste de ${adjustAccountNumber(
            transaction.fromAccount.accountNumber
        )}`;
    }
    return `Enviaste a ${adjustAccountNumber(
        transaction.toAccount.accountNumber
    )}`;
};

export const adjustAccountNumber = (acc: string) => {
    let accNumber = acc.split("-")[1];
    accNumber = accNumber.replace(/\d(?=\d{4})/g, "*");
    return accNumber;
};
