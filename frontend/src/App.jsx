import React, { useState, useEffect } from 'react';
import StackVisualizer from './components/StackVisualizer';
import InputSection from './components/InputSection';
import HistorySection from './components/HistorySection';
import DarkModeToggle from './components/DarkModeToggle';
import Header from './components/Header';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [stack, setStack] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState([]);
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);
  const [currentCharIndex, setCurrentCharIndex] = useState(-1);
  const [apiBaseUrl, setApiBaseUrl] = useState('http://localhost:5000');

  useEffect(() => {
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    // Save dark mode preference
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Find the backend server by trying different ports
  useEffect(() => {
    const findBackendPort = async () => {
      const axios = (await import('axios')).default;
      const ports = [5000, 5001, 5002, 5003, 5004, 5005, 5006, 5007, 5008, 5009];
      
      for (const port of ports) {
        try {
          const response = await axios.get(`http://localhost:${port}/api/history`, {
            timeout: 500
          });
          setApiBaseUrl(`http://localhost:${port}`);
          console.log(`✅ Found backend on port ${port}`);
          return;
        } catch (error) {
          // Continue trying next port
        }
      }
      console.error('❌ Could not find backend on any port');
    };
    
    findBackendPort();
  }, []);

  const handleCheck = async (expr) => {
    if (!expr.trim()) return;
    
    setIsProcessing(true);
    setExpression(expr);
    setStack([]);
    setSteps([]);
    setCurrentStep(0);
    setCurrentCharIndex(-1);
    setResult(null);

    try {
      const axios = (await import('axios')).default;
      const response = await axios.post(
        `${apiBaseUrl}/api/check`,
        {
          expression: expr
        }
      );

      const { steps: apiSteps, balanced } = response.data;
      
      setSteps(apiSteps);
      
      // Animate through the steps
      let stepIndex = 0;
      const processSteps = () => {
        if (stepIndex < apiSteps.length) {
          const step = apiSteps[stepIndex];
          
          if (step.type === 'push') {
            setStack(prev => [...prev, {
              char: step.char,
              type: step.bracketType,
              index: step.charIndex
            }]);
          } else if (step.type === 'pop') {
            setStack(prev => prev.slice(0, -1));
          }
          
          setCurrentCharIndex(step.charIndex !== undefined ? step.charIndex : -1);
          setCurrentStep(stepIndex);
          
          stepIndex++;
          
          if (stepIndex < apiSteps.length) {
            setTimeout(processSteps, 800); // Adjust speed here
          } else {
            setResult(balanced);
            setIsProcessing(false);
            fetchHistory();
          }
        }
      };
      
      setTimeout(processSteps, 300);
      
    } catch (error) {
      console.error('Error checking expression:', error);
      setIsProcessing(false);
      alert(`Failed to connect to backend. Error: ${error.message}`);
    }
  };

  const handleReset = () => {
    setStack([]);
    setSteps([]);
    setCurrentStep(0);
    setCurrentCharIndex(-1);
    setResult(null);
    setExpression('');
    setIsProcessing(false);
  };

  const fetchHistory = async () => {
    try {
      const axios = (await import('axios')).default;
      const response = await axios.get(`${apiBaseUrl}/api/history`);
      setHistory(response.data.history || []);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  useEffect(() => {
    if (apiBaseUrl && apiBaseUrl !== 'http://localhost:5000') {
      fetchHistory();
    }
  }, [apiBaseUrl]);

  const getCurrentMessage = () => {
    if (steps.length === 0) return '';
    if (currentStep >= steps.length) return result ? '✅ Expression is balanced' : '❌ Expression is unbalanced';
    return steps[currentStep]?.message || '';
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-purple-50'
    }`}>
      <Header />
      <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
        <div className="mb-4 md:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient">
            Stack Visualizer
          </h1>
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="space-y-4 md:space-y-6 order-2 xl:order-1">
            <InputSection
              onCheck={handleCheck}
              onReset={handleReset}
              isProcessing={isProcessing}
              expression={expression}
              setExpression={setExpression}
              darkMode={darkMode}
            />
            
            <div className={`rounded-xl p-6 shadow-2xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Status
              </h2>
              <div className="min-h-[80px] text-lg font-medium">
                {getCurrentMessage() && (
                  <p className={result === false ? 'text-red-500' : result === true ? 'text-green-500' : ''}>
                    {getCurrentMessage()}
                  </p>
                )}
              </div>
            </div>

            <HistorySection history={history} darkMode={darkMode} />
          </div>

          {/* Right Column */}
          <div className="order-1 xl:order-2">
            <StackVisualizer
              stack={stack}
              currentCharIndex={currentCharIndex}
              expression={expression}
              isProcessing={isProcessing}
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

