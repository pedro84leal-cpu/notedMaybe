import { useState } from 'react';

function useClaude() {
  const [resposta, setResposta] = useState('');
  const [loading, setLoading] = useState(false);

const perguntar = async (pergunta) => {
  setLoading(true);
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: pergunta }] }]
        })
      }
    );
    const data = await res.json();
    setResposta(data.candidates[0].content.parts[0].text);
  } catch (_err) {
    setResposta('Erro ao contactar o Gemini.');
  } finally {
    setLoading(false);
  }
};

  return { resposta, loading, perguntar };
}

export default useClaude;