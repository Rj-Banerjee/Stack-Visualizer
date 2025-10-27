# 📊 Stack Visualizer - Project Summary

## 🎯 Project Overview

**Stack Visualizer – Parentheses Checker** is a full-stack web application that demonstrates the **Stack ADT** operations (push, pop, peek) through an interactive, animated visualization of the **Balanced Parentheses** algorithm.

## 🏗️ Architecture

### Technology Stack

#### Frontend
- **Framework**: React 18.2
- **Build Tool**: Vite 5.0
- **Styling**: Tailwind CSS 3.3
- **Animations**: Framer Motion 10.16
- **HTTP Client**: Axios 1.6
- **Icons**: React Icons 4.11

#### Backend
- **Runtime**: Node.js
- **Framework**: Express 4.18
- **CORS**: cors 2.8

## 📁 Project Structure

```
DSA Project/
├── backend/
│   └── server.js                 # Express API server
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── App.jsx           # Main application logic
│   │   │   ├── StackVisualizer.jsx   # Animated stack component
│   │   │   ├── InputSection.jsx      # Expression input UI
│   │   │   ├── HistorySection.jsx    # Recent checks display
│   │   │   ├── DarkModeToggle.jsx    # Theme toggle
│   │   │   └── Header.jsx            # Top header bar
│   │   ├── main.jsx              # React entry point
│   │   └── index.css             # Global styles
│   ├── index.html                # HTML template
│   ├── package.json              # Frontend dependencies
│   ├── vite.config.js            # Vite configuration
│   ├── tailwind.config.js        # Tailwind configuration
│   └── postcss.config.js         # PostCSS configuration
├── package.json                  # Root package with scripts
├── README.md                     # Main documentation
├── SETUP.md                      # Quick setup guide
├── CHANGELOG.md                  # Version history
└── PROJECT_SUMMARY.md            # This file
```

## 🎨 Key Features

### 1. Interactive Stack Visualization
- **3D-style stack blocks** with smooth animations
- **Color-coded brackets**:
  - 🟢 Green for `()` parentheses
  - 🔵 Blue for `[]` square brackets
  - 🟣 Purple for `{}` curly braces
- **Top element highlighting** with glow effect
- **Empty stack state** with animated message

### 2. Real-time Algorithm Animation
- **Step-by-step processing** with configurable delays
- **Character-by-character visualization** with progress indicator
- **Status messages** for each operation:
  - Push operations
  - Pop operations
  - Error detection
  - Success/failure results

### 3. User Interface
- **Modern design** with gradient backgrounds
- **Dark/Light mode** toggle with persistence
- **Quick example buttons** for instant testing
- **History tracking** for last 10 checks
- **Responsive layout** for mobile devices

### 4. API Endpoints

#### POST `/api/check`
- Input: Expression string
- Output: Balanced status, steps array, timestamp
- Stores result in history (max 10 items)

#### GET `/api/history`
- Output: Array of recent checks with timestamps
- Returns last 10 checked expressions

## 🧮 Algorithm Implementation

### Balanced Parentheses Algorithm

```javascript
function isBalanced(expression) {
  stack = []
  opening = ['(', '[', '{']
  closing = [')', ']', '}']
  
  for each character in expression:
    if opening bracket:
      push to stack
    if closing bracket:
      if stack empty → error
      pop from stack
      if doesn't match → error
  
  if stack empty:
    return balanced
  else:
    return unbalanced
```

### Visualization Steps
1. Iterate through expression character by character
2. Highlight current character being processed
3. Show push/pop animations in real-time
4. Display status messages for each operation
5. Show final result (balanced/unbalanced)

## 🎯 Component Responsibilities

### App.jsx
- State management (stack, steps, history, etc.)
- API communication
- Animation orchestration
- Dark mode persistence

### StackVisualizer.jsx
- Visual representation of stack
- Framer Motion animations
- Character highlighting
- Legend display

### InputSection.jsx
- Expression input handling
- Quick example buttons
- Form submission
- Reset functionality

### HistorySection.jsx
- Display recent checks
- Timestamp formatting
- Animated entry/exit

### DarkModeToggle.jsx
- Theme switching
- Icon animation
- State persistence

### Header.jsx
- Page title and description
- Feature badges
- Branding

## 🚀 Getting Started

### Installation
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..
```

### Running
```bash
# Run both server and client
npm run dev
```

### Access
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📊 Performance Considerations

- **Animation Timing**: 800ms delay between steps (configurable)
- **History Limit**: 10 items in memory
- **CORS**: Enabled for local development
- **Dark Mode**: Persisted in localStorage

## 🎓 Educational Value

This project demonstrates:
1. **Stack ADT** operations
2. **Algorithm visualization**
3. **Full-stack development**
4. **Modern React patterns** (hooks, state management)
5. **API design and communication**
6. **CSS animations** with Framer Motion
7. **UI/UX best practices**

## 🛠️ Customization Options

### Change Animation Speed
Edit `App.jsx` line 79:
```javascript
setTimeout(processSteps, 800); // Adjust milliseconds
```

### Change Colors
Edit `StackVisualizer.jsx`:
```javascript
const colors = {
  parentheses: '#10b981',
  square: '#3b82f6',
  curly: '#8b5cf6',
};
```

### Change Ports
Edit `server.js` and `vite.config.js`

## 📈 Future Enhancements

- Sound effects on push/pop
- Manual step control (next/previous)
- Export as video/GIF
- More bracket types
- Multi-algorithm comparison
- User authentication
- Database persistence
- Sharing functionality

## 🐛 Known Issues

None currently reported. Issues can be reported via GitHub issues.

## 📄 License

MIT License - See LICENSE file for details.

---

**Built with ❤️ for Data Structures education**



