'use client'

import { Filter, Grid, List, Settings, User, Heart, ShoppingBag, ChevronLeft, Menu } from 'lucide-react'
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
      {/* Menu Toggle Button */}
      <motion.button
        onClick={toggleMenu}
        className="menu-toggle-button"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        style={{
          position: 'fixed',
          top: '12px',
          left: isMenuOpen ? '260px' : '12px',
          zIndex: 90,
          backgroundColor: 'rgba(37, 99, 235, 0.9)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          fontWeight: '500',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
        }}
        animate={{
          left: isMenuOpen ? '260px' : '12px',
          scale: isMenuOpen ? 0.95 : 1
        }}
        transition={{ 
          type: "tween",
          duration: 0.05,
          ease: "easeOut"
        }}
      >
        <motion.div
          animate={{ rotate: isMenuOpen ? 0 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isMenuOpen ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </motion.div>
        <span>{isMenuOpen ? '' : 'Menu'}</span>
      </motion.button>

      {/* Sidebar Menu */}
      <motion.div
        className={`sidebar-menu ${isMenuOpen ? 'open' : 'closed'}`}
        initial={false}
        animate={{
          width: isMenuOpen ? 280 : 8,
          x: 0
        }}
        transition={{
          type: "tween",
          duration: 0.05,
          ease: "easeOut"
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          zIndex: 80,
          backgroundColor: isMenuOpen ? 'var(--app-card-bg)' : 'rgba(37, 99, 235, 0.1)',
          borderRight: isMenuOpen ? '1px solid var(--app-border)' : '2px solid rgba(37, 99, 235, 0.2)',
          backdropFilter: isMenuOpen ? 'blur(10px)' : 'none',
          boxShadow: isMenuOpen ? '4px 0 20px rgba(0, 0, 0, 0.1)' : 'none'
        }}
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: isMenuOpen ? 1 : 0,
              x: isMenuOpen ? 0 : -20
            }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 25,
              delay: isMenuOpen ? 0.05 : 0
            }}
          >
            <h2 
              className="text-2xl font-bold cursor-pointer hover:transition-all" 
              style={{ 
                color: 'var(--app-text)',
                transition: 'all 0.3s ease, text-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.textShadow = '0 0 12px rgba(255, 255, 255, 0.8), 0 0 24px rgba(255, 255, 255, 0.5)'
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.textShadow = 'none'
              }}
            >
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: isMenuOpen ? 1 : 0,
                y: isMenuOpen ? 0 : 10
              }}
              transition={{ 
                type: "spring",
                stiffness: 600,
                damping: 30,
                delay: isMenuOpen ? 0.08 : 0
              }}
            >
              <h3 
                className="text-sm font-medium mb-3 cursor-pointer" 
                style={{ 
                  color: 'var(--app-text)',
                  transition: 'all 0.3s ease, text-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.textShadow = '0 0 6px rgba(255, 255, 255, 0.7), 0 0 12px rgba(255, 255, 255, 0.4)'
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.textShadow = 'none'
                }}
              >
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
                  style={{ 
                    transition: 'all 0.3s ease, text-shadow 0.3s ease'
                  }}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ 
                    textShadow: currentView !== 'grid' ? '0 0 6px rgba(255, 255, 255, 0.6), 0 0 12px rgba(255, 255, 255, 0.4)' : 'none'
                  }}
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
                  style={{ 
                    transition: 'all 0.3s ease, text-shadow 0.3s ease'
                  }}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ 
                    textShadow: currentView !== 'list' ? '0 0 6px rgba(255, 255, 255, 0.6), 0 0 12px rgba(255, 255, 255, 0.4)' : 'none'
                  }}
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
            <h3 
              className="text-sm font-medium mb-3 cursor-pointer" 
              style={{ 
                color: 'var(--app-text)',
                transition: 'all 0.3s ease, text-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.textShadow = '0 0 6px rgba(255, 255, 255, 0.7), 0 0 12px rgba(255, 255, 255, 0.4)'
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.textShadow = 'none'
              }}
            >
              Categorías
            </h3>
            <div className="space-y-2">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  className="w-full text-left px-3 py-2 rounded-xl transition-all hover:bg-gray-100 hover:text-shadow-elegant"
                  style={{ 
                    color: 'var(--app-text)',
                    transition: 'all 0.3s ease, text-shadow 0.3s ease'
                  }}
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ 
                    x: 4,
                    textShadow: '0 0 8px rgba(255, 255, 255, 0.6), 0 0 16px rgba(255, 255, 255, 0.4)'
                  }}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ 
                    opacity: isMenuOpen ? 1 : 0,
                    x: isMenuOpen ? 0 : -15
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 700,
                    damping: 35,
                    delay: isMenuOpen ? 0.12 + (index * 0.02) : 0
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
            <h3 
              className="text-sm font-medium mb-3 cursor-pointer" 
              style={{ 
                color: 'var(--app-text)',
                transition: 'all 0.3s ease, text-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.textShadow = '0 0 6px rgba(255, 255, 255, 0.7), 0 0 12px rgba(255, 255, 255, 0.4)'
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.textShadow = 'none'
              }}
            >
              Filtros
            </h3>
            <motion.button
              className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-gray-100 w-full"
              style={{ 
                transition: 'all 0.3s ease, text-shadow 0.3s ease'
              }}
              whileTap={{ scale: 0.98 }}
              whileHover={{ 
                textShadow: '0 0 6px rgba(255, 255, 255, 0.6), 0 0 12px rgba(255, 255, 255, 0.4)'
              }}
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
            <h3 
              className="text-sm font-medium mb-3 cursor-pointer" 
              style={{ 
                color: 'var(--app-text)',
                transition: 'all 0.3s ease, text-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.textShadow = '0 0 6px rgba(255, 255, 255, 0.7), 0 0 12px rgba(255, 255, 255, 0.4)'
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.textShadow = 'none'
              }}
            >
              Mi Cuenta
            </h3>
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 rounded-xl transition-all hover:bg-gray-100"
                  style={{ 
                    color: 'var(--app-text)',
                    transition: 'all 0.3s ease, text-shadow 0.3s ease'
                  }}
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ 
                    x: 4,
                    textShadow: '0 0 8px rgba(255, 255, 255, 0.6), 0 0 16px rgba(255, 255, 255, 0.4)'
                  }}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ 
                    opacity: isMenuOpen ? 1 : 0,
                    x: isMenuOpen ? 0 : -15
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 700,
                    damping: 35,
                    delay: isMenuOpen ? 0.18 + (index * 0.02) : 0
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
