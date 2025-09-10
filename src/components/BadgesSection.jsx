import React from 'react'
import { useUser } from '../context/UserContext'
import { badges } from '../data/skills'

const BadgesSection = () => {
  const { user } = useUser()

  const getBadgeStatus = (badgeId) => {
    return user.earnedBadges.includes(badgeId)
  }

  const getBadgeColors = (badge, isEarned) => {
    if (isEarned) {
      return `bg-gradient-to-br ${badge.color} border-2 border-green-500`
    }
    return `bg-gradient-to-br ${badge.color} border border-gray-700/30 hover:border-gray-500/50`
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-700/30">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl mr-4">
          🏆
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
          Tus Insignias
        </h2>
        <div className="ml-auto text-purple-300 text-sm">
          {user.earnedBadges.length}/{badges.length} obtenidas
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {badges.map((badge) => {
          const isEarned = getBadgeStatus(badge.id)
          
          return (
            <div
              key={badge.id}
              className={`${getBadgeColors(badge, isEarned)} p-6 rounded-2xl text-center group transition-all duration-300 ${
                isEarned ? 'transform hover:scale-105' : ''
              }`}
            >
              <div className={`text-4xl mb-3 transition-transform duration-300 group-hover:scale-110 ${
                isEarned ? 'animate-pulse' : ''
              }`}>
                {badge.icon}
              </div>
              <div className={`font-bold mb-1 text-sm ${
                isEarned ? 'text-green-300' : 'text-gray-400'
              }`}>
                {badge.name}
              </div>
              <div className={`text-xs ${isEarned ? 'text-gray-300' : 'text-gray-500'}`}>
                {badge.description}
              </div>
              <div className="mt-3">
                {isEarned ? (
                  <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                    ¡Obtenida!
                  </span>
                ) : (
                  <div className="text-xs text-gray-600">
                    <div className="w-full bg-gray-700 rounded-full h-1 mb-1">
                      <div className="bg-gray-600 h-1 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                    No obtenida
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Progreso general */}
      <div className="mt-8 pt-6 border-t border-purple-700/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-purple-300 text-sm">Progreso de Insignias</span>
          <span className="text-white font-bold">
            {user.earnedBadges.length}/{badges.length}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(user.earnedBadges.length / badges.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default BadgesSection