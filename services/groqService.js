import axios from 'axios';

const recommendStack = async (userInput: string) => {
  const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
    model: process.env.GROQ_MODEL, // ambil dari env
    messages: [
      { role: 'system', content: 'You are an AI stack recommender.' },
      { role: 'user', content: userInput }
    ],
  }, {
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data.choices[0].message.content;
};

export default recommendStack;
