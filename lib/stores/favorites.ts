import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesStore {
  favorites: string[]
  toggleFavorite: (productId: string) => void
  isFavorite: (productId: string) => boolean
  getFavoritesCount: () => number
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      toggleFavorite: (productId: string) => {
        set((state) => {
          const isCurrentlyFavorite = state.favorites.includes(productId)
          if (isCurrentlyFavorite) {
            return {
              favorites: state.favorites.filter(id => id !== productId)
            }
          } else {
            return {
              favorites: [...state.favorites, productId]
            }
          }
        })
      },
      
      isFavorite: (productId: string) => {
        return get().favorites.includes(productId)
      },
      
      getFavoritesCount: () => {
        return get().favorites.length
      }
    }),
    {
      name: 'vendemass-favorites',
    }
  )
)
