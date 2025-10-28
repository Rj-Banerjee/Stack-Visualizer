import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StackVisualizer = ({ stack, currentCharIndex, expression, isProcessing, darkMode }) => {
  const getBracketColor = (type) => {
    const colors = {
      parentheses: darkMode ? '#10b981' : '#059669',
      square: darkMode ? '#3b82f6' : '#2563eb',
      curly: darkMode ? '#8b5cf6' : '#7c3aed',
      none: darkMode ? '#6b7280' : '#4b5563',
    };
    return colors[type] || colors.none;
  };

  return (
    <div className={`rounded-xl p-6 shadow-2xl h-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="text-3xl">📚</span>
        Stack Visualization
      </h2>

      {/* Expression Display with Pointer */}
      {expression && (
        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <div className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-300">
            Processing Expression:
          </div>
          <div className="font-mono text-2xl flex flex-wrap gap-1">
            {expression.split('').map((char, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded transition-all duration-300 ${
                  index === currentCharIndex
                    ? isProcessing
                      ? 'bg-yellow-400 text-gray-900 scale-110 font-bold animate-pulse'
                      : ''
                    : ''
                } ${['(', ')', '[', ']', '{', '}'].includes(char) ? 'font-bold' : ''}`}
                style={{
                  color: ['(', ')', '[', ']', '{', '}'].includes(char)
                    ? getBracketColor(
                        char === '(' || char === ')' ? 'parentheses' :
                        char === '[' || char === ']' ? 'square' : 'curly'
                      )
                    : undefined
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stack Container */}
      <div className="space-y-3">
        <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4">
          Stack Size: {stack.length}
        </div>
        
        {stack.length === 0 ? (
          <div className={`h-64 rounded-lg flex items-center justify-center transition-all duration-300 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <div className="text-center">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-gray-500 dark:text-gray-400">Stack is empty</p>
            </div>
          </div>
        ) : (
          <div 
            className="rounded-lg p-4 bg-gray-50 dark:bg-gray-900 transition-all duration-500 overflow-hidden"
            style={{
              minHeight: '256px',
              height: `${Math.max(256, stack.length * 90 + 32)}px`, // 90px per item + 32px padding
              maxHeight: '600px'
            }}
          >
            <div className="h-full overflow-y-auto pr-2">
              <div className="flex flex-col-reverse gap-2">
                <AnimatePresence>
                  {stack.map((item, index) => (
                    <motion.div
                      key={`${item.char}-${item.index}`}
                      initial={{ opacity: 0, y: -20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -100, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className={`relative ${
                        index === stack.length - 1
                          ? 'ring-4 ring-purple-500 dark:ring-purple-400 shadow-lg scale-105'
                          : ''
                      }`}
                      style={{
                        backgroundColor: getBracketColor(item.type),
                        boxShadow: index === stack.length - 1
                          ? `0 0 20px ${getBracketColor(item.type)}`
                          : '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    >
                      <div className="p-4 rounded-lg text-white text-center font-bold transform hover:scale-105 transition-transform duration-200">
                        <div className="text-3xl">{item.char}</div>
                        <div className="text-xs mt-1 opacity-90">Index {item.index}</div>
                        {index === stack.length - 1 && (
                          <div className="text-xs mt-1 font-semibold animate-pulse">
                            TOP
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <div className="text-sm font-semibold mb-2">Legend:</div>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span>( ) - Parentheses</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-blue-500"></div>
            <span>[ ] - Square</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-purple-500"></div>
            <span>{'{ }'} - Curly</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackVisualizer;



