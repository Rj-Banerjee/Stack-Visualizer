# 🚀 Stack Visualizer – Parentheses Checker

A beautiful, interactive full-stack web application that visualizes how a **Stack ADT** works internally while checking if an input expression has **balanced parentheses**. This project demonstrates push, pop, and peek operations through smooth animations and an intuitive UI.

## ✨ Features

### Core Features
- 🎨 **Modern UI** with Tailwind CSS
- 🌗 **Dark/Light Mode** toggle
- ⚡ **Real-time Stack Visualization** with animated blocks
- 📊 **Step-by-step Algorithm Animation** showing:
  - Push operations (adding brackets)
  - Pop operations (removing brackets)
  - Error detection (mismatched brackets)
- 💬 **Live Status Messages** throughout the process
- 📝 **History Tracking** - View last 10 checked expressions
- 🎯 **Progress Indicator** showing which character is currently being processed
- 📱 **Mobile Responsive** design

### Bonus Features
- 🔊 **Colored Brackets** by type:
  - 🟢 Green for `()` parentheses
  - 🔵 Blue for `[]` square brackets
  - 🟣 Purple for `{}` curly braces
- 🎭 **3D-style Stack Blocks** with animations
- ⚡ **Quick Example Buttons** for instant testing
- 🎨 **Gradient Design** with smooth transitions

## 🏗️ Technology Stack

### Frontend
- **React 18** with Vite
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **Axios** for API communication
- **React Icons** for icons

### Backend
- **Node.js** with **Express**
- **CORS** enabled
- **In-memory storage** for history

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Step 1: Clone/Download the Project
```bash
cd "DSA Project"
```

### Step 2: Install Dependencies

#### Install Backend Dependencies
```bash
npm install
```

#### Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### Step 3: Run the Application

#### Option A: Run Both Server and Client (Recommended)
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend app on `http://localhost:3000`

#### Option B: Run Separately

**Terminal 1 - Start Backend:**
```bash
npm run server
```

**Terminal 2 - Start Frontend:**
```bash
npm run client
```

### Step 4: Open in Browser
Open your browser and navigate to:
```
http://localhost:3000
```

## 🎮 How to Use

### Basic Usage
1. **Enter an Expression**: Type an expression with brackets (e.g., `((a+b)*c)`, `{[()]}`)
2. **Click "Check Balance"**: Watch the algorithm process the expression step by step
3. **View the Stack**: See how brackets are pushed and popped in real-time
4. **Check Results**: Get immediate feedback on whether the expression is balanced

### Features Overview

#### Stack Visualization
- **Green blocks** = Parentheses `()`
- **Blue blocks** = Square brackets `[]`
- **Purple blocks** = Curly braces `{}`
- **Glowing border** = Top element (peek)
- **Smooth animations** = Push/pop operations

#### Status Messages
The app shows detailed messages as it processes:
- `"Pushed '(' onto the stack"`
- `"Popped '(' for ')'"`
- `"Unbalanced at index 5"`
- `"✅ Expression is balanced"`

#### Quick Examples
Click any quick example button to instantly test different expressions:
- Balanced: `((a+b)*c)`, `{[()]}`, `([{}])`
- Unbalanced: `(()`, `))((`, `({[)]}`

#### History
Scroll down to see your last 10 checked expressions with timestamps.

## 🎯 Algorithm Explanation

The **Balanced Parentheses Checker** algorithm works as follows:

1. **Initialize** an empty stack
2. **Traverse** the expression character by character
3. **For each character**:
   - If it's an **opening bracket** `(`, `[`, `{` → **Push** to stack
   - If it's a **closing bracket** `)`, `]`, `}` → **Pop** from stack and check
     - If stack is empty → Unbalanced
     - If popped bracket doesn't match → Unbalanced
4. **After traversal**:
   - If stack is empty → **Balanced** ✅
   - If stack still has elements → **Unbalanced** ❌

### Example Flow

Expression: `((a+b)*c)`

```
Step 1: '(' → Push ('(', index 0)
Step 2: '(' → Push ('(', index 1)
Step 3: 'a' → Skip
Step 4: ')' → Pop '(' for ')', matches ✓
Step 5: ')' → Pop '(' for ')', matches ✓
Step 6: Stack is empty → Balanced ✓
```

## 📡 API Endpoints

### POST `/api/check`
Check if an expression has balanced parentheses.

**Request:**
```json
{
  "expression": "((a+b)*c)"
}
```

**Response:**
```json
{
  "balanced": true,
  "steps": [...],
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### GET `/api/history`
Get the last 10 checked expressions.

**Response:**
```json
{
  "history": [...]
}
```

## 🎨 Customization

### Adjust Animation Speed
Edit `frontend/src/App.jsx` line ~79:
```javascript
setTimeout(processSteps, 800); // Change 800 to your desired delay (milliseconds)
```

### Change Stack Colors
Edit `frontend/src/components/StackVisualizer.jsx`:
```javascript
const colors = {
  parentheses: '#10b981', // Green
  square: '#3b82f6',     // Blue
  curly: '#8b5cf6',      // Purple
};
```

### Add Custom Ports
Edit `backend/server.js` and `frontend/vite.config.js` for different ports.

## 🛠️ Project Structure

```
stack-visualizer/
├── backend/
│   └── server.js          # Express server with API endpoints
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── App.jsx           # Main app component
│   │   │   ├── StackVisualizer.jsx
│   │   │   ├── InputSection.jsx
│   │   │   ├── HistorySection.jsx
│   │   │   ├── DarkModeToggle.jsx
│   │   │   └── Header.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── package.json            # Root package.json
└── README.md
```

## 🐛 Troubleshooting

### Port Already in Use
The backend automatically handles port conflicts! If port 5000 is busy:
- The server will automatically try ports 5001, 5002, etc. until it finds an available one
- Check the console output to see which port the server is using
- If you need a specific port, edit `backend/.env` or pass `PORT=5001` environment variable

**Frontend Port 3000:**
- Edit `frontend/vite.config.js` to change the frontend port

### CORS Issues
Already configured in `backend/server.js`. The frontend automatically connects to the backend.

### Backend Using Different Port
If the backend starts on a different port (like 5001 or 5002):
1. Note the port number from the console: `✅ Server is running on http://localhost:5002`
2. Create `frontend/.env` file with:
   ```
   VITE_API_URL=http://localhost:5002
   ```
3. Restart the frontend dev server

### Dependencies Not Installing
Try:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contributing

This is an educational project. Feel free to:
- Add more features
- Improve animations
- Enhance the UI
- Add more algorithms

## 📄 License

MIT License - Feel free to use this project for learning and development!

## 🎓 Educational Value

This project demonstrates:
- **Stack ADT** operations (push, pop, peek)
- **Algorithm visualization** with animations
- **Full-stack development** (React + Node.js)
- **API design** and communication
- **State management** in React
- **CSS animations** with Framer Motion
- **Modern UI/UX** principles

---

**Built with ❤️ for Data Structures education**

Enjoy visualizing stacks! 🚀

