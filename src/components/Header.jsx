import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const Header = () => {
  const navigate = useNavigate()
  const { user, getCurrentLevelTitle } = useUser()

  return (
    <header className="bg-black/50 backdrop-blur-xl border-b border-purple-700/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg hover:scale-105 transition-transform"
            >
              TL
            </button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                TheoLingo
              </h1>
              <p className="text-purple-300 text-sm">
                Nivel {user.level} - {getCurrentLevelTitle()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-3 border border-purple-500/30">
              <div className="text-yellow-400 font-bold text-lg flex items-center space-x-1">
                <span>{user.streak}</span>
                <span>🔥</span>
              </div>
              <div className="text-xs text-gray-400">Racha</div>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-3 border border-purple-500/30">
              <div className="text-blue-400 font-bold text-lg flex items-center space-x-1">
                <span>{user.xp}</span>
                <span>XP</span>
              </div>
              <div className="text-xs text-gray-400">Experiencia</div>
            </div>
            
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-sm rounded-xl p-3 border border-purple-500/30 hover:border-purple-400 transition-colors"
            >
              <div className="text-purple-300 font-bold text-lg">{user.completedLessons}</div>
              <div className="text-xs text-gray-400">Lecciones</div>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header