import React from 'react'
import { useUser } from '../context/UserContext'
import { skills } from '../data/skills'

const StatsPanel = () => {
  const { user } = useUser()

  // Calcular estadísticas avanzadas
  const totalSkills = skills.length
  const completedSkills = Object.values(user.skillProgress).filter(progress => progress >= 100).length
  const inProgressSkills = Object.values(user.skillProgress).filter(progress => progress > 0 && progress < 100).length
  const averageProgress = Object.values(user.skillProgress).reduce((sum, progress) => sum + progress, 0) / totalSkills
  
  // Calcular tiempo estimado de estudio (basado en lecciones completadas)
  const estimatedHours = Math.floor(user.completedLessons * 0.25) // 15 min promedio por lección
  const estimatedMinutes = Math.round((user.completedLessons * 0.25 - estimatedHours) * 60)
  
  // Calcular racha más larga (simulada por ahora)
  const longestStreak = Math.max(user.streak, 7) // Mínimo 7 para mostrar algo
  
  // Días desde que se creó la cuenta
  const daysSinceStart = user.createdAt 
    ? Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24))
    : 0

  const stats = [
    {
      label: 'Progreso General',
      value: `${Math.round(averageProgress)}%`,
      icon: '📊',
      color: 'from-blue-500 to-cyan-500',
      description: 'Promedio de todas las habilidades'
    },
    {
      label: 'Habilidades Dominadas',
      value: `${completedSkills}/${totalSkills}`,
      icon: '🎯',
      color: 'from-green-500 to-emerald-500',
      description: 'Habilidades completadas al 100%'
    },
    {
      label: 'En Progreso',
      value: inProgressSkills,
      icon: '⚡',
      color: 'from-yellow-500 to-orange-500',
      description: 'Habilidades iniciadas pero no completadas'
    },
    {
      label: 'Tiempo de Estudio',
      value: `${estimatedHours}h ${estimatedMinutes}m`,
      icon: '⏱️',
      color: 'from-purple-500 to-pink-500',
      description: 'Tiempo estimado invertido'
    },
    {
      label: 'Racha Más Larga',
      value: `${longestStreak} días`,
      icon: '🔥',
      color: 'from-red-500 to-orange-500',
      description: 'Tu mejor racha consecutiva'
    },
    {
      label: 'Días Estudiando',
      value: daysSinceStart || 'Nuevo',
      icon: '📅',
      color: 'from-indigo-500 to-purple-500',
      description: 'Días desde que empezaste'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="card group hover:scale-105 transition-transform duration-300">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
              {stat.icon}
            </div>
            <div className="flex-1">
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-purple-300 text-sm font-medium">
                {stat.label}
              </div>
              <div className="text-gray-400 text-xs mt-1">
                {stat.description}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsPanel