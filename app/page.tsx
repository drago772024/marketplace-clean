'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingCart, Search } from 'lucide-react'
import SidebarMenu from '@/components/layout/SidebarMenu'
import MobileBottomNav from '@/components/layout/MobileBottomNav'
import SearchBar from '@/components/ui/SearchBar'
import ViewToggle from '@/components/ui/ViewToggle'
import ProductCard from '@/components/products/ProductCard'
import ProductCardList from '@/components/products/ProductCardList'
import { useFavoritesStore } from '@/lib/stores/favorites'
import { useMenuStore } from '@/lib/stores/menu'
import { useScrollDirection } from '@/hooks/useScrollDirection'

// Datos de productos de ejemplo (más productos para probar el grid)
const allProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    price: 1199,
    originalPrice: 1399,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 124,
    category: 'Tecnología'
  },
  {
    id: 2,
    name: 'MacBook Air M3',
    price: 1299,
    originalPrice: 1499,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 89,
    category: 'Computadoras'
  },
  {
    id: 3,
    name: 'AirPods Pro 2',
    price: 249,
    originalPrice: 299,
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 256,
    category: 'Audio'
  },
  {
    id: 4,
    name: 'Apple Watch Ultra 2',
    price: 799,
    originalPrice: 899,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 178,
    category: 'Wearables'
  },
  {
    id: 5,
    name: 'iPad Pro 12.9" M2',
    price: 1099,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 92,
    category: 'Tablets'
  },
  {
    id: 6,
    name: 'Sony WH-1000XM5',
    price: 349,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 203,
    category: 'Audio'
  },
  {
    id: 7,
    name: 'Samsung Galaxy S24 Ultra',
    price: 1199,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 145,
    category: 'Smartphones'
  },
  {
    id: 8,
    name: 'Nintendo Switch OLED',
    price: 349,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 312,
    category: 'Gaming'
  },
  {
    id: 9,
    name: 'Dell XPS 13',
    price: 999,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 87,
    category: 'Computadoras'
  },
  {
    id: 10,
    name: 'Bose QuietComfort 45',
    price: 279,
    originalPrice: 329,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 198,
    category: 'Audio'
  },
  {
    id: 11,
    name: 'Google Pixel 8 Pro',
    price: 899,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 156,
    category: 'Smartphones'
  },
  {
    id: 12,
    name: 'Microsoft Surface Pro 9',
    price: 1099,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 73,
    category: 'Tablets'
  },
  {
    id: 13,
    name: 'PlayStation 5',
    price: 499,
    originalPrice: 599,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 445,
    category: 'Gaming'
  },
  {
    id: 14,
    name: 'Fitbit Versa 4',
    price: 199,
    originalPrice: 249,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop',
    rating: 4.3,
    reviews: 234,
    category: 'Wearables'
  }
]

export default function HomePage() {
  const [currentView, setCurrentView] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [mobileTab, setMobileTab] = useState('home')
  const [isHeaderHovered, setIsHeaderHovered] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const { getFavoritesCount } = useFavoritesStore()
  const { isMenuOpen } = useMenuStore()
  const { scrollDirection, isAtTop, isMobile } = useScrollDirection()

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setFilteredProducts(allProducts)
    } else {
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredProducts(filtered)
    }
  }, [])

  const handleViewChange = (view: 'grid' | 'list') => {
    setCurrentView(view)
  }

  return (
    <div className="app-layout" style={{ backgroundColor: 'var(--app-bg)' }}>
      {/* Sidebar Menu */}
      <SidebarMenu
        onViewChange={handleViewChange}
        currentView={currentView}
      />

      {/* Main Content */}
      <motion.div 
        className="main-content"
        animate={{
          marginLeft: isMenuOpen ? 280 : 8,
        }}
        transition={{
          type: "tween",
          duration: 0.05,
          ease: "easeOut"
        }}
        style={{
          minHeight: '100vh',
          width: 'auto'
        }}
      >
        {/* Header con Auto-Hide */}
        <AnimatePresence>
          <motion.header
            className="header-auto-hide fixed top-0 z-50 backdrop-blur-lg border-b"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderColor: 'var(--app-border)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              left: isMenuOpen ? 280 : 8,
              right: 0
            }}
            initial={{ y: -100 }}
            animate={{ 
              y: (!isMobile || isAtTop || scrollDirection === 'up' || isHeaderHovered) ? 0 : -100,
              left: isMenuOpen ? 280 : 8
            }}
            transition={{ 
              type: "tween", 
              duration: 0.05,
              ease: "easeOut"
            }}
            onMouseEnter={() => setIsHeaderHovered(true)}
            onMouseLeave={() => setIsHeaderHovered(false)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-20 md:h-20 sm:h-16 h-14">
                {/* Logo */}
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0
                  }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <motion.h1 
                    className="text-2xl md:text-2xl sm:text-xl text-lg font-bold cursor-pointer" 
                    style={{ color: 'var(--app-primary)' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    VendeMass
                  </motion.h1>
                </motion.div>
                
                {/* Search Bar */}
                <motion.div
                  className="flex-1 max-w-2xl mx-8 hidden sm:block"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <SearchBar onSearch={handleSearch} />
                </motion.div>
                
                {/* Actions */}
                <motion.div
                  className="flex items-center space-x-1 sm:space-x-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.a 
                    href="/dev-dashboard" 
                    className="header-button hidden md:flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all"
                    style={{ backgroundColor: 'var(--app-surface)', color: 'var(--app-text)' }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 8px 25px rgba(0, 122, 255, 0.15)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🚀 Dev Dashboard
                  </motion.a>
                  
                  {/* Botón de Búsqueda Móvil */}
                  <motion.button 
                    className="header-icon-button relative w-12 h-12 sm:hidden rounded-full flex items-center justify-center transition-all"
                    style={{ backgroundColor: 'var(--app-surface)', color: 'var(--app-text)' }}
                    onClick={() => setShowMobileSearch(!showMobileSearch)}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: '0 8px 25px rgba(0, 122, 255, 0.15)'
                    }}
                    whileTap={{ 
                      scale: 0.9,
                      transition: { duration: 0.1 }
                    }}
                  >
                    <Search className="w-5 h-5" strokeWidth={1.5} />
                  </motion.button>
                  
                  {/* Botón de Favoritos */}
                  <motion.button 
                    className="header-icon-button relative w-12 h-12 sm:w-12 sm:h-12 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                    style={{ backgroundColor: 'var(--app-surface)', color: 'var(--app-text)' }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: '0 8px 25px rgba(255, 59, 48, 0.15)'
                    }}
                    whileTap={{ 
                      scale: 0.9,
                      transition: { duration: 0.1 }
                    }}
                  >
                    <motion.div
                      className="relative flex items-center justify-center"
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Heart className="w-6 h-6 sm:w-6 sm:h-6 w-5 h-5" strokeWidth={1.5} />
                      {getFavoritesCount() > 0 && (
                        <motion.span
                          className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-xs font-bold pointer-events-none"
                          style={{ 
                            fontSize: '10px',
                            textShadow: '0 0 3px rgba(0,0,0,0.8)'
                          }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {getFavoritesCount()}
                        </motion.span>
                      )}
                    </motion.div>
                  </motion.button>
                  
                  {/* Botón de Carrito */}
                  <motion.button 
                    className="header-icon-button relative w-12 h-12 sm:w-12 sm:h-12 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                    style={{ backgroundColor: 'var(--app-surface)', color: 'var(--app-text)' }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: '0 8px 25px rgba(0, 122, 255, 0.15)'
                    }}
                    whileTap={{ 
                      scale: 0.9,
                      transition: { duration: 0.1 }
                    }}
                  >
                    <motion.div
                      className="relative flex items-center justify-center"
                      whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      <ShoppingCart className="w-6 h-6 sm:w-6 sm:h-6 w-5 h-5" strokeWidth={1.5} />
                      <motion.span
                        className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-xs font-bold pointer-events-none"
                        style={{ 
                          fontSize: '10px',
                          textShadow: '0 0 3px rgba(0,0,0,0.8)'
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        3
                      </motion.span>
                    </motion.div>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.header>
        </AnimatePresence>

        {/* Spacer para compensar el header fixed */}
        <div className="h-20 md:h-20 sm:h-16 h-14"></div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {showMobileSearch && (
            <motion.div
              className="fixed top-14 sm:top-16 md:top-20 left-0 right-0 z-40 bg-white border-b border-gray-200 p-4 sm:hidden"
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SearchBar onSearch={handleSearch} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <motion.section
          className="py-16 text-center"
          style={{ 
            background: 'linear-gradient(135deg, var(--app-primary), var(--app-secondary))',
            color: 'white'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
            >
              Los mejores productos
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl mb-8 opacity-90"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
            >
              Encuentra todo lo que necesitas en un solo lugar
            </motion.p>
            <motion.button
              className="app-button px-8 py-4 text-lg font-semibold"
              style={{ backgroundColor: 'white', color: 'var(--app-primary)' }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explorar productos
            </motion.button>
          </div>
        </motion.section>

        {/* Products Section */}
        <section className="py-16 pb-24 md:pb-16">
          {/* Contenedor para título y controles - ocupa todo el viewport */}
          <div className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <motion.div
              className="flex items-center justify-between mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="flex items-center space-x-4">
                <h3 className="text-2xl font-bold" style={{ color: 'var(--app-text)' }}>
                  {searchQuery ? `Resultados para "${searchQuery}"` : 'Productos destacados'}
                </h3>
                <div className="text-sm" style={{ color: 'var(--app-text-secondary)' }}>
                  {filteredProducts.length} productos
                </div>
              </div>
              
              {/* View Toggle */}
              <ViewToggle 
                currentView={currentView} 
                onViewChange={handleViewChange}
              />
            </motion.div>
          </div>
          
          {/* Contenedor para productos - se limita en pantallas grandes */}
          <div className="products-container">
            {/* Products Grid */}
            {currentView === 'grid' ? (
              <motion.div
                className="products-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 1.1 + (index * 0.05),
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                  >
                    <ProductCard
                      product={product}
                      onClick={() => {
                        console.log('Navigate to product:', product.id)
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="products-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 1.1 + (index * 0.03),
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                  >
                    <ProductCardList
                      product={product}
                      onClick={() => {
                        console.log('Navigate to product:', product.id)
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--app-text)' }}>
                  No se encontraron productos
                </h3>
                <p style={{ color: 'var(--app-text-secondary)' }}>
                  Intenta con otros términos de búsqueda
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 mt-16" style={{ backgroundColor: 'var(--app-surface)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--app-text)' }}>
                  VendeMass
                </h3>
                <p style={{ color: 'var(--app-text-secondary)' }}>
                  Tu marketplace de confianza con los mejores productos y precios.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4" style={{ color: 'var(--app-text)' }}>
                  Categorías
                </h4>
                <ul className="space-y-2" style={{ color: 'var(--app-text-secondary)' }}>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">Tecnología</a></li>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">Computadoras</a></li>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">Audio</a></li>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">Gaming</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4" style={{ color: 'var(--app-text)' }}>
                  Ayuda
                </h4>
                <ul className="space-y-2" style={{ color: 'var(--app-text-secondary)' }}>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">Contacto</a></li>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">Envíos</a></li>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">Devoluciones</a></li>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">FAQ</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4" style={{ color: 'var(--app-text)' }}>
                  Síguenos
                </h4>
                <ul className="space-y-2" style={{ color: 'var(--app-text-secondary)' }}>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">Facebook</a></li>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">Instagram</a></li>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">YouTube</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t mt-8 pt-8 text-center" style={{ borderColor: 'var(--app-border)' }}>
              <p style={{ color: 'var(--app-text-secondary)' }}>
                &copy; 2025 VendeMass. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      </motion.div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeTab={mobileTab}
        onTabChange={setMobileTab}
      />
    </div>
  )
}
