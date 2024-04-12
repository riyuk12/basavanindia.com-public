import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      id: "",
      name: "",
      email: "",
      avatar: "",
      role: "admin",
      resetToken: "",
      token: "",
      data:[],
      setToken: (token) => set((state) => ({ ...state, token: token })),
      setId: (id) => set((state) => ({ ...state, id: id })),
      setName: (name) => set((state) => ({ ...state, name: name })),
      setEmail: (email) => set((state) => ({ ...state, email: email })),
      setAvatar: (avatar) => set((state) => ({ ...state, avatar: avatar })),
      setRole: (role) => set((state) => ({ ...state, role: role })),
      setResetToken: (resetToken) => set((state) => ({ ...state, resetToken: resetToken })),
      setData: (data) => set((state) => ({ ...state, data: data })),
      reset: () => set((state) => ({ ...state, id: "", name: "", email: "", avatar: "", role: "", resetToken: "", token: "",data:[] })),
    }),
    {
      name: 'user-store', // Optional: Specify a name for the store
      getStorage: () => localStorage, // Choose 'localStorage' or 'sessionStorage'
    }
  )
);