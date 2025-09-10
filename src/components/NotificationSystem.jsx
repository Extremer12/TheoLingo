import React, { useState, useEffect } from 'react'
import { badges } from '../data/skills'

const NotificationSystem = ({ notifications, onDismiss }) => {
  const [visibleNotifications, setVisibleNotifications] = useState([])

  useEffect(() => {
    if (notifications.length > 0) {
      setVisibleNotifications(notifications)
      
      // Auto-dismiss después de 5 segundos
      const timer = setTimeout(() => {
        setVisibleNotifications([])
        onDismiss()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [notifications, onDismiss])

  const getBadgeInfo = (badgeId) => {
    return badges.find(b => b.id === badgeId) || { name: 'Insignia', icon: '🏆' }
  }

  if (visibleNotifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {visibleNotifications.map((notification, index) => (
        <div
          key={index}
          className="bg-gradient-to-r from-purple-900/95 to-pink-900/95 backdrop-blur-xl border border-purple-500/50 rounded-2xl p-4 shadow-2xl transform animate-slide-in-right max-w-sm"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {notification.type === 'badge' && (
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-2xl animate-bounce">
                  {getBadgeInfo(notification.badgeId).icon}
                </div>
              )}
              {notification.type === 'levelUp' && (
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl animate-pulse">
                  ⭐
                </div>
              )}
              {notification.type === 'skillComplete' && (
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-2xl animate-spin">
                  ✅
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-sm">
                  {notification.type === 'badge' && '¡Nueva Insignia!'}
                  {notification.type === 'levelUp' && '¡Subiste de Nivel!'}
                  {notification.type === 'skillComplete' && '¡Habilidad Completada!'}
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    setVisibleNotifications([])
                    onDismiss()
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <p className="text-purple-200 text-sm mt-1">
                {notification.type === 'badge' && (
                  <>Has obtenido: <strong>{getBadgeInfo(notification.badgeId).name}</strong></>
                )}
                {notification.type === 'levelUp' && (
                  <>¡Ahora eres nivel <strong>{notification.newLevel}</strong>!</>
                )}
                {notification.type === 'skillComplete' && (
                  <>¡Dominaste <strong>{notification.skillName}</strong>!</>
                )}
              </p>
              
              {notification.xpGained && (
                <div className="flex items-center mt-2">
                  <span className="bg-blue-600/50 text-blue-200 text-xs px-2 py-1 rounded-full">
                    +{notification.xpGained} XP
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NotificationSystem