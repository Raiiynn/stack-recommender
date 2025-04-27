'use client';

import { useState } from 'react';
import recommendStack from '@/services/groqService';
import { motion } from 'framer-motion';
import { Copy } from 'lucide-react'; // Icon copy

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setCopied(false);
    try {
      const response = await recommendStack(userInput);
      setRecommendation(response);
    } catch (error) {
      console.error('Error:', error);
      setRecommendation('Oops! Ada masalah saat mendapatkan rekomendasi.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (recommendation) {
      await navigator.clipboard.writeText(recommendation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Balik normal setelah 2 detik
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <motion.h1 
        className="text-4xl font-extrabold mb-8 text-center text-indigo-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🚀 Stack Recommender
      </motion.h1>

      <motion.form 
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <input
          type="text"
          placeholder="Contoh: Web untuk marketplace digital..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition disabled:bg-gray-400 flex justify-center items-center"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-t-2 border-t-white border-white rounded-full animate-spin"></div>
              Generating...
            </div>
          ) : (
            'Get Recommendation'
          )}
        </button>
      </motion.form>

      {recommendation && (
        <motion.div 
          className="mt-10 w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-indigo-600">🎯 Rekomendasi Stack</h2>
            <button onClick={handleCopy} className="text-indigo-500 hover:text-indigo-700 transition">
              <Copy size={20} />
            </button>
          </div>
          <p className="text-gray-700 whitespace-pre-line">{recommendation}</p>

          {copied && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-sm px-2 py-1 rounded-lg">
              Copied!
            </div>
          )}
        </motion.div>
      )}
    </main>
  );
}
