import React from 'react';
import type { GenerationResult } from '../types';

interface SampleGalleryProps {
  samples: GenerationResult[];
  onSelectSample: (sample: GenerationResult) => void;
}

export const SampleGallery: React.FC<SampleGalleryProps> = ({ samples, onSelectSample }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 min-h-[600px] flex flex-col transition-colors duration-300">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-300 dark:to-indigo-400 mb-6">
            Sample Gallery & Inspiration
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
            Explore what's possible. Click any sample to view the full text and load its settings into the form.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {samples.map((sample) => (
                <div 
                    key={sample.id} 
                    onClick={() => onSelectSample(sample)}
                    className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-500 cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
                >
                    <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-2 truncate">{sample.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm italic mb-4 h-10 overflow-hidden">{sample.summary}</p>
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 px-2 py-1 rounded-full">{sample.metadata.type}</span>
                        <span className="text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 px-2 py-1 rounded-full">{sample.metadata.genre}</span>
                        <span className="text-xs font-semibold bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300 px-2 py-1 rounded-full">{sample.metadata.tone}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};