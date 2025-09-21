import { create } from "zustand";
import type { user } from "../types/user.types.tsx";

type UserState = {
    userData: user | undefined;
    setUserData: (user?: user) => void;
};

export const useUserStore = create<UserState>((set) => ({
    userData: undefined,
    setUserData: (user) => set({ userData: user }),
}));
