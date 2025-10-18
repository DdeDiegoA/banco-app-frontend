export const getInitials = (name: string) => {
    if (!name) return "";
    const names = name.split(" ");
    return names.map((name) => name.charAt(0).toUpperCase()).join("");
};
