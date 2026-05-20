import { create } from "zustand";

const useNotifStore = create((set) => ({
  notif: null,
  actions: {
    notify: (notif) => {
      set(() => ({ notif }));
      setTimeout(() => set(() => ({ notif: null })), 5000);
    },
  },
}));

export const useNotif = () => useNotifStore((state) => state.notif);
export const useNotifActions = () => useNotifStore((state) => state.actions);
