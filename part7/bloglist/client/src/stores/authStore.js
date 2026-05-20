import { create } from "zustand";
import { getUser, saveUser, removeUser } from "../services/persistentUser";

const useAuthStore = create((set) => ({
  user: getUser(),
  actions: {
    login: (user) => {
      saveUser(user);
      set(() => ({ user }));
    },
    logout: () => {
      removeUser();
      set(() => ({ user: null }));
    },
  },
}));

export const useAuth = () => useAuthStore((state) => state.user);
export const useAuthActions = () => useAuthStore((state) => state.actions);
