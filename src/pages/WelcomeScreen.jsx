import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { denominations, levels } from '../data/skills'
import Confetti from '../components/Confetti'

const WelcomeScreen = () => {
  const navigate = useNavigate()
  const { user, updateUser, showConfetti } = useUser()
  const [selectedLevel, setSelectedLevel] = useState('')
  const [selectedDenomination, setSelectedDenomination] = useState('')

  const handleStartLearning = (isGuest = false) => {
    updateUser({
      isGuest,
      selectedLevel: isGuest ? 'Principiante' : selectedLevel,
      selectedDenomination
    })
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {showConfetti && <Confetti />}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_70%)]"></div>
      
      <div className="text-center max-w-md mx-auto relative z-10">
        <div className="mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 tracking-tight">
            TheoLingo
          </h1>
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-5xl shadow-2xl">
              📖
            </div>
          </div>
          <p className="text-xl text-purple-200 italic mb-10 leading-relaxed">
            "Crece en la gracia y el conocimiento de nuestro Señor y Salvador Jesucristo". 
            <span className="block text-purple-300 text-lg mt-2">— 2 Pedro 3:18</span>
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 shadow-2xl">
          <h2 className="text-2xl font-semibold text-purple-300 mb-6 text-left">Selecciona tu nivel</h2>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {levels.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setSelectedLevel(level)}
                className={`p-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedLevel === level
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 border border-purple-400'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 border border-gray-600 hover:border-purple-500'
                }`}
              >
                <div className="font-bold">{level}</div>
              </button>
            ))}
          </div>

          <h2 className="text-2xl font-semibold text-purple-300 mb-6 text-left">Denominación (opcional)</h2>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {denominations.map((denom) => (
              <button
                key={denom}
                type="button"
                onClick={() => setSelectedDenomination(denom)}
                className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedDenomination === denom
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                    : 'bg-gray-700/30 text-gray-300 hover:bg-gray-700/60 border border-gray-600'
                }`}
              >
                {denom}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <button
              type="button"
              onClick={() => handleStartLearning(true)}
              className="w-full btn-primary"
            >
              <div className="flex items-center justify-center space-x-3">
                <span>🎮 Jugar como Invitado</span>
                <span>→</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => handleStartLearning(false)}
              disabled={!selectedLevel}
              className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                selectedLevel
                  ? 'btn-secondary shadow-xl hover:shadow-2xl'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed border border-gray-600'
              }`}
            >
              <div className="flex items-center justify-center space-x-3">
                <span>🔐 Crear Cuenta</span>
                <span>→</span>
              </div>
            </button>
          </div>
        </div>

        <p className="text-purple-400 text-sm mt-8 font-light">
          "Aprende teología como aprendes un idioma: con práctica, paciencia… y un poquito de juego."
        </p>
      </div>
    </div>
  )
}

export default WelcomeScreen