import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { skills } from '../data/skills'
import Header from '../components/Header'
import Confetti from '../components/Confetti'
import LessonExercises from '../components/LessonExercises'

const LessonScreen = () => {
  const { skillId } = useParams()
  const navigate = useNavigate()
  const { completeLesson, showConfetti } = useUser()
  
  const skill = skills.find(s => s.id === skillId)
  
  if (!skill) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Habilidad no encontrada</h1>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="btn-primary"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    )
  }

  const handleCompleteLesson = () => {
    completeLesson()
    setTimeout(() => {
      navigate('/dashboard')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {showConfetti && <Confetti />}
      
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Lesson Header */}
        <div className="card mb-8">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-yellow-500 rounded-2xl flex items-center justify-center text-2xl mr-4 shadow-lg">
              {skill.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                Lección: {skill.name}
              </h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-purple-400 text-sm">Nivel Intermedio • 5-7 min</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-600/30 rounded-2xl p-6 mb-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">📖</span>
              </div>
              <p className="text-lg text-purple-200 italic leading-relaxed">
                {skill.description}
              </p>
            </div>
          </div>
        </div>

        <LessonExercises skill={skill} />

        {/* Complete Lesson Button */}
        <div className="mt-8 pt-6 border-t border-purple-700/30 flex justify-center">
          <button
            type="button"
            onClick={handleCompleteLesson}
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-2xl text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-purple-500/50"
          >
            <div className="flex items-center space-x-3">
              <span>✅ Completar Lección</span>
              <span className="bg-black/30 px-2 py-1 rounded-lg text-sm">+50 XP</span>
            </div>
          </button>
        </div>
      </main>
    </div>
  )
}

export default LessonScreen