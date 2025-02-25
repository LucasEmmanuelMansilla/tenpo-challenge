import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Token } from '../types';

// Definir la store correctamente
export const useAuthStore = create<Token>()(
  persist(
    set => ({
      token: '',
      saveToken: (value: string) => set(state => ({ ...state, token: value })),
      removeToken: () => set(state => ({ ...state, token: '' })),
    }),
    {
      name: 'direction-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);