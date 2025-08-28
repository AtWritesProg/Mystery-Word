import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const SettingsOverlay = ({ 
  customTimer, 
  setCustomTimer, 
  soundEnabled, 
  setSoundEnabled, 
  onClose 
}) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-gray-600 rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold text-white mb-4">Settings</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-white mb-2">Discussion Timer (seconds)</label>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCustomTimer(Math.max(30, customTimer - 15))}
                className="bg-red-700 hover:bg-red-600 px-3 py-1 rounded text-white"
              >
                -15s
              </button>
              <span className="text-white text-lg font-bold">{customTimer}s</span>
              <button 
                onClick={() => setCustomTimer(Math.min(300, customTimer + 15))}
                className="bg-red-700 hover:bg-red-600 px-3 py-1 rounded text-white"
              >
                +15s
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-white">Sound Effects</span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg transition-colors ${soundEnabled ? 'bg-green-700' : 'bg-gray-700'}`}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 text-white" /> : <VolumeX className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="w-full mt-6 bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded-xl"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SettingsOverlay;