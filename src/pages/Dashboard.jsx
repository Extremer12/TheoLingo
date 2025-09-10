import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { skills } from '../data/skills'
import Header from '../components/Header'
import Confetti from '../components/Confetti'
import SkillsTree from '../components/SkillsTree'
import WelcomeBanner from '../components/WelcomeBanner'
import BadgesSection from '../components/BadgesSection'
import AchievementNotification from '../components/AchievementNotification'
import DevTools from '../components/DevTools'

const Dashboard = () => {
  const navigate = useNavigate()
  const { showConfetti, user } = useUser()
  const [newBadgeNotification, setNewBadgeNotification] = useState(null)
  const [previousBadgeCount, setPreviousBadgeCount] = useState(user.earnedBadges.length)

  // Detectar nuevas insignias
  useEffect(() => {
    if (user.earnedBadges.length > previousBadgeCount) {
      const newBadge = user.earnedBadges[user.earnedBadges.length - 1]
      setNewBadgeNotification(newBadge)
      setPreviousBadgeCount(user.earnedBadges.length)
    }
  }, [user.earnedBadges.length, previousBadgeCount])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {showConfetti && <Confetti />}
      
      {newBadgeNotification && (
        <AchievementNotification 
          badgeId={newBadgeNotification}
          onClose={() => setNewBadgeNotification(null)}
        />
      )}
      
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <WelcomeBanner />
        <SkillsTree />
        <BadgesSection />
        
        {/* Debug Panel - Solo visible en desarrollo */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-900/50 rounded-xl border border-gray-700">
            <h3 className="text-lg font-bold text-yellow-300 mb-2">🛠️ Panel de Desarrollo</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-400">XP:</span>
                <span className="text-white ml-2">{user.xp}</span>
              </div>
              <div>
                <span className="text-gray-400">Nivel:</span>
                <span className="text-white ml-2">{user.level}</span>
              </div>
              <div>
                <span className="text-gray-400">Racha:</span>
                <span className="text-white ml-2">{user.streak}</span>
              </div>
              <div>
                <span className="text-gray-400">Lecciones:</span>
                <span className="text-white ml-2">{user.completedLessons}</span>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-gray-400">Habilidades desbloqueadas:</span>
              <span className="text-white ml-2">{user.unlockedSkills.join(', ')}</span>
            </div>
            <div className="mt-2">
              <span className="text-gray-400">Insignias:</span>
              <span className="text-white ml-2">{user.earnedBadges.join(', ') || 'Ninguna'}</span>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-black/50 backdrop-blur-xl border-t border-purple-700/30 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-purple-400 text-sm">TheoLingo</div>
              <div className="text-xs text-gray-500">v2.0.0 - Con Persistencia</div>
            </div>
            <div className="text-center">
              <div className="text-purple-300 text-sm font-light">
                "Aprende teología como aprendes un idioma"
              </div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 text-sm">© 2024</div>
              <div className="text-xs text-gray-500">Todos los derechos</div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Herramientas de Desarrollo */}
      <DevTools />
    </div>
  )
}

export default Dashboard