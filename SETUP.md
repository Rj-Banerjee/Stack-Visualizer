# Quick Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

## 🚀 Quick Start (3 Steps)

### 1. Install Root Dependencies
```bash
cd "DSA Project"
npm install
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### 3. Start the Application
```bash
npm run dev
```

This command will start both the backend (port 5000) and frontend (port 3000) simultaneously.

## 🌐 Access the Application

Open your browser and go to:
```
http://localhost:3000
```

## 📝 What to Expect

1. You'll see a beautiful header with gradient purple/indigo colors
2. An input field to enter expressions
3. Quick example buttons to test immediately
4. A large stack visualization area on the right
5. Dark mode toggle in the top right
6. History section showing recent checks

## 🧪 Try These Examples

Click the quick example buttons or type:
- `((a+b)*c)` - Balanced ✓
- `(()` - Unbalanced ✗
- `{[()]}` - Balanced ✓
- `))((` - Unbalanced ✗

## 🛠️ Troubleshooting

### Problem: Port already in use
**Solution:** 
- **Backend**: No action needed! The server automatically finds the next available port (5001, 5002, etc.)
  - Check the console to see which port is being used
  - If you see `✅ Server is running on http://localhost:5002`, the backend is on port 5002
  - To connect frontend to a different port, create `frontend/.env` with `VITE_API_URL=http://localhost:5002`
- **Frontend**: Change the port in `frontend/vite.config.js`

### Problem: Cannot find module
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules frontend/node_modules
npm install
cd frontend && npm install && cd ..
```

### Problem: Dependencies not installing
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try with yarn instead
yarn install
cd frontend && yarn install && cd ..
```

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

**Note:** Use a modern browser for best experience with animations.

## 🎨 Features to Explore

1. **Dark Mode** - Click the sun/moon icon in top right
2. **Stack Animation** - Watch blocks animate as they're pushed/popped
3. **Status Messages** - See real-time feedback during processing
4. **History** - View your last 10 checks
5. **Colored Brackets** - Different colors for (), [], {}

## ⚙️ Advanced: Run Separately

If you want to run backend and frontend in separate terminals:

**Terminal 1:**
```bash
npm run server
```

**Terminal 2:**
```bash
npm run client
```

## ✅ Success!

If everything is working, you should see:
- Backend console: `🚀 Server running on http://localhost:5000`
- Frontend console: `Local: http://localhost:3000`
- Browser opens automatically (or go to localhost:3000)

Happy coding! 🎉

