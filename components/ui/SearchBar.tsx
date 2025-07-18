'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

export default function SearchBar({ 
  onSearch, 
  placeholder = "Buscar productos...", 
  className = "" 
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Debounced search
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      onSearch(query)
    }, 150) // Super fast search

    return () => clearTimeout(delayedSearch)
  }, [query, onSearch])

  const handleClear = () => {
    setQuery('')
    inputRef.current?.focus()
  }

  return (
    <motion.div
      className={`search-bar-app ${className}`}
      animate={{
        scale: isFocused ? 1.02 : 1,
        boxShadow: isFocused 
          ? '0 0 0 3px rgba(0, 122, 255, 0.1)' 
          : '0 2px 10px rgba(0,0,0,0.1)'
      }}
      transition={{ duration: 0.2 }}
    >
      <Search 
        className="w-5 h-5 mr-3 flex-shrink-0" 
        style={{ color: 'var(--app-text-secondary)' }}
      />
      
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="search-input"
      />
      
      <AnimatePresence>
        {query && (
          <motion.button
            onClick={handleClear}
            className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4" style={{ color: 'var(--app-text-secondary)' }} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
