import React from 'react'

const Confetti = () => {
  const confettiItems = ['✨', '🎉', '🌟', '🎊', '💫']
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => {
        const randomItem = confettiItems[Math.floor(Math.random() * confettiItems.length)]
        const randomLeft = Math.random() * 100
        const randomTop = Math.random() * 100
        const randomDelay = Math.random() * 2
        const randomDuration = 2 + Math.random() * 2
        
        return (
          <div
            key={i}
            className="absolute text-2xl animate-bounce"
            style={{
              left: `${randomLeft}%`,
              top: `${randomTop}%`,
              animationDelay: `${randomDelay}s`,
              animationDuration: `${randomDuration}s`,
            }}
          >
            {randomItem}
          </div>
        )
      })}
    </div>
  )
}

export default Confetti