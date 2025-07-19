# MEMORIA DEL PROYECTO - VENDEMASS

## 🚀 Estado Actual
- **Última actualización**: 2025-07-19
- **Branch activo**: main
- **URL producción**: https://marketplace-clean-rho.vercel.app
- **URLs alternativas**: 
  - https://marketplace-git-385d1f-massenterprisesoperations-8028s-projects.vercel.app
  - https://vendemass.com (dominio configurado)

## 📊 Stack Tecnológico
- Next.js 15 + React 19
- TypeScript
- Tailwind CSS
- Zustand (state management)
- Framer Motion (animations)
- Vercel (hosting con auto-deploy)

## ✅ Completado
- Marketplace UI básico
- Sistema de favoritos
- Vista grid/lista de productos
- Diseño responsive
- Deploy automático en Vercel
- Dashboard de desarrollo en `/dev-dashboard`

## 📋 Tareas Pendientes
- [ ] Integración con Neon Database
- [ ] Sistema de autenticación Auth0
- [ ] CRUD real de productos
- [ ] Sistema de puntos anti-MLM
- [ ] Arquitectura multitenant
- [ ] Integración AWS S3 para imágenes

## 🛠️ Comandos Frecuentes
```bash
# Desarrollo
npm run dev          # Servidor local en http://localhost:3000

# Verificación
npm run build       # Verificar que compila sin errores
npm run lint        # Verificar código (tiene warnings, no críticos)

# Deploy
git add .
git commit -m "feat: descripción"
git push origin main
# Vercel despliega automáticamente en ~2 minutos
```

## 🔄 Flujo de Trabajo Optimizado
1. **NO trabajar en local** - Todo directo en GitHub
2. Hacer cambios pequeños y frecuentes
3. Commit + Push inmediato después de cada cambio
4. Verificar en Vercel (2-3 minutos para deploy)
5. Ver cambios en vivo en producción

## 📝 Notas Importantes
- El proyecto usa App Router de Next.js 15
- Los productos actuales son datos de ejemplo (mock)
- El diseño es mobile-first
- Hay un warning de ESLint por configuración externa (no afecta funcionamiento)

## 🎯 Comando Rápido para Reiniciar Sesión
```bash
# Copiar y pegar al iniciar nueva sesión:
echo "Proyecto: VendeMass | Branch: main | URL: https://marketplace-clean-rho.vercel.app | Ver CLAUDE.md para contexto"
```

## 📅 Historial de Cambios Importantes
- 2025-07-19: Implementación de memoria persistente con CLAUDE.md
- Último commit: ba18d70 - Major Update: Complete Security Audit & UI Enhancements