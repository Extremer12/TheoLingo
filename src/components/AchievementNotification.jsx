import React, { useState, useEffect } from 'react'
import { badges } from '../data/skills'

const AchievementNotification = ({ badgeId, onClose }) => {
  const [isVisible, setIsVisible] = useState(false)
  const badge = badges.find(b => b.id === badgeId)

  useEffect(() => {
    // Mostrar la notificación con animación
    setIsVisible(true)
    
    // Auto-cerrar después de 4 segundos
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Esperar a que termine la animación
    }, 4000)

    return () => clearTimeout(timer)
  }, [onClose])

  if (!badge) return null

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className={`bg-gradient-to-br from-purple-900/95 to-pink-900/95 backdrop-blur-xl border-2 border-yellow-500/50 rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl transform transition-all duration-500 ${
        isVisible ? 'scale-100 rotate-0' : 'scale-75 rotate-12'
      }`}>
        {/* Confetti decorativo */}
        <div className="absolute -top-4 -left-4 text-2xl animate-bounce">🎉</div>
        <div className="absolute -top-4 -right-4 text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>✨</div>
        <div className="absolute -bottom-4 -left-4 text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>🌟</div>
        <div className="absolute -bottom-4 -right-4 text-2xl animate-bounce" style={{ animationDelay: '0.6s' }}>🎊</div>
        
        {/* Contenido principal */}
        <div className="relative">
          <div className="text-6xl mb-4 animate-pulse">
            {badge.icon}
          </div>
          
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent mb-2">
            ¡Nueva Insignia!
          </h2>
          
          <h3 className="text-xl font-bold text-white mb-3">
            {badge.name}
          </h3>
          
          <p className="text-purple-200 mb-6">
            {badge.description}
          </p>
          
          <div className="bg-black/30 rounded-xl p-4 mb-6">
            <p className="text-yellow-300 text-sm font-medium">
              "Bien, buen siervo y fiel; sobre poco has sido fiel, sobre mucho te pondré"
            </p>
            <p className="text-yellow-400 text-xs mt-1">— Mateo 25:21</p>
          </div>
          
          <button
            type="button"
            onClick={() => {
              setIsVisible(false)
              setTimeout(onClose, 300)
            }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            ¡Continuar!
          </button>
        </div>
      </div>
    </div>
  )
}

export default AchievementNotification