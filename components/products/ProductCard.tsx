'use client'

import { Star, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import FavoriteButton from '@/components/ui/FavoriteButton'

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
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <motion.div
      className="product-card-app"
      onClick={onClick}
      whileHover={{ 
        y: -8,
        scale: 1.03,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div className="product-image-container">
        <motion.div
          className="product-image"
          whileHover={{ 
            scale: 1.1,
            transition: { duration: 0.5, ease: "easeOut" }
          }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 374px) 50vw, (max-width: 743px) 50vw, (max-width: 949px) 25vw, (max-width: 1127px) 20vw, (max-width: 1439px) 16.66vw, 14.28vw"
          />
        </motion.div>
        
        {/* Favorite Button */}
        <FavoriteButton productId={product.id.toString()} />
        
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
      <motion.div 
        className="p-4 flex-1 flex flex-col justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Category */}
        <div className="text-sm mb-1" style={{ color: 'var(--app-text-secondary)' }}>
          {product.category}
        </div>
        
        {/* Product Name */}
        <h4 className="font-semibold mb-2 line-clamp-2 text-base" style={{ color: 'var(--app-text)' }}>
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
            <span className="text-lg font-bold" style={{ color: 'var(--app-text)' }}>
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm line-through" style={{ color: 'var(--app-text-secondary)' }}>
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          <motion.button
            className="app-button px-3 py-2 text-sm flex items-center space-x-1"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={(e) => {
              e.stopPropagation()
              // Add to cart logic here
            }}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Agregar</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
