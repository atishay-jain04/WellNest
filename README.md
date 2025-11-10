# 🌿 Wellnest - Digital Wellness Application

A digital wellness web application designed to help users improve focus, mindfulness, and productivity.

## Phase 1 - Completed ✅

This is the Phase 1 implementation of Wellnest, featuring:

- ✅ React project initialized with Vite
- ✅ TailwindCSS configured with Poppins and Inter fonts
- ✅ Sidebar navigation with 4 tabs (Zen Mode, Focus Timer, Chatbot, To-Do)
- ✅ State-based tab switching with smooth animations
- ✅ Placeholder pages for all 4 modules
- ✅ Responsive design optimized for laptop view

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Fonts**: Poppins (primary), Inter (secondary)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd wellnest-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## Project Structure

```
wellnest-app/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx          # Fixed sidebar with navigation tabs
│   │   ├── ZenMode.jsx           # Zen Mode placeholder
│   │   ├── FocusTimer.jsx        # Focus Timer placeholder
│   │   ├── WellnessChatbot.jsx   # Chatbot placeholder
│   │   └── ToDoList.jsx          # To-Do List placeholder
│   ├── App.jsx                   # Main app component with state management
│   ├── index.css                 # Tailwind CSS imports
│   └── main.jsx                  # App entry point
├── tailwind.config.js            # Tailwind configuration
├── postcss.config.js             # PostCSS configuration
└── package.json
```

## Features

### Sidebar Navigation
- Fixed sidebar taking 20% of the screen width
- 4 navigation tabs with icons:
  - 🧘‍♀️ Zen Mode
  - ⏲ Focus Timer
  - 💬 Wellness Chatbot
  - 📝 To-Do List
- Active tab highlighting with accent color (#FF3B30)
- Smooth hover effects and transitions

### Main Content Area
- Takes 80% of the screen width
- Clean white background with rounded corners (2xl)
- Smooth transition animations when switching tabs
- Placeholder content for each module

## Design Guidelines

- **Color Palette**: Calm & minimal (white, gray, soft gradients)
- **Accent Color**: #FF3B30 (red) for active states
- **Font**: Poppins (primary) / Inter (secondary)
- **Corner Radius**: 2xl (rounded-3xl) for cards and buttons
- **Animations**: Smooth fade-in/out transitions (300ms duration)

## Next Phases

### Phase 2: Zen Mode Module
- Implement 4 unique theme modes
- Add fullscreen functionality
- Integrate ambient sounds
- Add play/pause and mute controls

### Phase 3: Timer & Chatbot
- Build Pomodoro timer with presets
- Create interactive chatbot interface
- Implement rule-based responses

### Phase 4: To-Do & Final Integration
- Add CRUD functionality for tasks
- Implement progress tracking
- Final styling polish and testing

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## License

© 2025 Wellnest - A Digital Wellness Application
