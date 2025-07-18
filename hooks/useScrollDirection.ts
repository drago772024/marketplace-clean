'use client'

import { useState, useEffect } from 'react'

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [isAtTop, setIsAtTop] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detectar si es móvil
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset
      const direction = scrollY > lastScrollY ? 'down' : 'up'
      
      // Sensibilidad diferente para móvil vs desktop
      const threshold = isMobile ? 3 : 10 // Mucho más sensible en móvil
      
      if (Math.abs(scrollY - lastScrollY) > threshold) {
        setScrollDirection(direction)
        setLastScrollY(scrollY)
      }
      
      // Verificar si estamos en la parte superior
      setIsAtTop(scrollY < 10)
    }

    // Para móvil: respuesta casi inmediata, para desktop: throttled
    let handleScroll: () => void
    
    if (isMobile) {
      handleScroll = updateScrollDirection // Inmediato en móvil
    } else {
      // Throttled para desktop
      let ticking = false
      handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            updateScrollDirection()
            ticking = false
          })
          ticking = true
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [lastScrollY, isMobile])

  return { scrollDirection, isAtTop, isMobile }
}
