
import React from 'react';

export default function StoriesSection() {
  return (
    <div className="mb-6 overflow-x-auto">
      <div className="flex gap-4 py-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-0.5 flex items-center justify-center">
              <div className="w-full h-full rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-lg font-bold text-white">
                {String.fromCharCode(65 + i)}
              </div>
            </div>
            <span className="text-xs mt-1">User{i+1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
