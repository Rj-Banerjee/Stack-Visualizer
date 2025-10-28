const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for history
let history = [];

// Balanced parentheses checker algorithm
function isBalanced(expression) {
  const stack = [];
  const opening = ['(', '[', '{'];
  const closing = [')', ']', '}'];
  const pairs = {
    '(': ')',
    '[': ']',
    '{': '}'
  };
  
  const steps = [];
  let index = 0;
  
  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    const bracketType = getBracketType(char);
    
    if (opening.includes(char)) {
      stack.push({ char, type: bracketType, index: i });
      steps.push({
        type: 'push',
        char,
        charIndex: i,
        bracketType,
        stackSize: stack.length,
        message: `Pushed '${char}' onto the stack`
      });
    } else if (closing.includes(char)) {
      if (stack.length === 0) {
        steps.push({
          type: 'error',
          char,
          charIndex: i,
          bracketType,
          message: `Unbalanced: No matching opening bracket for '${char}' at index ${i}`
        });
        return { balanced: false, steps, errorIndex: i };
      }
      
      const top = stack.pop();
      if (pairs[top.char] !== char) {
        steps.push({
          type: 'error',
          char,
          charIndex: i,
          expected: pairs[top.char],
          actual: char,
          message: `Mismatch: Expected '${pairs[top.char]}' but found '${char}' at index ${i}`
        });
        return { balanced: false, steps, errorIndex: i };
      }
      
      steps.push({
        type: 'pop',
        char,
        charIndex: i,
        bracketType,
        stackSize: stack.length,
        message: `Popped '${top.char}' for '${char}'`
      });
    }
  }
  
  if (stack.length > 0) {
    steps.push({
      type: 'error',
      message: `Unbalanced: ${stack.length} unclosed bracket(s) remaining`
    });
    return { balanced: false, steps };
  }
  
  steps.push({
    type: 'success',
    message: 'Expression is balanced'
  });
  
  return { balanced: true, steps };
}

// Get bracket type for coloring
function getBracketType(char) {
  if (char === '(' || char === ')') return 'parentheses';
  if (char === '[' || char === ']') return 'square';
  if (char === '{' || char === '}') return 'curly';
  return 'none';
}

// POST /api/check - Check if expression is balanced
app.post('/api/check', (req, res) => {
  const { expression } = req.body;
  
  if (!expression) {
    return res.status(400).json({ error: 'Expression is required' });
  }
  
  const result = isBalanced(expression);
  const timestamp = new Date().toISOString();
  
  // Add to history
  history.unshift({
    expression,
    balanced: result.balanced,
    timestamp,
    steps: result.steps
  });
  
  // Keep only last 10 in history
  if (history.length > 10) {
    history = history.slice(0, 10);
  }
  
  res.json({
    ...result,
    timestamp
  });
});

// GET /api/history - Get check history
app.get('/api/history', (req, res) => {
  res.json({ history });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

// Start server function
// async function startServer(port = 5000) {
//   const net = require('net');
  
//   // Helper function to check if port is available
//   const isPortAvailable = (port) => {
//     return new Promise((resolve) => {
//       const server = net.createServer();
//       server.listen(port, () => {
//         server.once('close', () => resolve(true));
//         server.close();
//       });
//       server.on('error', () => resolve(false));
//     });
//   };

//   // Try to find available port starting from specified port
//   let currentPort = port;
//   let maxAttempts = 10;
  
//   while (!await isPortAvailable(currentPort) && maxAttempts > 0) {
//     console.log(`⚠️  Port ${currentPort} is in use, trying ${currentPort + 1}...`);
//     currentPort++;
//     maxAttempts--;
//   }

//   if (maxAttempts === 0) {
//     console.error('❌ Could not find available port after 10 attempts');
//     process.exit(1);
//   }

//   // Start the server on available port
//   app.listen(currentPort, () => {
//     console.log(`✅ Server is running on http://localhost:${currentPort}`);
//   });
// }

// // Start the server
// startServer(process.env.PORT || 5000);
