'use client'

import { Home, Search, Heart, ShoppingCart, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { useFavoritesStore } from '@/lib/stores/favorites'

interface MobileBottomNavProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export default function MobileBottomNav({ 
  activeTab = 'home', 
  onTabChange 
}: MobileBottomNavProps) {
  const { getFavoritesCount } = useFavoritesStore()

  const navItems = [
    { id: 'home', icon: Home, label: 'Inicio' },
    { id: 'search', icon: Search, label: 'Buscar' },
    { id: 'favorites', icon: Heart, label: 'Favoritos', badge: getFavoritesCount() },
    { id: 'cart', icon: ShoppingCart, label: 'Carrito', badge: 3 },
    { id: 'profile', icon: User, label: 'Perfil' },
  ]

  return (
    <div className="mobile-bottom-nav md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onTabChange?.(item.id)}
            className={`mobile-nav-item ${activeTab === item.id ? 'active' : ''}`}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <item.icon className="w-6 h-6" />
              {item.badge && item.badge > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  style={{ 
                    backgroundColor: item.id === 'favorites' ? 'var(--app-accent)' : 'var(--app-primary)' 
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  {item.badge}
                </motion.span>
              )}
            </div>
            <span className="text-xs mt-1">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
