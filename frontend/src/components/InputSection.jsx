import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InputSection = ({ onCheck, onReset, isProcessing, expression, setExpression, darkMode }) => {
  const [localExpression, setLocalExpression] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localExpression.trim()) {
      setExpression(localExpression);
      onCheck(localExpression);
    }
  };

  const handleReset = () => {
    setLocalExpression('');
    setExpression('');
    onReset();
  };

  const quickExamples = [
    '((a+b)*c)',
    '(()',
    '{[()]}',
    '([{}])',
    '))((',
    '({[)]}',
  ];

  const insertExample = (example) => {
    setLocalExpression(example);
    if (isProcessing) return;
    setTimeout(() => {
      setExpression(example);
      onCheck(example);
    }, 100);
  };

  return (
    <div className={`rounded-xl p-6 shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <span className="text-3xl">⌨️</span>
        Enter Expression
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={localExpression}
          onChange={(e) => setLocalExpression(e.target.value)}
          placeholder="e.g., ((a+b)*c)"
          disabled={isProcessing}
          className={`w-full px-4 py-3 rounded-lg text-lg font-mono focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
            darkMode
              ? 'bg-gray-700 text-white border-gray-600'
              : 'bg-gray-100 text-gray-900 border-gray-300'
          }`}
        />

        <div className="flex gap-3">
          <motion.button
            type="submit"
            disabled={isProcessing || !localExpression.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isProcessing ? '⏳ Processing...' : '✓ Check Balance'}
          </motion.button>

          <motion.button
            type="button"
            onClick={handleReset}
            disabled={isProcessing}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            ↻ Reset
          </motion.button>
        </div>
      </form>

      {/* Quick Examples */}
      <div className="mt-6">
        <div className="text-sm font-semibold mb-3 text-gray-600 dark:text-gray-300">
          Quick Examples:
        </div>
        <div className="flex flex-wrap gap-2">
          {quickExamples.map((example, index) => (
            <motion.button
              key={index}
              onClick={() => insertExample(example)}
              disabled={isProcessing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1.5 rounded text-sm font-mono transition-all ${
                darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {example}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-blue-900/30 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
        <div className="text-sm text-blue-800 dark:text-blue-300">
          <strong>💡 Tip:</strong> Enter an expression with parentheses, square brackets, or curly braces. 
          The stack will visualize how the balanced parentheses algorithm works step by step.
        </div>
      </div>
    </div>
  );
};

export default InputSection;



