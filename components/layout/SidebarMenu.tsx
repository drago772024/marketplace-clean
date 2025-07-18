'use client'

import { Filter, Grid, List, Settings, User, Heart, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useMenuStore } from '@/lib/stores/menu'

interface SidebarMenuProps {
  onViewChange?: (view: 'grid' | 'list') => void
  currentView?: 'grid' | 'list'
}

export default function SidebarMenu({ 
  onViewChange, 
  currentView = 'grid' 
}: SidebarMenuProps) {
  const { isMenuOpen, toggleMenu } = useMenuStore()

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
      {/* Menu Toggle Badge */}
      <motion.button
        onClick={toggleMenu}
        className="menu-toggle-badge"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        style={{
          left: isMenuOpen ? '292px' : '16px'
        }}
      >
        <motion.div
          animate={{ rotate: isMenuOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isMenuOpen ? (
            <ChevronLeft className="w-6 h-6" />
          ) : (
            <ChevronRight className="w-6 h-6" />
          )}
        </motion.div>
      </motion.button>

      {/* Sidebar Menu */}
      <motion.div
        className={`sidebar-menu ${isMenuOpen ? 'open' : 'closed'}`}
        initial={false}
        animate={{
          width: isMenuOpen ? 280 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: isMenuOpen ? 1 : 0 }}
            transition={{ delay: isMenuOpen ? 0.2 : 0 }}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: isMenuOpen ? 1 : 0 }}
              transition={{ delay: isMenuOpen ? 0.3 : 0 }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: isMenuOpen ? 1 : 0 }}
            transition={{ delay: isMenuOpen ? 0.4 : 0 }}
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
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isMenuOpen ? 1 : 0,
                    x: isMenuOpen ? 0 : -20
                  }}
                  transition={{ 
                    delay: isMenuOpen ? 0.5 + (index * 0.05) : 0,
                    duration: 0.2
                  }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: isMenuOpen ? 1 : 0 }}
            transition={{ delay: isMenuOpen ? 0.6 : 0 }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: isMenuOpen ? 1 : 0 }}
            transition={{ delay: isMenuOpen ? 0.7 : 0 }}
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
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isMenuOpen ? 1 : 0,
                    x: isMenuOpen ? 0 : -20
                  }}
                  transition={{ 
                    delay: isMenuOpen ? 0.8 + (index * 0.05) : 0,
                    duration: 0.2
                  }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: isMenuOpen ? 1 : 0 }}
            transition={{ delay: isMenuOpen ? 0.9 : 0 }}
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
    </>
  )
}
