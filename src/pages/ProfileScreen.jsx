import React from 'react'
import { useUser } from '../context/UserContext'
import Header from '../components/Header'
import BadgesSection from '../components/BadgesSection'
import StatsPanel from '../components/StatsPanel'
import SkillProgressChart from '../components/SkillProgressChart'

const ProfileScreen = () => {
  const { user, getCurrentLevelTitle } = useUser()

  const stats = [
    { label: 'Nivel Actual', value: user.level, icon: '📊' },
    { label: 'Experiencia Total', value: `${user.xp} XP`, icon: '⭐' },
    { label: 'Racha Actual', value: `${user.streak} días`, icon: '🔥' },
    { label: 'Lecciones Completadas', value: user.completedLessons, icon: '✅' },
    { label: 'Denominación', value: user.selectedDenomination || 'No especificada', icon: '⛪' },
    { label: 'Nivel de Estudio', value: user.selectedLevel || 'Principiante', icon: '📚' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="card mb-8">
          <div className="flex items-center space-x-6 mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-4xl shadow-2xl">
              👤
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-2">
                {user.isGuest ? 'Invitado' : 'Teólogo'}
              </h1>
              <p className="text-xl text-purple-300 mb-1">
                {getCurrentLevelTitle()}
              </p>
              <p className="text-purple-400">
                Nivel {user.level} • {user.xp} XP
              </p>
            </div>
          </div>

          {/* Progress to next level */}
          <div className="bg-gray-900/50 rounded-xl p-4 border border-purple-700/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-purple-300 text-sm">Progreso al siguiente nivel</span>
              <span className="text-white font-bold">{user.xp % 250}/250 XP</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((user.xp % 250) / 250) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Stats Panel Avanzado */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-6">
            Estadísticas Detalladas
          </h2>
          <StatsPanel />
        </div>

        {/* Progreso de Habilidades */}
        <div className="mb-8">
          <SkillProgressChart />
        </div>

        {/* Achievements Section */}
        <BadgesSection />

        {/* Study Preferences */}
        <div className="card mt-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-6">
            Preferencias de Estudio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Nivel de Dificultad
              </label>
              <select className="input-field w-full">
                <option value="principiante">Principiante</option>
                <option value="intermedio">Intermedio</option>
                <option value="avanzado">Avanzado</option>
              </select>
            </div>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Denominación
              </label>
              <select className="input-field w-full">
                <option value="">No especificar</option>
                <option value="bautista">Bautista</option>
                <option value="metodista">Metodista</option>
                <option value="pentecostal">Pentecostal</option>
                <option value="reformada">Reformada</option>
              </select>
            </div>
          </div>
          <button type="button" className="btn-primary mt-6">
            Guardar Cambios
          </button>
        </div>
      </main>
    </div>
  )
}

export default ProfileScreen