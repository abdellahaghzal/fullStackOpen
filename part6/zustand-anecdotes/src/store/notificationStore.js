import { create } from 'zustand'

const useNotificationStore = create(set => ({
  message: null,
  actions: {
    setMessage: (message) => set(() => ({ message }))
  }
}))

export const useNotification = () => useNotificationStore(state => state.message)
export const useNotificationActions = () => useNotificationStore(state => state.actions)