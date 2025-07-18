'use client';

import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  category: string;
}

export default function DevDashboard() {
  const [tasks] = useState<Task[]>([
    // CONFIGURACIÓN INICIAL
    {
      id: 'task1',
      title: 'Configurar Neon Database',
      description: 'Crear cuenta, configurar schema multitenant, establecer conexión',
      status: 'todo',
      priority: 'high',
      category: 'Database'
    },
    {
      id: 'task2',
      title: 'Implementar NextAuth',
      description: 'Configurar autenticación con Google/GitHub, sesiones',
      status: 'todo',
      priority: 'high',
      category: 'Auth'
    },
    {
      id: 'task3',
      title: 'Sistema de Upload de Imágenes',
      description: 'Configurar Cloudinary o similar para subir imágenes de productos',
      status: 'todo',
      priority: 'medium',
      category: 'Media'
    },
    
    // FUNCIONALIDADES CORE
    {
      id: 'task4',
      title: 'CRUD de Productos',
      description: 'Crear, editar, eliminar productos con imágenes',
      status: 'todo',
      priority: 'high',
      category: 'Products'
    },
    {
      id: 'task5',
      title: 'Sistema de Búsqueda',
      description: 'Filtros por categoría, precio, búsqueda por texto',
      status: 'todo',
      priority: 'medium',
      category: 'Search'
    },
    {
      id: 'task6',
      title: 'Dashboard de Vendedor',
      description: 'Panel para que cada usuario gestione sus productos',
      status: 'todo',
      priority: 'high',
      category: 'Dashboard'
    },
    {
      id: 'task7',
      title: 'Sistema de Usuarios',
      description: 'Perfiles, roles (vendedor/comprador), configuraciones',
      status: 'todo',
      priority: 'medium',
      category: 'Users'
    },
    
    // SISTEMA DE PUNTOS
    {
      id: 'task8',
      title: 'Sistema de Puntos Básico',
      description: 'Acumular puntos por ventas, mostrar balance',
      status: 'todo',
      priority: 'high',
      category: 'Points'
    },
    {
      id: 'task9',
      title: 'Compensaciones por Referidos',
      description: 'Sistema de recomendaciones con compensaciones transparentes',
      status: 'todo',
      priority: 'medium',
      category: 'Referrals'
    },
    {
      id: 'task10',
      title: 'Historial de Transacciones',
      description: 'Log completo de puntos ganados/gastados con auditoría',
      status: 'todo',
      priority: 'medium',
      category: 'Audit'
    },
    
    // OPTIMIZACIÓN
    {
      id: 'task11',
      title: 'Responsive Design',
      description: 'Optimizar para móviles y tablets',
      status: 'todo',
      priority: 'medium',
      category: 'UI/UX'
    },
    {
      id: 'task12',
      title: 'SEO y Performance',
      description: 'Optimizar velocidad, meta tags, sitemap',
      status: 'todo',
      priority: 'low',
      category: 'SEO'
    }
  ]);

  // COSTOS REALES MENSUALES
  const realMonthlyCosts = {
    chatgpt: 20,
    claude: 120,
    vercel: 0, // Free tier, Pro: $20
    githubCodespaces: 0, // Free tier, Pro: $4
    neon: 0, // Free tier, Pro: $19
    cloudinary: 0, // Free tier, Pro: $89
    total: 140 // ChatGPT + Claude
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Database': 'bg-purple-100 text-purple-800',
      'Auth': 'bg-blue-100 text-blue-800',
      'Media': 'bg-pink-100 text-pink-800',
      'Products': 'bg-green-100 text-green-800',
      'Search': 'bg-orange-100 text-orange-800',
      'Dashboard': 'bg-indigo-100 text-indigo-800',
      'Users': 'bg-cyan-100 text-cyan-800',
      'Points': 'bg-emerald-100 text-emerald-800',
      'Referrals': 'bg-teal-100 text-teal-800',
      'Audit': 'bg-gray-100 text-gray-800',
      'UI/UX': 'bg-rose-100 text-rose-800',
      'SEO': 'bg-amber-100 text-amber-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📋 Kanban Board - VendeMass
          </h1>
          <p className="text-gray-600">
            Marketplace Multitenant con Sistema de Recompensas Anti-MLM
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">📊</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Progreso General</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((doneTasks.length / tasks.length) * 100)}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✅</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Tareas Completadas</p>
                <p className="text-2xl font-bold text-gray-900">
                  {doneTasks.length}/{tasks.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">🔄</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">En Progreso</p>
                <p className="text-2xl font-bold text-gray-900">
                  {inProgressTasks.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">💰</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Costo Mensual</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${realMonthlyCosts.total}/mes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Real Monthly Costs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">💰 Costos Reales Mensuales</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">IA y APIs</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">ChatGPT Plus</span>
                    <span className="text-sm font-medium">${realMonthlyCosts.chatgpt}/mes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Claude Pro</span>
                    <span className="text-sm font-medium">${realMonthlyCosts.claude}/mes</span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Servicios Gratis (por ahora)</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Vercel</span>
                    <span className="text-sm text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">GitHub Codespaces</span>
                    <span className="text-sm text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Neon DB</span>
                    <span className="text-sm text-green-600">Free</span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Posibles Upgrades</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Vercel Pro</span>
                    <span className="text-sm text-gray-500">$20/mes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Neon Pro</span>
                    <span className="text-sm text-gray-500">$19/mes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Cloudinary Pro</span>
                    <span className="text-sm text-gray-500">$89/mes</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-red-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total Actual:</span>
                <span className="text-2xl font-bold text-red-600">${realMonthlyCosts.total}/mes</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Solo ChatGPT + Claude (gastos reales)</p>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* TODO Column */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">📝 Por Hacer</h3>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm font-medium">
                  {todoTasks.length}
                </span>
              </div>
            </div>
            <div className="p-4 space-y-4 min-h-96">
              {todoTasks.map((task) => (
                <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(task.priority)}`}>
                      {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs mb-3">{task.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(task.category)}`}>
                      {task.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IN PROGRESS Column */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 bg-blue-50 rounded-t-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">🔄 En Progreso</h3>
                <span className="bg-blue-200 text-blue-700 px-2 py-1 rounded-full text-sm font-medium">
                  {inProgressTasks.length}
                </span>
              </div>
            </div>
            <div className="p-4 space-y-4 min-h-96">
              {inProgressTasks.map((task) => (
                <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-blue-50">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(task.priority)}`}>
                      {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs mb-3">{task.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(task.category)}`}>
                      {task.category}
                    </span>
                  </div>
                </div>
              ))}
              {inProgressTasks.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <p className="text-sm">No hay tareas en progreso</p>
                </div>
              )}
            </div>
          </div>

          {/* DONE Column */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 bg-green-50 rounded-t-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">✅ Completadas</h3>
                <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full text-sm font-medium">
                  {doneTasks.length}
                </span>
              </div>
            </div>
            <div className="p-4 space-y-4 min-h-96">
              {doneTasks.map((task) => (
                <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-green-50">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(task.priority)}`}>
                      {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs mb-3">{task.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(task.category)}`}>
                      {task.category}
                    </span>
                  </div>
                </div>
              ))}
              {doneTasks.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <p className="text-sm">No hay tareas completadas aún</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Communication Guide */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">💬 Guía de Comunicación con Cline</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">🚀 Comandos de Desarrollo</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-900 mb-1">Iniciar servidor local:</p>
                    <p className="text-gray-600">"Inicia el servidor de desarrollo local"</p>
                    <code className="text-xs bg-gray-200 px-2 py-1 rounded">npm run dev</code>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-900 mb-1">Deploy a Vercel:</p>
                    <p className="text-gray-600">"Haz commit y push a Vercel con mensaje: [tu mensaje]"</p>
                    <code className="text-xs bg-gray-200 px-2 py-1 rounded">git add . && git commit && git push</code>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-900 mb-1">Mover tarea en Kanban:</p>
                    <p className="text-gray-600">"Mueve [nombre tarea] a [todo/in-progress/done]"</p>
                    <code className="text-xs bg-gray-200 px-2 py-1 rounded">Actualiza estado automáticamente</code>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">🧠 Gestión de Tareas</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-900 mb-1">Empezar nueva tarea:</p>
                    <p className="text-gray-600">"Empiezo a trabajar en [nombre de tarea]"</p>
                    <p className="text-xs text-blue-600">Se mueve automáticamente a "En Progreso"</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-900 mb-1">Completar tarea:</p>
                    <p className="text-gray-600">"Completé la tarea [nombre de tarea]"</p>
                    <p className="text-xs text-blue-600">Se mueve automáticamente a "Completadas"</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-900 mb-1">Agregar nueva tarea:</p>
                    <p className="text-gray-600">"Agrega nueva tarea: [descripción]"</p>
                    <p className="text-xs text-blue-600">Se añade al Kanban automáticamente</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security & MCP Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">🛡️ Seguridad y MCP Enterprise</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">🔒 Security Scanner MCP</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="font-medium text-red-900 mb-1">Escaneo Completo:</p>
                    <p className="text-red-700">"Escanea la seguridad del proyecto marketplace-clean"</p>
                    <code className="text-xs bg-red-200 px-2 py-1 rounded">scan_project_security</code>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="font-medium text-red-900 mb-1">Archivo Específico:</p>
                    <p className="text-red-700">"Analiza la seguridad del archivo [nombre]"</p>
                    <code className="text-xs bg-red-200 px-2 py-1 rounded">check_file_security</code>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="font-medium text-red-900 mb-1">Auditar Dependencias:</p>
                    <p className="text-red-700">"Audita las dependencias de package.json"</p>
                    <code className="text-xs bg-red-200 px-2 py-1 rounded">audit_dependencies</code>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="font-medium text-red-900 mb-1">Reporte Completo:</p>
                    <p className="text-red-700">"Genera un reporte de seguridad completo"</p>
                    <code className="text-xs bg-red-200 px-2 py-1 rounded">generate_security_report</code>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">🗄️ Database Manager MCP</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-medium text-blue-900 mb-1">Conectar DB:</p>
                    <p className="text-blue-700">"Conecta a la base de datos Neon con [connection_string]"</p>
                    <code className="text-xs bg-blue-200 px-2 py-1 rounded">connect_database</code>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-medium text-blue-900 mb-1">Schema Multitenant:</p>
                    <p className="text-blue-700">"Crea el schema multitenant vendemass con RLS y audit"</p>
                    <code className="text-xs bg-blue-200 px-2 py-1 rounded">create_multitenant_schema</code>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-medium text-blue-900 mb-1">Ejecutar Query:</p>
                    <p className="text-blue-700">"Ejecuta query: SELECT * FROM users LIMIT 10"</p>
                    <code className="text-xs bg-blue-200 px-2 py-1 rounded">execute_query</code>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-medium text-blue-900 mb-1">Análisis Performance:</p>
                    <p className="text-blue-700">"Analiza el performance de la base de datos"</p>
                    <code className="text-xs bg-blue-200 px-2 py-1 rounded">analyze_performance</code>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-900 mb-3">🎯 Casos de Uso Frecuentes</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">🔒 Antes de Deploy</h4>
                  <ol className="text-xs text-yellow-700 space-y-1">
                    <li>1. Escanear seguridad del proyecto</li>
                    <li>2. Auditar dependencias</li>
                    <li>3. Generar reporte completo</li>
                    <li>4. Corregir issues críticos</li>
                  </ol>
                </div>
                
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">🗄️ Setup Nueva DB</h4>
                  <ol className="text-xs text-green-700 space-y-1">
                    <li>1. Conectar a Neon</li>
                    <li>2. Configurar seguridad enterprise</li>
                    <li>3. Crear schema multitenant</li>
                    <li>4. Hacer backup inicial</li>
                  </ol>
                </div>
                
                <div className="bg-purple-50 p-3 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">📊 Monitoreo Semanal</h4>
                  <ol className="text-xs text-purple-700 space-y-1">
                    <li>• Lunes: Escaneo completo</li>
                    <li>• Miércoles: Auditar dependencias</li>
                    <li>• Viernes: Performance y backup</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">📚 Guía Completa:</span>
                <span className="text-sm text-gray-600">SEGURIDAD_Y_MCP_GUIA_COMPLETA.md</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Consulta la guía completa para comandos detallados, troubleshooting y configuración avanzada
              </p>
            </div>
          </div>
        </div>

        {/* Quick Commands */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">⚡ Comandos Rápidos</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">🏠 Desarrollo Local</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• "Inicia el servidor local"</li>
                  <li>• "Abre localhost:3000"</li>
                  <li>• "Revisa errores de build"</li>
                  <li>• "Instala dependencias"</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">🚀 Deploy & Git</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• "Haz commit y push a Vercel"</li>
                  <li>• "Revisa status de git"</li>
                  <li>• "Crea nueva rama"</li>
                  <li>• "Merge a main"</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-900 mb-2">📋 Gestión Kanban</h3>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• "Empiezo [nombre tarea]"</li>
                  <li>• "Completé [nombre tarea]"</li>
                  <li>• "Agrega tarea: [descripción]"</li>
                  <li>• "¿Cuál es la próxima tarea?"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
