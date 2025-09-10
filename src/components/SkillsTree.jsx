import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { skills } from '../data/skills'

const SkillsTree = () => {
  const navigate = useNavigate()
  const { user, completeLesson } = useUser()

  // Función para verificar si una habilidad está desbloqueada
  const isSkillUnlocked = (skill) => {
    return user.unlockedSkills.includes(skill.id)
  }

  // Función para obtener el progreso de una habilidad
  const getSkillProgress = (skillId) => {
    return user.skillProgress[skillId] || 0
  }

  const handleSkillClick = (skill) => {
    if (isSkillUnlocked(skill)) {
      navigate(`/lesson/${skill.id}`)
    }
  }

  const handleContinue = (e, skill) => {
    e.stopPropagation()
    const progress = getSkillProgress(skill.id)
    if (progress < 100 && isSkillUnlocked(skill)) {
      completeLesson(skill.id)
    }
  }

  return (
    <div className="mb-12">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-2xl mr-4">
          🌳
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
          Árbol de Habilidades
        </h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {skills.map((skill) => {
          const isUnlocked = isSkillUnlocked(skill)
          const progress = getSkillProgress(skill.id)
          
          return (
            <div
              key={skill.id}
              onClick={() => handleSkillClick(skill)}
              className={`relative group rounded-2xl overflow-hidden transition-all duration-300 ${
                isUnlocked 
                  ? 'hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer' 
                  : 'opacity-60 cursor-not-allowed'
              }`}
            >
              <div className={`${skill.color} p-6 text-white text-center relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">
                    {skill.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{skill.name}</h3>
                  <div className="text-sm opacity-90">{progress}%</div>
                  <div className="text-xs opacity-75 mt-1">
                    {skill.difficulty} • {skill.estimatedTime}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 p-4 border-t border-purple-700/30">
                <div className="w-full bg-gray-700 rounded-full h-2 mb-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                
                {progress < 100 && isUnlocked && (
                  <button
                    type="button"
                    onClick={(e) => handleContinue(e, skill)}
                    className="w-full mt-2 btn-primary text-sm py-2"
                  >
                    {progress === 0 ? 'Comenzar' : 'Continuar'}
                  </button>
                )}
                
                {!isUnlocked && (
                  <div className="w-full mt-2 bg-gray-700 text-gray-400 font-bold py-2 px-4 rounded-lg text-center text-sm">
                    <div className="flex items-center justify-center space-x-1">
                      <span>🔒</span>
                      <span>Bloqueado</span>
                    </div>
                    {skill.prerequisites.length > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        Completa: {skill.prerequisites.join(', ')}
                      </div>
                    )}
                  </div>
                )}
                
                {progress === 100 && (
                  <div className="w-full mt-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-2 px-4 rounded-lg text-center flex items-center justify-center space-x-2">
                    <span>✅</span>
                    <span>Maestro</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SkillsTree