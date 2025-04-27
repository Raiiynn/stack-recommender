import axios from 'axios';
export { recommendStack };

const recommendStack = async (userInput) => {
  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL;

  if (!apiKey || !model) {
    throw new Error('GROQ_API_KEY or GROQ_MODEL is not set in environment variables.');
  }

  try {
    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: model,
      messages: [
        { role: 'system', content: 'You are an AI stack recommender.' },
        { role: 'user', content: userInput }
      ],
    }, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error("Groq API Error:", error?.response?.data || error.message);
    throw new Error("Failed to get recommendation from Groq.");
  }
};


// 🔥 PENTING: pakai export default
export default recommendStack;
