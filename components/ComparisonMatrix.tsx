import React from 'react';
import { COMPARISON_DATA } from '../data/comparisonData';
import type { GenerationResult } from '../types';

const ComparisonCard: React.FC<{ result: GenerationResult }> = ({ result }) => (
    <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg border border-gray-200 dark:border-gray-700 flex-1 flex flex-col">
        <div className="mb-4">
            <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-400">Prompt Parameter</h3>
            <p className="text-lg font-mono bg-gray-200 dark:bg-gray-700 inline-block px-2 py-1 rounded mt-1">
                Tone: <span className="font-bold text-purple-600 dark:text-purple-400">{result.metadata.tone}</span>
            </p>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex-grow flex flex-col">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{result.title}</h4>
            <div className="flex-grow overflow-y-auto pr-2">
                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap text-sm">{result.content}</p>
            </div>
        </div>
    </div>
);

export const ComparisonMatrix: React.FC = () => {
    const [item1, item2] = COMPARISON_DATA;

    return (
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 min-h-[600px] flex flex-col transition-colors duration-300">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-300 dark:to-indigo-400 mb-2">
                Prompt Comparison Matrix
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
                See how changing a single parameter—the <strong>tone</strong>—transforms the entire story. The base prompt for both is a 'Short Fantasy Story'.
            </p>
            <div className="flex flex-col md:flex-row gap-6 flex-grow">
                <ComparisonCard result={item1} />
                <ComparisonCard result={item2} />
            </div>
        </div>
    );
};