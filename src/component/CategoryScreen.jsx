import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { categories } from './gameData.js';

const CategoryScreen = ({ onCategorySelect, onBack }) => {
  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="bg-gray-800 hover:bg-gray-700 p-3 rounded-xl border border-gray-600/50 mr-4"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-3xl font-bold text-white">Choose Category</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(categories).map(([category, words]) => (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className="bg-gray-900/50 hover:bg-red-900/30 border border-gray-700/50 hover:border-red-600/50 rounded-2xl p-6 transition-all transform hover:scale-105 text-left"
            >
              <h3 className="text-xl font-bold text-white mb-2">{category}</h3>
              <p className="text-gray-400 text-sm mb-3">{words.length} words available</p>
              <div className="flex flex-wrap gap-1">
                {words.slice(0, 6).map((word, i) => (
                  <span key={i} className="bg-red-900/30 text-red-300 px-2 py-1 rounded-lg text-xs">
                    {word}
                  </span>
                ))}
                {words.length > 6 && (
                  <span className="text-gray-500 text-xs px-2 py-1">+{words.length - 6} more</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryScreen;