'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setRecommendation('');

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setRecommendation(data.recommendation || 'No recommendation found.');
    } catch (error) {
      setRecommendation('Error fetching recommendation.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#3c1d91] to-[#1f0c5c] text-white p-4 sm:p-8">
      <motion.h1
        className="text-3xl sm:text-5xl leading-tight font-extrabold mb-8 sm:mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#ff6bcb] to-[#ffc37d]"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🚀 Raiiynn AI Project
      </motion.h1>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg sm:max-w-2xl mb-8 sm:mb-10">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Enter your project idea or question..."
          className="flex-1 p-3 sm:p-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
        />
        <button
          onClick={handleSubmit}
          className="px-5 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 rounded-lg text-white font-bold text-sm sm:text-base transition shadow-lg hover:shadow-pink-400/40"
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </div>

      {recommendation && (
        <motion.div
          className="bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-lg sm:max-w-3xl prose prose-invert"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-purple-400">✨ Recommendation:</h2>
          <div
            dangerouslySetInnerHTML={{ __html: formatRecommendation(recommendation) }}
            className="text-base sm:text-lg leading-relaxed"
          />
        </motion.div>
      )}
    </main>
  );
}

function formatRecommendation(text: string) {
  let formatted = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>')
    .replace(/(\d+)\.\s+/g, '<br/><br/><strong>$1.</strong> ');

  return formatted;
}
