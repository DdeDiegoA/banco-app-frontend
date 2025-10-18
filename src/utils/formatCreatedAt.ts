export const formatCreatedAt = (createdAt: string) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

export const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};
