'use client'

import { Star, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import FavoriteButton from '@/components/ui/FavoriteButton'
import { useFavoritesStore } from '@/lib/stores/favorites'

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
}

interface ProductCardProps {
  product: Product
  onClick?: () => void
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const [isImageHovered, setIsImageHovered] = useState(false)
  const { isFavorite } = useFavoritesStore()
  const isProductFavorite = isFavorite(product.id.toString())
  
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  // Handler for add to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    console.log('Add to cart:', product.name)
  }

  return (
    <div
      className="product-card-app cursor-pointer transition-shadow duration-200 hover:shadow-lg"
      onClick={onClick}
    >
      {/* Image Container */}
      <div 
        className="product-image-container group relative"
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
      >
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 374px) 50vw, (max-width: 743px) 50vw, (max-width: 949px) 25vw, (max-width: 1127px) 20vw, (max-width: 1439px) 16.66vw, 14.28vw"
          />
        </div>
        
        {/* Favorite Button - Simplified */}
        <div 
          className="absolute top-3 right-3 transition-opacity duration-200"
          style={{ opacity: isImageHovered || isProductFavorite ? 1 : 0 }}
        >
          <FavoriteButton productId={product.id.toString()} />
        </div>
      
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <motion.div
          className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-medium"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 15,
            delay: 0.2 
          }}
        >
          -{discountPercentage}%
        </motion.div>
      )}
    </div>
    
    {/* Product Info */}
    <div className="p-4 flex-1 flex flex-col justify-between">
      {/* Category */}
      <div 
        className="text-sm mb-1 transition-colors duration-200 hover:text-blue-500" 
        style={{ color: 'var(--app-text-secondary)' }}
      >
        {product.category}
      </div>
      
      {/* Product Name */}
      <h4 
        className="font-semibold mb-2 line-clamp-2 text-base transition-colors duration-200 hover:text-blue-600" 
        style={{ color: 'var(--app-text)' }}
      >
        {product.name}
      </h4>
      
      {/* Rating */}
      <div className="flex items-center mb-3">
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm ml-1" style={{ color: 'var(--app-text-secondary)' }}>
            {product.rating} ({product.reviews})
          </span>
        </div>
      </div>
      
      {/* Price and Add Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span 
            className="text-lg font-bold transition-colors duration-200 hover:text-green-600" 
            style={{ color: 'var(--app-text)' }}
          >
            ${product.price}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm line-through" style={{ color: 'var(--app-text-secondary)' }}>
              ${product.originalPrice}
            </span>
          )}
        </div>
        
        <button
          className="app-button px-3 py-2 text-sm flex items-center space-x-1"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Agregar</span>
        </button>
      </div>
    </div>
  )
}
