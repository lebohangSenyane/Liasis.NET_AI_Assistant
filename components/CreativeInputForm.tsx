import React from 'react';
import type { GenerationParams } from '../types';
import { TYPES, GENRES, TONES, LENGTHS } from '../constants';
import { GenerateIcon, LoadingIcon } from './IconComponents';

interface CreativeInputFormProps {
  params: GenerationParams;
  onParamChange: (name: keyof GenerationParams, value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  errors: { [key in keyof Omit<GenerationParams, 'customPrompt' | 'customTitle'>]?: string };
  isVariation: boolean;
}

export const CreativeInputForm: React.FC<CreativeInputFormProps> = ({ params, onParamChange, onSubmit, isLoading, errors, isVariation }) => {
  const isFormValid = params.type && params.genre && params.tone && params.length;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onParamChange(name as keyof GenerationParams, value);
  };
  
  const buttonText = isVariation ? 'Generate Variation' : 'Generate';

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 sticky top-8 transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">Customize Your Creation</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
          <div className="grid grid-cols-2 gap-2">
            {TYPES.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => onParamChange('type', id)}
                className={`flex flex-col items-center justify-center p-3 text-sm rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-indigo-500 ${
                  params.type === id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span>{label}</span>
              </button>
            ))}
          </div>
          {errors.type && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.type}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Genre</label>
          <div className="grid grid-cols-3 gap-2">
            {GENRES.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => onParamChange('genre', id)}
                className={`flex flex-col items-center justify-center p-3 text-xs sm:text-sm rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-indigo-500 ${
                  params.genre === id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span>{label}</span>
              </button>
            ))}
          </div>
          {errors.genre && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.genre}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tone</label>
            <select
              id="tone"
              name="tone"
              value={params.tone}
              onChange={handleChange}
              className={`w-full bg-gray-200 dark:bg-gray-700 border rounded-md py-2 px-3 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.tone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <option value="">Select a tone</option>
              {TONES.map(tone => (
                <option key={tone.value} value={tone.value}>{tone.label}</option>
              ))}
            </select>
            {errors.tone && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.tone}</p>}
          </div>
          <div>
            <label htmlFor="length" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Length</label>
            <select
              id="length"
              name="length"
              value={params.length}
              onChange={handleChange}
              className={`w-full bg-gray-200 dark:bg-gray-700 border rounded-md py-2 px-3 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.length ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <option value="">Select a length</option>
              {LENGTHS.map(length => (
                <option key={length.value} value={length.value}>{length.label}</option>
              ))}
            </select>
            {errors.length && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.length}</p>}
          </div>
        </div>
        
        <div>
          <label htmlFor="customTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Title (Optional)
          </label>
          <input
            type="text"
            id="customTitle"
            name="customTitle"
            value={params.customTitle}
            onChange={handleChange}
            placeholder="e.g., 'The Last Dragon's Secret'"
            className="w-full bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="customPrompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Add Your Spark (Optional)
          </label>
          <textarea
            id="customPrompt"
            name="customPrompt"
            rows={3}
            value={params.customPrompt}
            onChange={handleChange}
            placeholder="e.g., 'a story about a dragon who loves to bake...'"
            className="w-full bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 resize-none"
          />
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading || !isFormValid}
          className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          {isLoading ? (
            <>
              <LoadingIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              Generating...
            </>
          ) : (
            <>
              <GenerateIcon className="-ml-1 mr-3 h-6 w-6" />
              {buttonText}
            </>
          )}
        </button>
      </div>
    </div>
  );
};