// apps/web/src/pages/api/generate-suggestion.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Tipos para a resposta
type ApiResponse = {
  suggestion?: string;
  error?: string;
};

// Pega a Chave de API do ambiente (seguro)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// ==== CORREÇÃO AQUI ====
// O modelo 'gemini-1.5-flash' também não foi encontrado na v1beta.
// Vamos usar o alias mais recente e estável: 'gemini-1.5-pro-latest'
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
// =======================

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Apenas aceitamos requisições POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { transcript, notes } = req.body;

  if (!transcript && !notes) {
    return res.status(400).json({ error: 'É necessário fornecer a transcrição ou as anotações.' });
  }

  try {
    // Este é o "prompt" que você envia para a IA. Ajuste conforme sua necessidade.
    const prompt = `
      Você é um assistente de psicologia altamente qualificado. 
      Sua tarefa é analisar a transcrição de uma sessão e as anotações do terapeuta.
      Baseado no conteúdo fornecido, gere um breve resumo dos principais tópicos discutidos, 
      identifique o sentimento predominante do paciente e sugira 2-3 possíveis pontos 
      de foco ou "dever de casa" para a próxima sessão.

      **Restrição Importante:** Não forneça um diagnóstico médico ou psicológico. Foque em padrões comportamentais e temas da conversa.

      **Transcrição da Sessão:**
      ${transcript || 'Nenhuma transcrição fornecida.'}

      **Anotações do Terapeuta:**
      ${notes || 'Nenhuma anotação fornecida.'}

      **Sua Análise (Resumo, Sentimento e Sugestões):**
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ suggestion: text });

  } catch (error) {
    console.error('Erro ao chamar a API do Gemini:', error);
    res.status(500).json({ error: 'Falha ao gerar sugestão da IA.' });
  }
}