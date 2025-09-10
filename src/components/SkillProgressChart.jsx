import React from 'react'
import { useUser } from '../context/UserContext'
import { skills } from '../data/skills'

const SkillProgressChart = () => {
  const { user } = useUser()

  return (
    <div className="card">
      <h3 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-6">
        Progreso por Habilidad
      </h3>
      
      <div className="space-y-4">
        {skills.map((skill) => {
          const progress = user.skillProgress[skill.id] || 0
          const isUnlocked = user.unlockedSkills.includes(skill.id)
          
          return (
            <div key={skill.id} className="flex items-center space-x-4">
              <div className={`w-10 h-10 ${skill.color} rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${
                !isUnlocked ? 'opacity-50' : ''
              }`}>
                {skill.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-medium ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                    {skill.name}
                  </span>
                  <span className={`text-sm ${isUnlocked ? 'text-purple-300' : 'text-gray-500'}`}>
                    {isUnlocked ? `${progress}%` : '🔒'}
                  </span>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      progress === 100 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                        : progress > 0
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                        : 'bg-gray-600'
                    }`}
                    style={{ width: `${isUnlocked ? progress : 0}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">
                    {skill.difficulty} • {skill.estimatedTime}
                  </span>
                  {progress === 100 && (
                    <span className="text-xs text-green-400 font-medium">
                      ✅ Completado
                    </span>
                  )}
                  {progress > 0 && progress < 100 && isUnlocked && (
                    <span className="text-xs text-purple-400 font-medium">
                      En progreso
                    </span>
                  )}
                  {!isUnlocked && (
                    <span className="text-xs text-gray-500">
                      Bloqueado
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Resumen */}
      <div className="mt-6 pt-4 border-t border-purple-700/30">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-400">
              {Object.values(user.skillProgress).filter(p => p >= 100).length}
            </div>
            <div className="text-xs text-gray-400">Completadas</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-400">
              {Object.values(user.skillProgress).filter(p => p > 0 && p < 100).length}
            </div>
            <div className="text-xs text-gray-400">En Progreso</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-400">
              {skills.length - user.unlockedSkills.length}
            </div>
            <div className="text-xs text-gray-400">Bloqueadas</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillProgressChart