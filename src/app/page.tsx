"use client";

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResult(data.recommendation);
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">AI Stack Recommender</h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="Describe your project..."
          className="w-full p-3 border rounded-lg"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg">
          {loading ? 'Generating...' : 'Recommend Stack'}
        </button>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-gray-100 rounded-lg w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">Recommended Stack:</h2>
          <p>{result}</p>
        </div>
      )}
    </main>
  );
}
