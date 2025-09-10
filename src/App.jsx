import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import WelcomeScreen from './pages/WelcomeScreen'
import Dashboard from './pages/Dashboard'
import LessonScreen from './pages/LessonScreen'
import ProfileScreen from './pages/ProfileScreen'

function App() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lesson/:skillId" element={<LessonScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
      </div>
    </UserProvider>
  )
}

export default App