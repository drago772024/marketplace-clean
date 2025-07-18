import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MenuStore {
  isMenuOpen: boolean
  toggleMenu: () => void
  setMenuOpen: (open: boolean) => void
}

export const useMenuStore = create<MenuStore>()(
  persist(
    (set) => ({
      isMenuOpen: true, // Abierto por defecto
      
      toggleMenu: () => {
        set((state) => ({ isMenuOpen: !state.isMenuOpen }))
      },
      
      setMenuOpen: (open: boolean) => {
        set({ isMenuOpen: open })
      }
    }),
    {
      name: 'vendemass-menu',
    }
  )
)
