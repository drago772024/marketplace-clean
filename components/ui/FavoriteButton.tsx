'use client'

import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useFavoritesStore } from '@/lib/stores/favorites'

interface FavoriteButtonProps {
  productId: string
  className?: string
}

export default function FavoriteButton({ productId, className = '' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore()
  const isActive = isFavorite(productId)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(productId)
  }

  return (
    <button
      onClick={handleClick}
      className={`favorite-button ${isActive ? 'active' : ''} ${className}`}
    >
      <motion.div
        animate={{ 
          scale: isActive ? [1, 1.2, 1] : 1,
          rotate: isActive ? [0, -10, 10, 0] : 0
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <Heart 
          className={`w-5 h-5 transition-colors duration-200 ${
            isActive ? 'fill-current' : ''
          }`}
        />
      </motion.div>
    </button>
  )
}
