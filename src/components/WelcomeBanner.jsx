import React from 'react'
import { useUser } from '../context/UserContext'
import { skills } from '../data/skills'

const WelcomeBanner = () => {
  const { user } = useUser()
  
  const completedSkills = skills.filter(s => s.progress === 100).length
  const xpToNextLevel = 250 - (user.xp % 250)

  return (
    <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-3xl p-8 mb-10 backdrop-blur-sm border border-purple-700/30">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
          ✨
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-3">
            ¡Bienvenido de nuevo, teólogo!
          </h2>
          <p className="text-lg text-purple-200 mb-4 italic leading-relaxed">
            "Procura con diligencia presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse, que usa bien la palabra de verdad."
            <span className="block text-purple-300 text-sm mt-1">— 2 Timoteo 2:15</span>
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-black/30 rounded-xl px-4 py-2 border border-purple-500/30">
              <span className="text-purple-300 text-sm">Dominadas: </span>
              <span className="text-white font-bold">{completedSkills}/{skills.length}</span>
            </div>
            <div className="bg-black/30 rounded-xl px-4 py-2 border border-purple-500/30">
              <span className="text-purple-300 text-sm">Próximo nivel: </span>
              <span className="text-white font-bold">{xpToNextLevel} XP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeBanner