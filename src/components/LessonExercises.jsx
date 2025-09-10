import React, { useState } from 'react'
import { lessonQuestions } from '../data/skills'

const LessonExercises = ({ skill }) => {
  const [answers, setAnswers] = useState({
    fillBlanks: [],
    trueFalse: [],
    matching: []
  })
  
  const [feedback, setFeedback] = useState({
    fillBlanks: [],
    trueFalse: [],
    matching: []
  })

  const [showResults, setShowResults] = useState({
    fillBlanks: false,
    trueFalse: false,
    matching: false
  })

  // Obtener preguntas para la habilidad actual
  const questions = lessonQuestions[skill.id] || {
    fillBlanks: [],
    trueFalse: [],
    matching: []
  }

  const handleFillBlankChange = (questionIndex, blankIndex, value) => {
    const newAnswers = [...answers.fillBlanks]
    if (!newAnswers[questionIndex]) {
      newAnswers[questionIndex] = []
    }
    newAnswers[questionIndex][blankIndex] = value
    setAnswers(prev => ({ ...prev, fillBlanks: newAnswers }))
  }

  const handleTrueFalseChange = (questionIndex, value) => {
    const newAnswers = [...answers.trueFalse]
    newAnswers[questionIndex] = value
    setAnswers(prev => ({ ...prev, trueFalse: newAnswers }))
  }

  const checkFillBlanks = () => {
    const results = questions.fillBlanks.map((question, qIndex) => {
      const userAnswers = answers.fillBlanks[qIndex] || []
      const correctAnswers = question.answers
      
      const isCorrect = correctAnswers.every((correct, index) => 
        userAnswers[index]?.toLowerCase().trim() === correct.toLowerCase()
      )
      
      return {
        isCorrect,
        correctAnswers,
        userAnswers,
        verse: question.verse
      }
    })
    
    setFeedback(prev => ({ ...prev, fillBlanks: results }))
    setShowResults(prev => ({ ...prev, fillBlanks: true }))
  }

  const checkTrueFalse = () => {
    const results = questions.trueFalse.map((question, qIndex) => {
      const userAnswer = answers.trueFalse[qIndex]
      const isCorrect = userAnswer === question.answer
      
      return {
        isCorrect,
        correctAnswer: question.answer,
        explanation: question.explanation,
        userAnswer
      }
    })
    
    setFeedback(prev => ({ ...prev, trueFalse: results }))
    setShowResults(prev => ({ ...prev, trueFalse: true }))
  }

  const resetExercise = (type) => {
    setShowResults(prev => ({ ...prev, [type]: false }))
    setFeedback(prev => ({ ...prev, [type]: [] }))
    if (type === 'fillBlanks') {
      setAnswers(prev => ({ ...prev, fillBlanks: [] }))
    } else if (type === 'trueFalse') {
      setAnswers(prev => ({ ...prev, trueFalse: [] }))
    }
  }

  return (
    <div className="space-y-8">
      {/* Fill in the blanks exercises */}
      {questions.fillBlanks.map((question, qIndex) => (
        <div key={`fill-${qIndex}`} className="card">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">{qIndex + 1}</span>
            </div>
            <h3 className="font-bold text-xl text-white">Completar la frase</h3>
          </div>
          
          <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-600/30 rounded-xl p-4 mb-4">
            <p className="text-lg text-purple-200 italic">
              {question.question}
            </p>
            {question.verse && (
              <p className="text-purple-300 text-sm mt-2">— {question.verse}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
            {question.answers.map((_, blankIndex) => (
              <input
                key={blankIndex}
                type="text"
                placeholder={`Respuesta ${blankIndex + 1}`}
                value={answers.fillBlanks[qIndex]?.[blankIndex] || ''}
                onChange={(e) => handleFillBlankChange(qIndex, blankIndex, e.target.value)}
                className="input-field flex-1 min-w-32"
                disabled={showResults.fillBlanks}
              />
            ))}
          </div>

          {showResults.fillBlanks && feedback.fillBlanks[qIndex] && (
            <div className={`p-4 rounded-xl mb-4 ${
              feedback.fillBlanks[qIndex].isCorrect 
                ? 'bg-green-900/50 border border-green-700' 
                : 'bg-red-900/50 border border-red-700'
            }`}>
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">
                  {feedback.fillBlanks[qIndex].isCorrect ? '✅' : '❌'}
                </span>
                <span className="font-bold">
                  {feedback.fillBlanks[qIndex].isCorrect ? '¡Correcto!' : 'Incorrecto'}
                </span>
              </div>
              {!feedback.fillBlanks[qIndex].isCorrect && (
                <p className="text-sm">
                  Respuestas correctas: {feedback.fillBlanks[qIndex].correctAnswers.join(', ')}
                </p>
              )}
            </div>
          )}

          {!showResults.fillBlanks ? (
            <button
              type="button"
              onClick={checkFillBlanks}
              className="btn-secondary"
            >
              Verificar Respuesta
            </button>
          ) : (
            <button
              type="button"
              onClick={() => resetExercise('fillBlanks')}
              className="btn-primary"
            >
              Intentar de Nuevo
            </button>
          )}
        </div>
      ))}

      {/* True/False exercises */}
      {questions.trueFalse.map((question, qIndex) => (
        <div key={`tf-${qIndex}`} className="card">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">{questions.fillBlanks.length + qIndex + 1}</span>
            </div>
            <h3 className="font-bold text-xl text-white">Verdadero o Falso</h3>
          </div>
          
          <p className="text-gray-300 mb-6 text-lg">
            "{question.question}"
          </p>
          
          <div className="flex space-x-4 mb-4">
            <button
              type="button"
              onClick={() => handleTrueFalseChange(qIndex, false)}
              disabled={showResults.trueFalse}
              className={`flex-1 font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 border ${
                answers.trueFalse[qIndex] === false
                  ? 'bg-red-800/70 text-red-200 border-red-600'
                  : 'bg-red-900/50 hover:bg-red-800/50 text-red-300 border-red-700/50 hover:border-red-600'
              } ${showResults.trueFalse ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex flex-col items-center space-y-2">
                <span className="text-2xl">❌</span>
                <span className="font-semibold">Falso</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => handleTrueFalseChange(qIndex, true)}
              disabled={showResults.trueFalse}
              className={`flex-1 font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 border ${
                answers.trueFalse[qIndex] === true
                  ? 'bg-green-800/70 text-green-200 border-green-600'
                  : 'bg-green-900/50 hover:bg-green-800/50 text-green-300 border-green-700/50 hover:border-green-600'
              } ${showResults.trueFalse ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex flex-col items-center space-y-2">
                <span className="text-2xl">✅</span>
                <span className="font-semibold">Verdadero</span>
              </div>
            </button>
          </div>

          {showResults.trueFalse && feedback.trueFalse[qIndex] && (
            <div className={`p-4 rounded-xl mb-4 ${
              feedback.trueFalse[qIndex].isCorrect 
                ? 'bg-green-900/50 border border-green-700' 
                : 'bg-red-900/50 border border-red-700'
            }`}>
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">
                  {feedback.trueFalse[qIndex].isCorrect ? '✅' : '❌'}
                </span>
                <span className="font-bold">
                  {feedback.trueFalse[qIndex].isCorrect ? '¡Correcto!' : 'Incorrecto'}
                </span>
              </div>
              <p className="text-sm text-gray-300">
                {feedback.trueFalse[qIndex].explanation}
              </p>
            </div>
          )}

          {!showResults.trueFalse ? (
            <button
              type="button"
              onClick={checkTrueFalse}
              className="btn-secondary"
              disabled={answers.trueFalse[qIndex] === undefined}
            >
              Verificar Respuesta
            </button>
          ) : (
            <button
              type="button"
              onClick={() => resetExercise('trueFalse')}
              className="btn-primary"
            >
              Intentar de Nuevo
            </button>
          )}
        </div>
      ))}

      {/* Matching exercises */}
      {questions.matching.map((matchingSet, qIndex) => (
        <div key={`match-${qIndex}`} className="card">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">
                {questions.fillBlanks.length + questions.trueFalse.length + qIndex + 1}
              </span>
            </div>
            <h3 className="font-bold text-xl text-white">Emparejar conceptos</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-purple-300 mb-3">Conceptos:</h4>
              {matchingSet.concepts.map((concept, index) => (
                <div key={index} className="bg-purple-900/50 p-4 rounded-xl border border-purple-700/30">
                  <div className="font-bold text-purple-300">{concept}</div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-purple-300 mb-3">Definiciones:</h4>
              {matchingSet.definitions.map((definition, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-xl border border-gray-700 cursor-pointer hover:bg-gray-700/50 hover:border-purple-500 transition-all">
                  <div className="font-bold text-white text-sm">{definition}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-900/30 rounded-xl border border-blue-700/30">
            <p className="text-blue-200 text-sm">
              💡 <strong>Pista:</strong> Esta funcionalidad de arrastrar y soltar se implementará en una futura actualización. 
              Por ahora, estudia las relaciones entre conceptos y definiciones.
            </p>
          </div>
        </div>
      ))}

      {/* Mensaje si no hay preguntas */}
      {(!questions.fillBlanks.length && !questions.trueFalse.length && !questions.matching.length) && (
        <div className="card text-center">
          <div className="text-4xl mb-4">🚧</div>
          <h3 className="text-xl font-bold text-white mb-2">Contenido en Desarrollo</h3>
          <p className="text-gray-300">
            Las preguntas para esta habilidad están siendo preparadas. 
            ¡Pronto tendrás ejercicios específicos para {skill.name}!
          </p>
        </div>
      )}
    </div>
  )
}

export default LessonExercises