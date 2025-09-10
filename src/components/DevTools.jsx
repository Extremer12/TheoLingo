import React, { useState } from 'react'
import { useUser } from '../context/UserContext'

const DevTools = () => {
  const { user, resetProgress, exportUserData, completeLesson } = useUser()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleTestBadge = () => {
    // Simular completar varias lecciones para obtener insignias
    completeLesson('trinity')
  }

  const handleTestLevelUp = () => {
    // Agregar XP suficiente para subir de nivel
    for (let i = 0; i < 5; i++) {
      completeLesson('trinity')
    }
  }

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded-full shadow-lg transition-colors"
        title="Herramientas de Desarrollo"
      >
        🛠️
      </button>
      
      {isExpanded && (
        <div className="absolute bottom-16 left-0 bg-gray-900/95 backdrop-blur-xl border border-yellow-500/50 rounded-xl p-4 min-w-64 shadow-2xl">
          <h3 className="text-yellow-300 font-bold mb-3">🛠️ Dev Tools</h3>
          
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-400">XP:</span>
                <span className="text-white ml-1">{user.xp}</span>
              </div>
              <div>
                <span className="text-gray-400">Nivel:</span>
                <span className="text-white ml-1">{user.level}</span>
              </div>
              <div>
                <span className="text-gray-400">Racha:</span>
                <span className="text-white ml-1">{user.streak}</span>
              </div>
              <div>
                <span className="text-gray-400">Lecciones:</span>
                <span className="text-white ml-1">{user.completedLessons}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-2">
              <div className="text-gray-400 text-xs mb-1">Habilidades:</div>
              <div className="text-white text-xs">
                {user.unlockedSkills.join(', ')}
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-2">
              <div className="text-gray-400 text-xs mb-1">Insignias:</div>
              <div className="text-white text-xs">
                {user.earnedBadges.join(', ') || 'Ninguna'}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-3 mt-3 space-y-2">
            <button
              type="button"
              onClick={handleTestBadge}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded transition-colors"
            >
              Probar Insignia
            </button>
            
            <button
              type="button"
              onClick={handleTestLevelUp}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs py-2 px-3 rounded transition-colors"
            >
              Subir Nivel
            </button>
            
            <button
              type="button"
              onClick={exportUserData}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-xs py-2 px-3 rounded transition-colors"
            >
              Exportar Datos
            </button>
            
            <button
              type="button"
              onClick={() => {
                if (confirm('¿Estás seguro de que quieres resetear todo el progreso?')) {
                  resetProgress()
                }
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-xs py-2 px-3 rounded transition-colors"
            >
              Reset Completo
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DevTools