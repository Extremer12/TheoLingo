export const skills = [
  {
    id: "trinity",
    name: "La Trinidad",
    icon: "✝️",
    color: "bg-purple-600",
    description: "Aprende sobre la doctrina fundamental de la Trinidad",
    difficulty: "principiante",
    estimatedTime: "15-20 min",
    prerequisites: [],
    lessons: 5,
  },
  {
    id: "salvation",
    name: "Salvación por Gracia",
    icon: "🙌",
    color: "bg-indigo-600",
    description:
      "Comprende la doctrina de la salvación por gracia mediante la fe",
    difficulty: "principiante",
    estimatedTime: "20-25 min",
    prerequisites: ["trinity"],
    lessons: 6,
  },
  {
    id: "oldCovenant",
    name: "Antiguo Pacto",
    icon: "📜",
    color: "bg-violet-600",
    description: "Estudia los pactos del Antiguo Testamento",
    difficulty: "intermedio",
    estimatedTime: "25-30 min",
    prerequisites: ["salvation"],
    lessons: 7,
  },
  {
    id: "newBirth",
    name: "Nuevo Nacimiento",
    icon: "🐣",
    color: "bg-fuchsia-600",
    description: "Explora la doctrina de la regeneración",
    difficulty: "intermedio",
    estimatedTime: "20-25 min",
    prerequisites: ["salvation"],
    lessons: 5,
  },
  {
    id: "scripture",
    name: "Autoridad de la Escritura",
    icon: "📖",
    color: "bg-purple-700",
    description: "Comprende la autoridad e inspiración de las Escrituras",
    difficulty: "intermedio",
    estimatedTime: "30-35 min",
    prerequisites: ["oldCovenant", "newBirth"],
    lessons: 8,
  },
  {
    id: "sacraments",
    name: "Los Sacramentos",
    icon: "🍷",
    color: "bg-indigo-700",
    description: "Aprende sobre el bautismo y la Santa Cena",
    difficulty: "intermedio",
    estimatedTime: "25-30 min",
    prerequisites: ["scripture"],
    lessons: 6,
  },
  {
    id: "eschatology",
    name: "Escatología",
    icon: "⏳",
    color: "bg-violet-700",
    description: "Estudia las doctrinas de los últimos tiempos",
    difficulty: "avanzado",
    estimatedTime: "35-40 min",
    prerequisites: ["sacraments"],
    lessons: 9,
  },
  {
    id: "paul",
    name: "Vida de Pablo",
    icon: "👨‍🏫",
    color: "bg-fuchsia-700",
    description: "Conoce la vida y ministerio del apóstol Pablo",
    difficulty: "intermedio",
    estimatedTime: "30-35 min",
    prerequisites: ["sacraments"],
    lessons: 8,
  },
  {
    id: "grace",
    name: "Doctrinas de Gracia",
    icon: "🌹",
    color: "bg-purple-800",
    description: "Profundiza en las cinco doctrinas de gracia (TULIP)",
    difficulty: "avanzado",
    estimatedTime: "40-45 min",
    prerequisites: ["eschatology", "paul"],
    lessons: 10,
  },
  {
    id: "hermeneutics",
    name: "Hermenéutica Bíblica",
    icon: "🔍",
    color: "bg-indigo-800",
    description: "Aprende principios de interpretación bíblica",
    difficulty: "avanzado",
    estimatedTime: "45-50 min",
    prerequisites: ["grace"],
    lessons: 12,
  },
];

// Base de datos de preguntas por habilidad
export const lessonQuestions = {
  trinity: {
    fillBlanks: [
      {
        question: "La Trinidad consiste en el ___, el ___ y el ___.",
        answers: ["Padre", "Hijo", "Espíritu Santo"],
        verse: "Mateo 28:19",
      },
      {
        question: "Jesús es ___ Dios y ___ hombre.",
        answers: ["verdadero", "verdadero"],
        verse: "Juan 1:1, 14",
      },
    ],
    trueFalse: [
      {
        question: "La Trinidad significa que hay tres dioses.",
        answer: false,
        explanation: "La Trinidad es un solo Dios en tres personas distintas.",
      },
      {
        question: "Jesús es igual al Padre en esencia divina.",
        answer: true,
        explanation: "Jesús es completamente Dios, igual al Padre.",
      },
    ],
    matching: [
      {
        concepts: ["Padre", "Hijo", "Espíritu Santo"],
        definitions: [
          "Primera persona de la Trinidad",
          "Segunda persona, se encarnó",
          "Tercera persona, consolador",
        ],
      },
    ],
  },
  salvation: {
    fillBlanks: [
      {
        question: "Somos salvos por ___, no por ___.",
        answers: ["gracia", "obras"],
        verse: "Efesios 2:8-9",
      },
      {
        question: "La ___ es un don de Dios, no viene de ___.",
        answers: ["salvación", "nosotros"],
        verse: "Efesios 2:8",
      },
    ],
    trueFalse: [
      {
        question: "La salvación se obtiene por buenas obras.",
        answer: false,
        explanation: "La salvación es por gracia mediante la fe, no por obras.",
      },
      {
        question: "La fe es un regalo de Dios.",
        answer: true,
        explanation:
          "Efesios 2:8 dice que la salvación y la fe son dones de Dios.",
      },
    ],
    matching: [
      {
        concepts: ["Justificación", "Santificación", "Regeneración"],
        definitions: [
          "Declaración legal de justicia ante Dios",
          "Proceso de ser hecho santo",
          "Nuevo nacimiento espiritual",
        ],
      },
    ],
  },
  oldCovenant: {
    fillBlanks: [
      {
        question:
          "Dios hizo un pacto con ___ prometiendo bendecir a todas las naciones.",
        answers: ["Abraham"],
        verse: "Génesis 12:3",
      },
    ],
    trueFalse: [
      {
        question: "El pacto con Abraham fue condicional.",
        answer: false,
        explanation:
          "El pacto abrahámico fue incondicional, basado en la promesa de Dios.",
      },
    ],
    matching: [
      {
        concepts: ["Pacto Abrahámico", "Pacto Mosaico", "Pacto Davídico"],
        definitions: [
          "Promesa de bendición a las naciones",
          "Ley dada en el Monte Sinaí",
          "Promesa de un reino eterno",
        ],
      },
    ],
  },
};

// Definición de insignias
export const badges = [
  {
    id: "first-lesson",
    name: "Primer Paso",
    description: "Completa tu primera lección",
    icon: "🎯",
    color: "from-blue-900/50 to-cyan-900/50",
    requirement: "completedLessons >= 1",
  },
  {
    id: "consistent",
    name: "Discípulo Consistente",
    description: "7 días consecutivos de estudio",
    icon: "🔥",
    color: "from-purple-900/50 to-indigo-900/50",
    requirement: "streak >= 7",
  },
  {
    id: "sola-scriptura",
    name: "Maestro de la Sola Scriptura",
    description: "Domina la autoridad bíblica",
    icon: "📜",
    color: "from-green-900/50 to-teal-900/50",
    requirement: "skillProgress.scripture >= 100",
  },
  {
    id: "dedicated",
    name: "Teólogo Dedicado",
    description: "Completa 50 lecciones",
    icon: "📚",
    color: "from-amber-900/50 to-orange-900/50",
    requirement: "completedLessons >= 50",
  },
  {
    id: "calvinist",
    name: "Calvinista Certificado",
    description: "Domina las doctrinas de gracia",
    icon: "🌹",
    color: "from-red-900/50 to-pink-900/50",
    requirement: "skillProgress.grace >= 100",
  },
  {
    id: "paul-friend",
    name: "Amigo de Pablo",
    description: "Completa los estudios paulinos",
    icon: "👨‍🏫",
    color: "from-yellow-900/50 to-orange-900/50",
    requirement: "skillProgress.paul >= 100",
  },
];

export const denominations = [
  "Bautista",
  "Metodista",
  "Pentecostal",
  "Reformada",
  "No especificar",
];

export const levels = ["Principiante", "Intermedio", "Avanzado"];
