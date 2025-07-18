'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Filter, Grid, List, Settings, User, Heart, ShoppingBag } from 'lucide-react'

interface HamburgerMenuProps {
  isOpen: boolean
  onToggle: () => void
  onViewChange?: (view: 'grid' | 'list') => void
  currentView?: 'grid' | 'list'
}

const menuVariants = {
  closed: {
    x: "-100%",
    opacity: 0,
  },
  open: {
    x: 0,
    opacity: 1,
  }
}

const overlayVariants = {
  closed: {
    opacity: 0,
  },
  open: {
    opacity: 1,
  }
}

const itemVariants = {
  closed: {
    x: -20,
    opacity: 0
  },
  open: {
    x: 0,
    opacity: 1,
  }
}

export default function HamburgerMenu({ 
  isOpen, 
  onToggle, 
  onViewChange, 
  currentView = 'grid' 
}: HamburgerMenuProps) {
  const categories = [
    'Todos',
    'Tecnología',
    'Computadoras',
    'Audio',
    'Wearables',
    'Tablets',
    'Smartphones',
    'Gaming'
  ]

  const menuItems = [
    { icon: User, label: 'Mi Perfil', href: '/profile' },
    { icon: Heart, label: 'Favoritos', href: '/favorites' },
    { icon: ShoppingBag, label: 'Mis Pedidos', href: '/orders' },
    { icon: Settings, label: 'Configuración', href: '/settings' },
  ]

  return (
    <>
      {/* Menu Toggle Button */}
      <motion.button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 w-12 h-12 rounded-full flex items-center justify-center app-button"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        style={{ backgroundColor: 'var(--app-surface)' }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <X className="w-6 h-6" style={{ color: 'var(--app-text)' }} />
          ) : (
            <Menu className="w-6 h-6" style={{ color: 'var(--app-text)' }} />
          )}
        </motion.div>
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="hamburger-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="p-6 h-full overflow-y-auto">
              {/* Header */}
              <motion.div
                className="mb-8 pt-16"
                custom={0}
                variants={itemVariants}
                initial="closed"
                animate="open"
              >
                <h2 className="text-2xl font-bold" style={{ color: 'var(--app-text)' }}>
                  VendeMass
                </h2>
                <p className="text-sm mt-1" style={{ color: 'var(--app-text-secondary)' }}>
                  Tu marketplace de confianza
                </p>
              </motion.div>

              {/* View Toggle */}
              {onViewChange && (
                <motion.div
                  className="mb-6"
                  custom={1}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                >
                  <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--app-text)' }}>
                    Vista
                  </h3>
                  <div className="flex space-x-2">
                    <motion.button
                      onClick={() => onViewChange('grid')}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all ${
                        currentView === 'grid' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Grid className="w-4 h-4" />
                      <span className="text-sm">Cuadrícula</span>
                    </motion.button>
                    <motion.button
                      onClick={() => onViewChange('list')}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all ${
                        currentView === 'list' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <List className="w-4 h-4" />
                      <span className="text-sm">Lista</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Categories */}
              <motion.div
                className="mb-6"
                custom={2}
                variants={itemVariants}
                initial="closed"
                animate="open"
              >
                <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--app-text)' }}>
                  Categorías
                </h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <motion.button
                      key={category}
                      className="w-full text-left px-3 py-2 rounded-xl transition-all hover:bg-gray-100"
                      style={{ color: 'var(--app-text)' }}
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ x: 4 }}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Filters */}
              <motion.div
                className="mb-6"
                custom={3}
                variants={itemVariants}
                initial="closed"
                animate="open"
              >
                <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--app-text)' }}>
                  Filtros
                </h3>
                <motion.button
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-gray-100 w-full"
                  whileTap={{ scale: 0.98 }}
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-sm">Filtros avanzados</span>
                </motion.button>
              </motion.div>

              {/* Menu Items */}
              <motion.div
                className="mb-6"
                custom={4}
                variants={itemVariants}
                initial="closed"
                animate="open"
              >
                <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--app-text)' }}>
                  Mi Cuenta
                </h3>
                <div className="space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="flex items-center space-x-3 px-3 py-2 rounded-xl transition-all hover:bg-gray-100"
                      style={{ color: 'var(--app-text)' }}
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ x: 4 }}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Footer */}
              <motion.div
                className="mt-auto pt-6 border-t"
                custom={5}
                variants={itemVariants}
                initial="closed"
                animate="open"
                style={{ borderColor: 'var(--app-border)' }}
              >
                <p className="text-xs" style={{ color: 'var(--app-text-secondary)' }}>
                  VendeMass v1.0.0
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--app-text-secondary)' }}>
                  © 2025 Todos los derechos reservados
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
