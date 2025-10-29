import React from 'react';
import type { GenerationResult } from '../types';
import { CopyIcon, DownloadIcon, PenIcon } from './IconComponents';
import { jsPDF } from 'jspdf';

interface GeneratedOutputProps {
  result: GenerationResult | null;
  isLoading: boolean;
  error: string | null;
}

const Placeholder = () => (
  <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-500">
    <PenIcon className="w-24 h-24 mb-4 text-gray-400 dark:text-gray-600" />
    <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300">Your masterpiece awaits</h3>
    <p className="mt-2 max-w-sm">Fill out the form to generate a unique piece of creative writing.</p>
  </div>
);

const Loader = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-600 dark:text-gray-400">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500 dark:border-indigo-400"></div>
      <h3 className="text-2xl font-bold mt-6">Conjuring Creativity...</h3>
      <p className="mt-2">The AI is weaving its magic. This may take a moment.</p>
    </div>
);

const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center h-full text-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/50 rounded-lg p-6">
    <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">An Error Occurred</h3>
    <p className="mt-2 text-red-500 dark:text-red-300">{message}</p>
  </div>
);


export const GeneratedOutput: React.FC<GeneratedOutputProps> = ({ result, isLoading, error }) => {
    
    const copyAsJson = () => {
        if (!result) return;
        navigator.clipboard.writeText(JSON.stringify(result, null, 2));
        alert('Copied as JSON!');
    };

    const saveAsPdf = () => {
        if (!result) return;

        const doc = new jsPDF();
        const pageHeight = doc.internal.pageSize.height;
        const pageWidth = doc.internal.pageSize.width;
        const margin = 15;
        let y = margin; // vertical cursor

        const checkPageBreak = (neededHeight: number) => {
            if (y + neededHeight > pageHeight - margin) {
                doc.addPage();
                y = margin;
            }
        };

        // Title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        const titleLines = doc.splitTextToSize(result.title, pageWidth - margin * 2);
        doc.text(titleLines, pageWidth / 2, y, { align: 'center' });
        y += (titleLines.length * 10) + 5;

        // Content
        checkPageBreak(20);
        doc.setFont('times', 'normal');
        doc.setFontSize(12);
        const contentLines = doc.splitTextToSize(result.content, pageWidth - margin * 2);
        
        for (const line of contentLines) {
            checkPageBreak(7);
            doc.text(line, margin, y);
            y += 7; // line height
        }
        
        y += 10;

        // Summary
        checkPageBreak(25);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text('Summary', margin, y);
        y += 8;

        doc.setFont('times', 'italic');
        doc.setFontSize(12);
        const summaryLines = doc.splitTextToSize(result.summary, pageWidth - margin * 2);
        for (const line of summaryLines) {
            checkPageBreak(7);
            doc.text(line, margin, y);
            y += 7;
        }

        y += 10;

        // Metadata
        checkPageBreak(30);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text('Metadata', margin, y);
        y += 8;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        const metadataText = `Type: ${result.metadata.type}\nGenre: ${result.metadata.genre}\nTone: ${result.metadata.tone}\nLength: ${result.metadata.wordCount}\nGeneration Time: ${result.metadata.generationTime}s`;
        const metadataLines = doc.splitTextToSize(metadataText, pageWidth - margin * 2);
        for (const line of metadataLines) {
            checkPageBreak(5);
            doc.text(line, margin, y);
            y += 5;
        }

        doc.save(`${result.title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
    };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 min-h-[600px] flex flex-col transition-colors duration-300">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorDisplay message={error} />
      ) : result ? (
        <div className="flex-grow flex flex-col overflow-hidden">
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-300 dark:to-indigo-400 flex-1 pr-4">
                    {result.title}
                </h2>
                <div className="flex space-x-2">
                    <button onClick={copyAsJson} title="Copy as JSON" className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors">
                        <CopyIcon className="w-5 h-5" />
                    </button>
                    <button onClick={saveAsPdf} title="Save as PDF" className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors">
                        <DownloadIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div className="flex-grow overflow-y-auto pr-4 -mr-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap font-serif text-lg">{result.content}</p>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Summary</h3>
                <p className="text-gray-600 dark:text-gray-400 italic">{result.summary}</p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-500">
                    <span><strong>Type:</strong> {result.metadata.type}</span>
                    <span><strong>Genre:</strong> {result.metadata.genre}</span>
                    <span><strong>Tone:</strong> {result.metadata.tone}</span>
                    <span><strong>Length:</strong> {result.metadata.wordCount}</span>
                    <span><strong>Time:</strong> {result.metadata.generationTime}s</span>
                </div>
            </div>
        </div>
      ) : (
        <Placeholder />
      )}
    </div>
  );
};