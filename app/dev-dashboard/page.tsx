'use client';

import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  estimatedCost: number;
  actualCost?: number;
  estimatedHours: number;
  actualHours?: number;
  phase: string;
}

interface Phase {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  startDate?: string;
  endDate?: string;
  budget: number;
  spent: number;
}

export default function DevDashboard() {
  const [phases] = useState<Phase[]>([
    {
      id: 'phase1',
      title: 'FASE 1: FUNDACIÓN SEGURA',
      description: 'Configuración de base de datos, autenticación y seguridad básica',
      status: 'pending',
      budget: 2000,
      spent: 0
    },
    {
      id: 'phase2',
      title: 'FASE 2: CORE MARKETPLACE',
      description: 'Sistema de productos, imágenes y funcionalidad básica',
      status: 'pending',
      budget: 3000,
      spent: 0
    },
    {
      id: 'phase3',
      title: 'FASE 3: SISTEMA DE RECOMPENSAS',
      description: 'Puntos, compensaciones y auditoría completa',
      status: 'pending',
      budget: 4000,
      spent: 0
    }
  ]);

  const [tasks] = useState<Task[]>([
    // FASE 1
    {
      id: 'task1',
      title: 'Configurar Neon Database',
      description: 'Schema multitenant con row-level security y audit logs',
      status: 'pending',
      priority: 'high',
      estimatedCost: 300,
      estimatedHours: 8,
      phase: 'phase1'
    },
    {
      id: 'task2',
      title: 'Implementar NextAuth + Auth0',
      description: '2FA obligatorio y rate limiting en APIs',
      status: 'pending',
      priority: 'high',
      estimatedCost: 500,
      estimatedHours: 12,
      phase: 'phase1'
    },
    {
      id: 'task3',
      title: 'Sistema de Imágenes AWS S3',
      description: 'Upload directo, compresión automática, múltiples tamaños',
      status: 'pending',
      priority: 'medium',
      estimatedCost: 400,
      estimatedHours: 10,
      phase: 'phase1'
    },
    {
      id: 'task4',
      title: 'Middleware de Seguridad',
      description: 'Validación, rate limiting, audit logs automáticos',
      status: 'pending',
      priority: 'high',
      estimatedCost: 600,
      estimatedHours: 15,
      phase: 'phase1'
    },
    // FASE 2
    {
      id: 'task5',
      title: 'CRUD de Productos Completo',
      description: 'Crear, editar, eliminar productos con validaciones',
      status: 'pending',
      priority: 'high',
      estimatedCost: 800,
      estimatedHours: 20,
      phase: 'phase2'
    },
    {
      id: 'task6',
      title: 'Sistema de Búsqueda Avanzada',
      description: 'Filtros, categorías, búsqueda por texto',
      status: 'pending',
      priority: 'medium',
      estimatedCost: 600,
      estimatedHours: 15,
      phase: 'phase2'
    },
    {
      id: 'task7',
      title: 'Arquitectura Multitenant',
      description: 'Cada usuario su tienda, dashboard personalizable',
      status: 'pending',
      priority: 'high',
      estimatedCost: 1000,
      estimatedHours: 25,
      phase: 'phase2'
    },
    {
      id: 'task8',
      title: 'Dashboard de Usuario',
      description: 'Panel de control para cada vendedor',
      status: 'pending',
      priority: 'medium',
      estimatedCost: 700,
      estimatedHours: 18,
      phase: 'phase2'
    },
    // FASE 3
    {
      id: 'task9',
      title: 'Sistema de Puntos Ultra-Seguro',
      description: 'Blockchain-style ledger, valor $0.10/punto',
      status: 'pending',
      priority: 'high',
      estimatedCost: 1200,
      estimatedHours: 30,
      phase: 'phase3'
    },
    {
      id: 'task10',
      title: 'Compensaciones Anti-MLM',
      description: 'Sistema de recomendaciones transparente',
      status: 'pending',
      priority: 'high',
      estimatedCost: 1000,
      estimatedHours: 25,
      phase: 'phase3'
    },
    {
      id: 'task11',
      title: 'Auditoría Extrema',
      description: 'Time travel, logs inmutables, recreación de estados',
      status: 'pending',
      priority: 'high',
      estimatedCost: 1500,
      estimatedHours: 35,
      phase: 'phase3'
    },
    {
      id: 'task12',
      title: 'Sistema de Vencimiento de Puntos',
      description: 'Vencimiento automático cada 2 meses',
      status: 'pending',
      priority: 'medium',
      estimatedCost: 400,
      estimatedHours: 10,
      phase: 'phase3'
    }
  ]);

  const monthlyBudget = {
    recommended: 108,
    auth0: 23,
    neon: 19,
    total: 131
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const totalBudget = phases.reduce((sum, phase) => sum + phase.budget, 0);
  const totalSpent = phases.reduce((sum, phase) => sum + phase.spent, 0);
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🚀 Dashboard de Desarrollo - VendeMass
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
                  {Math.round((completedTasks / totalTasks) * 100)}%
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
                  {completedTasks}/{totalTasks}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">💰</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Presupuesto Usado</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalSpent}/${totalBudget}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">📅</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Costo Mensual</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${monthlyBudget.total}/mes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Budget Breakdown */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">💳 Presupuesto Mensual</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Plan Recomendado</h3>
                <p className="text-2xl font-bold text-blue-600">${monthlyBudget.recommended}/mes</p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• GitHub Codespaces</li>
                  <li>• Sentry + Session Replay</li>
                  <li>• LaunchDarkly</li>
                  <li>• WhatsApp Business API</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Auth0</h3>
                <p className="text-2xl font-bold text-green-600">${monthlyBudget.auth0}/mes</p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Autenticación enterprise</li>
                  <li>• 2FA integrado</li>
                  <li>• Social logins</li>
                  <li>• Rate limiting</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Neon Database</h3>
                <p className="text-2xl font-bold text-purple-600">${monthlyBudget.neon}/mes</p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• PostgreSQL serverless</li>
                  <li>• Branching por tenant</li>
                  <li>• Point-in-time recovery</li>
                  <li>• Auto-scaling</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total Mensual:</span>
                <span className="text-2xl font-bold text-gray-900">${monthlyBudget.total}/mes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Phases */}
        <div className="space-y-6 mb-8">
          {phases.map((phase) => {
            const phaseTasks = tasks.filter(task => task.phase === phase.id);
            const completedPhaseTasks = phaseTasks.filter(task => task.status === 'completed').length;
            const phaseProgress = phaseTasks.length > 0 ? (completedPhaseTasks / phaseTasks.length) * 100 : 0;

            return (
              <div key={phase.id} className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">{phase.title}</h2>
                      <p className="text-gray-600">{phase.description}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(phase.status)}`}>
                        {phase.status === 'completed' ? 'Completada' : 
                         phase.status === 'in-progress' ? 'En Progreso' : 'Pendiente'}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        Presupuesto: ${phase.spent}/${phase.budget}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>Progreso: {completedPhaseTasks}/{phaseTasks.length} tareas</span>
                      <span>{Math.round(phaseProgress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${phaseProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {phaseTasks.map((task) => (
                      <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-medium text-gray-900">{task.title}</h3>
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                                {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>💰 ${task.actualCost || task.estimatedCost}</span>
                              <span>⏱️ {task.actualHours || task.estimatedHours}h</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(task.status)}`}>
                              {task.status === 'completed' ? 'Completada' : 
                               task.status === 'in-progress' ? 'En Progreso' : 'Pendiente'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech Stack */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">🛠️ Stack Tecnológico</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">⚛️</div>
                <h3 className="font-medium">Frontend</h3>
                <p className="text-sm text-gray-600">Next.js 15 + React 19 + Tailwind</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">🔧</div>
                <h3 className="font-medium">Backend</h3>
                <p className="text-sm text-gray-600">Next.js API Routes + tRPC</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">🗄️</div>
                <h3 className="font-medium">Database</h3>
                <p className="text-sm text-gray-600">Neon PostgreSQL</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">🔐</div>
                <h3 className="font-medium">Auth</h3>
                <p className="text-sm text-gray-600">NextAuth + Auth0</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">📸</div>
                <h3 className="font-medium">Images</h3>
                <p className="text-sm text-gray-600">AWS S3 + CloudFront</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="font-medium">Monitoring</h3>
                <p className="text-sm text-gray-600">Sentry + Datadog</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">🛡️</div>
                <h3 className="font-medium">Security</h3>
                <p className="text-sm text-gray-600">Cloudflare Enterprise</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">💳</div>
                <h3 className="font-medium">Payments</h3>
                <p className="text-sm text-gray-600">Stripe (futuro)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">🛡️ Características de Seguridad</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Seguridad de Datos</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Encriptación end-to-end
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Row-level security en PostgreSQL
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Audit logs inmutables
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Backup automático cada hora
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Seguridad de Aplicación</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    2FA obligatorio para operaciones críticas
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Rate limiting agresivo
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Validación exhaustiva de inputs
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Monitoreo 24/7 con alertas
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
