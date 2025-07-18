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

interface ProductCardListProps {
  product: Product
  onClick?: () => void
}

export default function ProductCardList({ product, onClick }: ProductCardListProps) {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <motion.div
      className="product-card-list"
      onClick={onClick}
      whileHover={{ 
        y: -4,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div className="image-container">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="140px"
        />
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <motion.div
            className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-medium"
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
      
      {/* Content */}
      <div className="content">
        <div>
          {/* Category */}
          <div className="category">
            {product.category}
          </div>
          
          {/* Product Name */}
          <h4 className="font-semibold line-clamp-2">
            {product.name}
          </h4>
          
          {/* Rating */}
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm ml-1" style={{ color: 'var(--app-text-secondary)' }}>
                {product.rating} ({product.reviews} reseñas)
              </span>
            </div>
          </div>
        </div>
        
        {/* Price and Actions */}
        <div className="price-section">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold" style={{ color: 'var(--app-text)' }}>
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm line-through" style={{ color: 'var(--app-text-secondary)' }}>
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <FavoriteButton 
              productId={product.id.toString()} 
              className="relative opacity-100 transform-none bg-transparent hover:bg-gray-100"
            />
            
            <motion.button
              className="app-button px-4 py-2 text-sm flex items-center space-x-2"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={(e) => {
                e.stopPropagation()
                // Add to cart logic here
              }}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Agregar al carrito</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}