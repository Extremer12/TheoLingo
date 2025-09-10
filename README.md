# TheoLingo 📖

Una aplicación de aprendizaje teológico interactivo inspirada en Duolingo, diseñada para ayudar a los estudiantes a aprender teología de manera divertida y efectiva.

## 🌟 Características Principales

### ✅ **Sistema de Persistencia Completo**

- **localStorage**: Todo el progreso se guarda automáticamente
- **Racha Diaria**: Sistema real de racha con verificación de fechas
- **Progreso Granular**: Cada habilidad tiene progreso individual (0-100%)
- **Historial de Lecciones**: Registro completo de actividad

### ✅ **Sistema de Progreso Dinámico**

- **Desbloqueo Secuencial**: Las habilidades se desbloquean al completar prerequisitos
- **Sistema de XP y Niveles**: Progresión realista con títulos teológicos
- **Insignias Automáticas**: Se otorgan basadas en logros específicos
- **Notificaciones**: Alertas visuales para nuevos logros

### ✅ **Contenido Educativo Real**

- **Base de Datos de Preguntas**: Preguntas teológicas auténticas por habilidad
- **Verificación de Respuestas**: Lógica real de corrección con feedback
- **Múltiples Tipos de Ejercicios**: Completar frases, verdadero/falso, emparejamiento
- **Versículos Bíblicos**: Cada lección incluye referencias escriturales

### ✅ **Interfaz Avanzada**

- **Dashboard Interactivo**: Árbol de habilidades con progreso visual
- **Perfil Detallado**: Estadísticas avanzadas y gráficos de progreso
- **Sistema de Notificaciones**: Alertas elegantes para logros
- **Herramientas de Desarrollo**: Panel de testing para desarrollo

## 🛠️ Tecnologías Utilizadas

- **React 18** - Framework de interfaz de usuario
- **React Router** - Navegación entre páginas
- **Tailwind CSS** - Estilos y diseño responsivo
- **Vite** - Herramienta de desarrollo rápida
- **Context API** - Gestión de estado global

## 🚀 Deployment a GitHub Pages

### Configuración Automática

Este proyecto está configurado para deployment automático a GitHub Pages usando GitHub Actions.

### Pasos para Deployment:

1. **Crear Repositorio en GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/[tu-usuario]/TheoLingo.git
   git push -u origin main
   ```

2. **Configurar GitHub Pages**
   - Ve a Settings > Pages en tu repositorio
   - Selecciona "GitHub Actions" como source
   - El workflow se ejecutará automáticamente

3. **Actualizar URL en package.json**
   ```json
   "homepage": "https://[tu-usuario].github.io/TheoLingo"
   ```

4. **Acceder a la Aplicación**
   - URL: `https://[tu-usuario].github.io/TheoLingo`
   - El deployment se actualiza automáticamente con cada push a main

### Scripts Disponibles:

```bash
npm run build    # Construir para producción
npm run preview  # Vista previa local del build
```

### Características del Deployment:

- ✅ **Deployment Automático**: Se actualiza con cada push
- ✅ **Optimización**: Build optimizado para producción
- ✅ **Compatibilidad**: Configurado para GitHub Pages
- ✅ **Persistencia**: localStorage funciona en producción

## 📁 Estructura del Proyecto

```
theolingo/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── BadgesSection.jsx
│   │   ├── Confetti.jsx
│   │   ├── Header.jsx
│   │   ├── LessonExercises.jsx
│   │   ├── SkillsTree.jsx
│   │   └── WelcomeBanner.jsx
│   ├── context/            # Contextos de React
│   │   └── UserContext.jsx
│   ├── data/               # Datos estáticos
│   │   └── skills.js
│   ├── pages/              # Páginas principales
│   │   ├── Dashboard.jsx
│   │   ├── LessonScreen.jsx
│   │   ├── ProfileScreen.jsx
│   │   └── WelcomeScreen.jsx
│   ├── App.jsx             # Componente principal
│   ├── index.css           # Estilos globales
│   └── main.jsx            # Punto de entrada
├── index.html              # HTML base
├── package.json            # Dependencias
├── tailwind.config.js      # Configuración de Tailwind
├── vite.config.js          # Configuración de Vite
└── README.md               # Este archivo
```

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Instalar dependencias**:

   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo**:

   ```bash
   npm run dev
   ```

3. **Abrir en el navegador**:
   - La aplicación se abrirá automáticamente en `http://localhost:3000`

### Comandos Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción

## 🎮 Cómo Usar la Aplicación

1. **Pantalla de Bienvenida**:

   - Selecciona tu nivel de conocimiento teológico
   - Opcionalmente, elige tu denominación
   - Decide si jugar como invitado o crear cuenta

2. **Dashboard Principal**:

   - Explora el árbol de habilidades teológicas
   - Haz clic en las habilidades desbloqueadas para acceder a lecciones
   - Revisa tu progreso y estadísticas

3. **Lecciones**:

   - Completa ejercicios interactivos
   - Gana XP y sube de nivel
   - Desbloquea nuevas habilidades

4. **Perfil**:
   - Revisa tus estadísticas detalladas
   - Ve tus insignias obtenidas
   - Ajusta tus preferencias de estudio

## 🎯 Habilidades Teológicas Incluidas

- ✝️ **La Trinidad** - Doctrina fundamental cristiana
- 🙌 **Salvación por Gracia** - Soteriología básica
- 📜 **Antiguo Pacto** - Teología del AT
- 🐣 **Nuevo Nacimiento** - Regeneración
- 📖 **Autoridad de la Escritura** - Bibliología
- 🍷 **Los Sacramentos** - Bautismo y Santa Cena
- ⏳ **Escatología** - Doctrinas de los últimos tiempos
- 👨‍🏫 **Vida de Pablo** - Estudios paulinos
- 🌹 **Doctrinas de Gracia** - TULIP
- 🔍 **Hermenéutica Bíblica** - Interpretación bíblica

## 🏆 Sistema de Progreso

### Niveles de Usuario

- **Catecúmeno** (Nivel 1-4)
- **Creyente** (Nivel 5-9)
- **Maestro de la Palabra** (Nivel 10-19)
- **Teólogo Reformado** (Nivel 20+)

### Insignias Disponibles

- 👨‍🏫 **Amigo de Pablo** - Completa estudios paulinos
- 🌹 **Calvinista Certificado** - Domina las doctrinas de gracia
- 📜 **Maestro de la Sola Scriptura** - Autoridad bíblica
- 🔥 **Discípulo Consistente** - Racha de estudio

## 🎨 Personalización

El proyecto utiliza Tailwind CSS con un tema personalizado que incluye:

- Gradientes púrpura y rosa
- Efectos de vidrio esmerilado (backdrop-blur)
- Animaciones suaves
- Diseño responsivo

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

Para preguntas o sugerencias sobre TheoLingo, no dudes en contactarnos.

---

_"Crece en la gracia y el conocimiento de nuestro Señor y Salvador Jesucristo" - 2 Pedro 3:18_
