import React from 'react';

const Header = () => {
  const handleFeatureClick = (feature) => {
    // This could trigger an info modal or highlight features
    console.log(`Learn more about: ${feature}`);
    
    switch(feature) {
      case 'Push':
        alert('📥 Push Operation:\n\nAdds an element to the top of the stack.\n\nIn this app, when we encounter an opening bracket like "(", "[", or "{", we push it onto the stack.');
        break;
      case 'Pop':
        alert('📤 Pop Operation:\n\nRemoves the top element from the stack.\n\nIn this app, when we encounter a closing bracket like ")", "]", or "}", we pop the matching opening bracket from the stack.');
        break;
      case 'Peek':
        alert('👁️ Peek Operation:\n\nLooks at the top element without removing it.\n\nIn this app, the highlighted block with a "TOP" label shows the current top element - this is what we peek at to check if brackets match.');
        break;
      case 'Algorithm':
        alert('🧠 Algorithm Visualization:\n\nWatch how the balanced parentheses algorithm works step by step:\n\n1. Scan each character left to right\n2. Push opening brackets (, [, {\n3. Pop closing brackets ), ], }\n4. Check if they match\n5. Empty stack = balanced ✅');
        break;
      default:
        break;
    }
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-6 shadow-2xl">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Stack Visualizer</h1>
        <p className="text-xl md:text-2xl opacity-90">Parentheses Checker - Interactive Stack Data Structure Demo</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => handleFeatureClick('Push')}
            className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold hover:bg-white/30 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
            title="Click to learn about Push operation"
          >
            📥 Push Operation
          </button>
          <button
            onClick={() => handleFeatureClick('Pop')}
            className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold hover:bg-white/30 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
            title="Click to learn about Pop operation"
          >
            📤 Pop Operation
          </button>
          <button
            onClick={() => handleFeatureClick('Peek')}
            className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold hover:bg-white/30 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
            title="Click to learn about Peek operation"
          >
            👁️ Peek Operation
          </button>
          <button
            onClick={() => handleFeatureClick('Algorithm')}
            className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold hover:bg-white/30 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
            title="Click to learn about the algorithm"
          >
            🧠 Algorithm Visualization
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;


