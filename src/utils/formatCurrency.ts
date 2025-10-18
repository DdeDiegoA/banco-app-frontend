export const formatCurrencyCop = (amount: number) => {
    return amount.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
    });
};
