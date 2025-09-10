import React, { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser debe ser usado dentro de UserProvider')
  }
  return context
}

// Configuración por defecto para nuevos usuarios
const defaultUserData = {
  isGuest: false,
  selectedLevel: '',
  selectedDenomination: '',
  streak: 0,
  xp: 0,
  level: 1,
  completedLessons: 0,
  unlockedSkills: ['trinity'], // Solo la primera habilidad desbloqueada
  skillProgress: {
    trinity: 0,
    salvation: 0,
    oldCovenant: 0,
    newBirth: 0,
    scripture: 0,
    sacraments: 0,
    eschatology: 0,
    paul: 0,
    grace: 0,
    hermeneutics: 0
  },
  earnedBadges: [],
  lastLoginDate: null,
  lessonHistory: [],
  preferences: {
    difficulty: 'intermedio',
    denomination: '',
    notifications: true
  }
}

// Funciones de localStorage
const STORAGE_KEY = 'theolingo_user_data'

const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Error guardando en localStorage:', error)
  }
}

const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      // Merge con datos por defecto para asegurar compatibilidad
      return { ...defaultUserData, ...parsed }
    }
  } catch (error) {
    console.error('Error cargando de localStorage:', error)
  }
  return defaultUserData
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(loadFromStorage())
  const [showConfetti, setShowConfetti] = useState(false)
  const [notifications, setNotifications] = useState([])

  // Guardar automáticamente cuando cambie el estado del usuario
  useEffect(() => {
    saveToStorage(user)
  }, [user])

  // Verificar racha diaria al cargar
  useEffect(() => {
    checkDailyStreak()
  }, [])

  const levelTitles = {
    1: 'Catecúmeno',
    5: 'Creyente',
    10: 'Maestro de la Palabra',
    20: 'Teólogo Reformado'
  }

  const getCurrentLevelTitle = () => {
    if (user.level >= 20) return levelTitles[20]
    if (user.level >= 10) return levelTitles[10]
    if (user.level >= 5) return levelTitles[5]
    return levelTitles[1]
  }

  const updateUser = (updates) => {
    setUser(prev => {
      const newUser = { ...prev, ...updates }
      return newUser
    })
  }

  // Sistema de racha diaria
  const checkDailyStreak = () => {
    const today = new Date().toDateString()
    const lastLogin = user.lastLoginDate
    
    if (!lastLogin) {
      // Primera vez que entra
      updateUser({ 
        lastLoginDate: today,
        streak: 1 
      })
      return
    }

    const lastLoginDate = new Date(lastLogin)
    const todayDate = new Date(today)
    const diffTime = todayDate - lastLoginDate
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      // Día consecutivo - incrementar racha
      updateUser({ 
        lastLoginDate: today,
        streak: user.streak + 1 
      })
    } else if (diffDays > 1) {
      // Se rompió la racha
      updateUser({ 
        lastLoginDate: today,
        streak: 1 
      })
    }
    // Si diffDays === 0, ya se conectó hoy, no hacer nada
  }

  // Sistema de desbloqueo de habilidades
  const unlockNextSkill = () => {
    const skillOrder = [
      'trinity', 'salvation', 'oldCovenant', 'newBirth', 
      'scripture', 'sacraments', 'eschatology', 'paul', 
      'grace', 'hermeneutics'
    ]
    
    const currentUnlocked = user.unlockedSkills.length
    if (currentUnlocked < skillOrder.length) {
      const nextSkill = skillOrder[currentUnlocked]
      updateUser({
        unlockedSkills: [...user.unlockedSkills, nextSkill]
      })
      return nextSkill
    }
    return null
  }

  // Completar lección con lógica mejorada
  const completeLesson = (skillId, xpGained = 50) => {
    const today = new Date().toISOString().split('T')[0]
    const newXp = user.xp + xpGained
    const newLevel = Math.floor(newXp / 250) + 1
    const newCompletedLessons = user.completedLessons + 1
    
    // Actualizar progreso de la habilidad específica
    const newSkillProgress = { ...user.skillProgress }
    const currentProgress = newSkillProgress[skillId] || 0
    const newProgress = Math.min(currentProgress + 20, 100) // +20% por lección
    newSkillProgress[skillId] = newProgress
    
    // Agregar al historial
    const newLessonHistory = [
      ...user.lessonHistory,
      {
        skillId,
        date: today,
        xpGained,
        timestamp: Date.now()
      }
    ]

    // Verificar si se desbloqueó nueva habilidad
    let newUnlockedSkills = user.unlockedSkills
    if (newProgress === 100 && newUnlockedSkills.length < 10) {
      const nextSkill = unlockNextSkill()
      if (nextSkill) {
        newUnlockedSkills = [...user.unlockedSkills, nextSkill]
      }
    }

    // Verificar nuevas insignias
    const newBadges = checkForNewBadges({
      ...user,
      xp: newXp,
      level: newLevel,
      completedLessons: newCompletedLessons,
      skillProgress: newSkillProgress,
      lessonHistory: newLessonHistory
    })

    updateUser({
      xp: newXp,
      level: newLevel,
      completedLessons: newCompletedLessons,
      skillProgress: newSkillProgress,
      lessonHistory: newLessonHistory,
      unlockedSkills: newUnlockedSkills,
      earnedBadges: [...user.earnedBadges, ...newBadges]
    })
    
    // Crear notificaciones para nuevos logros
    const newNotifications = []
    
    // Notificación de subida de nivel
    if (newLevel > user.level) {
      newNotifications.push({
        type: 'levelUp',
        newLevel,
        xpGained
      })
    }
    
    // Notificaciones de nuevas insignias
    newBadges.forEach(badgeId => {
      newNotifications.push({
        type: 'badge',
        badgeId,
        xpGained: 0
      })
    })
    
    // Notificación de habilidad completada
    if (newProgress === 100) {
      newNotifications.push({
        type: 'skillComplete',
        skillName: skillId,
        xpGained: 0
      })
    }
    
    // Mostrar confetti y notificaciones si hay logros
    if (newNotifications.length > 0) {
      setShowConfetti(true)
      setNotifications(newNotifications)
      setTimeout(() => setShowConfetti(false), 3000)
    }

    return {
      newBadges,
      levelUp: newLevel > user.level,
      skillCompleted: newProgress === 100,
      unlockedSkill: newUnlockedSkills.length > user.unlockedSkills.length
    }
  }

  // Sistema de insignias dinámico
  const checkForNewBadges = (userData) => {
    const newBadges = []
    const currentBadges = userData.earnedBadges || []

    // Insignia: Primer Paso
    if (!currentBadges.includes('first-lesson') && userData.completedLessons >= 1) {
      newBadges.push('first-lesson')
    }

    // Insignia: Discípulo Consistente (7 días de racha)
    if (!currentBadges.includes('consistent') && userData.streak >= 7) {
      newBadges.push('consistent')
    }

    // Insignia: Maestro de la Sola Scriptura
    if (!currentBadges.includes('sola-scriptura') && userData.skillProgress.scripture >= 100) {
      newBadges.push('sola-scriptura')
    }

    // Insignia: Teólogo Dedicado (50 lecciones)
    if (!currentBadges.includes('dedicated') && userData.completedLessons >= 50) {
      newBadges.push('dedicated')
    }

    // Insignia: Calvinista Certificado
    if (!currentBadges.includes('calvinist') && userData.skillProgress.grace >= 100) {
      newBadges.push('calvinist')
    }

    // Insignia: Amigo de Pablo
    if (!currentBadges.includes('paul-friend') && userData.skillProgress.paul >= 100) {
      newBadges.push('paul-friend')
    }

    return newBadges
  }

  // Resetear progreso (para testing)
  const resetProgress = () => {
    setUser(defaultUserData)
    localStorage.removeItem(STORAGE_KEY)
  }

  // Exportar datos (backup)
  const exportUserData = () => {
    const dataStr = JSON.stringify(user, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'theolingo-backup.json'
    link.click()
  }

  // Función para limpiar notificaciones
  const clearNotifications = () => {
    setNotifications([])
  }

  const value = {
    user,
    updateUser,
    completeLesson,
    getCurrentLevelTitle,
    showConfetti,
    setShowConfetti,
    notifications,
    clearNotifications,
    resetProgress,
    exportUserData,
    checkDailyStreak,
    unlockNextSkill
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}