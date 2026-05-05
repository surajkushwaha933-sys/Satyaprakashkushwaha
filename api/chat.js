import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.VITE_GROQ_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!process.env.VITE_GROQ_API_KEY) {
    console.error('Missing VITE_GROQ_API_KEY environment variable');
    return res.status(500).json({ error: 'AI configuration error: Missing API Key' });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // Updated: 3.1 was decommissioned
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    return res.status(200).json(completion);
  } catch (error) {
    console.error('Groq SDK Error:', error);
    return res.status(500).json({ error: 'Failed to fetch from Groq SDK' });
  }
}
