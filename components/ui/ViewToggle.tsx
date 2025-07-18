'use client'

import { Grid, List } from 'lucide-react'
import { motion } from 'framer-motion'

interface ViewToggleProps {
  currentView: 'grid' | 'list'
  onViewChange: (view: 'grid' | 'list') => void
  className?: string
}

export default function ViewToggle({ currentView, onViewChange, className = '' }: ViewToggleProps) {
  return (
    <div className={`view-toggle-container ${className}`}>
      <span className="text-sm font-medium" style={{ color: 'var(--app-text-secondary)' }}>
        Vista:
      </span>
      
      <div className="flex rounded-xl border" style={{ backgroundColor: 'var(--app-surface)', borderColor: 'var(--app-border)' }}>
        <motion.button
          className={`view-toggle-button ${currentView === 'grid' ? 'active' : ''}`}
          onClick={() => onViewChange('grid')}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: currentView === 'grid' ? 1 : 1.05 }}
          style={{
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderRight: 'none'
          }}
        >
          <Grid className="w-5 h-5" />
        </motion.button>
        
        <motion.button
          className={`view-toggle-button ${currentView === 'list' ? 'active' : ''}`}
          onClick={() => onViewChange('list')}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: currentView === 'list' ? 1 : 1.05 }}
          style={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
          }}
        >
          <List className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  )
}