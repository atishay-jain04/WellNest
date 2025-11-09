🌿 Product Requirements Document (PRD) — Wellnest
🧘‍♀️ 1. Overview

Product Name: Wellnest
Description:
Wellnest is a digital wellness web application designed to help users improve focus, mindfulness, and productivity. It includes four main modules — Zen Mode, Focus Timer, Wellness Chatbot, and To-Do Manager — each contributing to mental well-being and work-life balance.

Tech Stack:

Frontend: ReactJS (with functional components)

Styling: Tailwind CSS

Scripting: JavaScript (ES6+)

Storage: Session Storage (for temporary state persistence)

Sound Management: HTML Audio API / Howler.js (optional)

Animation: Framer Motion (optional for smooth transitions)

🧩 2. Key Modules
🔹 1. Zen Mode

Objective: Encourage users to take mindful breaks by activating focus/relaxation sessions with calming visuals and sounds.

Features:

Four unique theme modes, each with its own:

Background image

Ambient sound

Caption (“Phone Down, Let’s enjoy life”)

Start and stop buttons for activating Zen Mode.

Optional: Timer for session duration.

Mute/Unmute background sound toggle.

UI Reference:
\zenMode.png
🔹 2. Focus Timer (Pomodoro)

Objective: Help users maintain productivity through the Pomodoro technique.

Features:

Timer presets: Pomodoro (25 min), Short Break (5 min), Long Break (15 min)

Functionalities: Start / Pause / Reset

Progress ring animation (optional)

Background image resembling cherry blossom or serene landscape.

Optional ambient sound during focus.

UI Reference:
\timer.png

🔹 3. Wellness Chatbot

Objective: Provide users with mindfulness and wellness tips through an interactive chat interface.

Features:

Simple and clean chatbot interface.

User and bot message bubbles.

Basic natural language handling (rule-based or keyword-based).

Sample queries:

“How do I reduce stress?”

“Give me a relaxation exercise.”

Responses include motivational quotes, breathing tips, or mindfulness reminders.

Option to clear chat history (stored in session storage).

UI Reference:
\chatbot.png

🔹 4. To-Do List

Objective: Help users organize their tasks and reduce mental clutter.

Features:

Add, edit, delete, and mark tasks as complete.

Task filtering (All / Completed / Pending).

Progress bar showing completion percentage.

Persist data in session storage (resets after browser session ends).

Clean, minimal UI to match overall design language.

UI Reference:
(Add your image path here →)
[Insert path for to-do list reference image]

🧭 3. Functional Requirements
Feature	Description	Priority
Sidebar Navigation	Fixed sidebar with 4 tabs (Zen, Timer, Chatbot, To-Do)	High
Tab Switching	Smooth animation when changing tabs	Medium
Zen Themes	4 selectable themes with unique background and sound	High
Pomodoro Timer	Fully functional timer with presets	High
Chatbot Responses	Predefined responses to wellness-related questions	Medium
To-Do Manager	CRUD operations with session persistence	High
Sound Control	Mute/unmute ambient audio	Medium
Responsive Design	Optimized for laptop view	High
🎨 4. Design Guidelines

Primary Color Palette: Calm & minimal — white, gray, soft gradients

Accent Color: #FF3B30 (for active sidebar item)

Font: “Poppins” or “Inter” for clean readability

Corner Radius: 2xl for cards and buttons

Animations: Smooth fade-in/out transitions

Layout:

Sidebar (20% width)

Main Content (80% width)

⚙️ 5. Technical Implementation Plan
🧱 Phase 1: Setup & Layout

Goal: Establish project structure and layout foundation.
Tasks:

Initialize React project (create-react-app or Vite).

Install TailwindCSS and configure theme.

Create sidebar layout with 4 navigation tabs.

Implement routing or state-based tab switching.
Deliverables:

Working sidebar navigation.

Placeholder pages for all 4 modules.

🌅 Phase 2: Zen Mode Module

Goal: Implement the Zen Mode functionality.
Tasks:

Design 4 theme cards with image & name.

Add functionality to activate fullscreen mode with background + sound.

Add play/pause and sound toggle.

Manage state with session storage (to remember last theme selected).
Deliverables:

Fully functional Zen Mode with theme selection and playback.

⏲ Phase 3: Timer & Chatbot

Goal: Implement Focus Timer and Chatbot interfaces.
Tasks (Timer):

Build Pomodoro timer with preset durations.

Add session storage for timer state.

Integrate start, pause, reset logic.
Tasks (Chatbot):

Create chat UI.

Implement predefined rule-based responses.

Enable chat history and clear chat functionality.
Deliverables:

Functional Timer and Chatbot modules.

📝 Phase 4: To-Do & Final Integration

Goal: Implement To-Do functionality and integrate all modules cohesively.
Tasks:

Build CRUD To-Do interface with progress bar.

Use session storage for persistence.

Add animations and final styling polish.

Conduct responsive UI testing (laptop view).

Final debugging and optimization.
Deliverables:

Fully integrated and styled Wellnest web app.

🧠 6. Future Enhancements (Optional)

Add user authentication (Firebase / Appwrite).

Add analytics for time spent in Zen Mode.

Expand chatbot using Gemini or OpenAI APIs.

Allow user-customized themes and music uploads.

🗂 7. Deliverables

Complete ReactJS project folder

Documented source code with comments

UI screenshots for all modules

Deployment-ready build