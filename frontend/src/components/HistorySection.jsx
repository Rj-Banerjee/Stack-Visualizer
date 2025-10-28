import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HistorySection = ({ history, darkMode }) => {
  const displayHistory = history.slice(0, 5);

  return (
    <div className={`rounded-xl p-4 md:p-6 shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 flex items-center gap-2">
        <span className="text-xl md:text-2xl">🕐</span>
        Recent History
      </h2>

      <div className="space-y-1 md:space-y-2 max-h-60 md:max-h-80 overflow-y-auto">
        <AnimatePresence>
          {displayHistory.length === 0 ? (
            <div className={`text-center py-8 text-gray-500 ${darkMode ? 'dark:text-gray-400' : ''}`}>
              No history yet. Check an expression to see results here!
            </div>
          ) : (
            displayHistory.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-2 md:p-3 rounded-lg border-l-4 ${
                    item.balanced
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                      : 'bg-red-50 dark:bg-red-900/20 border-red-500'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <div className={`font-mono text-xs md:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item.expression || '(empty)'}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className={`text-xl md:text-2xl ${item.balanced ? 'text-green-500' : 'text-red-500'}`}>
                      {item.balanced ? '✅' : '❌'}
                    </div>
                  </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HistorySection;



