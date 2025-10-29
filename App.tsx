import React, { useState, useCallback } from 'react';
import { CreativeInputForm } from './components/CreativeInputForm';
import { GeneratedOutput } from './components/GeneratedOutput';
import { generateCreativeContent } from './services/geminiService';
import type { GenerationParams, GenerationResult } from './types';
import { ThemeToggleButton } from './components/ThemeToggleButton';
import { SampleGallery } from './components/SampleGallery';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { SAMPLE_OUTPUTS } from './data/sampleOutputs';
import { CompareIcon, GalleryIcon } from './components/IconComponents';

type ValidationErrors = { [key in keyof Omit<GenerationParams, 'customPrompt' | 'customTitle'>]?: string };
type AppView = 'gallery' | 'result' | 'comparison';

function App() {
  const [generationParams, setGenerationParams] = useState<GenerationParams>({
    type: '',
    genre: '',
    tone: '',
    length: '',
    customTitle: '',
    customPrompt: '',
  });

  const [currentResult, setCurrentResult] = useState<GenerationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [view, setView] = useState<AppView>('gallery');

  const validateParams = (params: GenerationParams): ValidationErrors => {
    const errors: ValidationErrors = {};
    if (!params.type) errors.type = 'Please select a type.';
    if (!params.genre) errors.genre = 'Please select a genre.';
    if (!params.tone) errors.tone = 'Please select a tone.';
    if (!params.length) errors.length = 'Please select a length.';
    return errors;
  };

  const handleGenerate = useCallback(async () => {
    const errors = validateParams(generationParams);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setValidationErrors({});
    setError(null);
    setCurrentResult(null);
    setIsLoading(true);
    setView('result');
    
    try {
      const generatedResult = await generateCreativeContent(generationParams);
      setCurrentResult(generatedResult);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [generationParams]);

  const handleParamChange = useCallback((name: keyof GenerationParams, value: string) => {
    setGenerationParams(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name as keyof ValidationErrors]) {
        setValidationErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[name as keyof ValidationErrors];
            return newErrors;
        });
    }
  }, [validationErrors]);

  const handleSelectSample = useCallback((sample: GenerationResult) => {
    setCurrentResult(sample);
    setGenerationParams(sample.metadata.params);
    setView('result');
    setError(null);
    setValidationErrors({});
  }, []);
  
  const isVariation = currentResult?.metadata.params && JSON.stringify(generationParams) === JSON.stringify(currentResult.metadata.params);

  const renderMainContent = () => {
    switch (view) {
        case 'gallery':
            return <SampleGallery samples={SAMPLE_OUTPUTS} onSelectSample={handleSelectSample} />;
        case 'comparison':
            return <ComparisonMatrix />;
        case 'result':
        default:
            return <GeneratedOutput result={currentResult} isLoading={isLoading} error={error} />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <header className="w-full max-w-6xl mb-8">
        <div className="flex justify-between items-center">
          <div className="text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-700 dark:from-purple-400 dark:to-indigo-600">
              AI Creative Writing Assistant
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Craft unique stories, poems, and more with the power of Gemini.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setView('gallery')} 
              title="View Samples Gallery"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              <GalleryIcon className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setView('comparison')} 
              title="View Prompt Comparison"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              <CompareIcon className="w-6 h-6" />
            </button>
            <ThemeToggleButton />
          </div>
        </div>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <CreativeInputForm
            params={generationParams}
            onParamChange={handleParamChange}
            onSubmit={handleGenerate}
            isLoading={isLoading}
            errors={validationErrors}
            isVariation={!!isVariation}
          />
        </div>
        <div className="lg:col-span-8">
          {renderMainContent()}
        </div>
      </main>
      
      <footer className="w-full max-w-6xl text-center mt-12 text-gray-500 text-sm">
        <p>Powered by Google Gemini. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
}

export default App;