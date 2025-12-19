import { GoogleGenAI, Type } from "@google/genai";
import { NewsArticle, AspectRatio, Source } from "../types";

// Get API key from environment variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

// Validate API key presence
if (!API_KEY) {
  console.warn(
    '⚠️ GEMINI_API_KEY não configurada!\n' +
    'Crie um arquivo .env na raiz do projeto com:\n' +
    'VITE_GEMINI_API_KEY=sua_chave_aqui\n\n' +
    'O Consultor IA não funcionará sem a chave.'
  );
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

// 1. Search Grounding for Tax News
export const fetchTaxNews = async (query: string): Promise<NewsArticle[]> => {
  // Check if AI client is available
  if (!ai) {
    return [{
      title: "Consultor IA Indisponível",
      summary: "Configure a chave API do Gemini no arquivo .env para usar esta funcionalidade.",
      source: "Sistema",
      date: new Date().toISOString(),
      url: "#"
    }];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Find the latest tax and fiscal news in Brazil related to: ${query}. Return a JSON array of 8 items. Prioritize items from major official sources (Receita Federal, Portal Sped, major news outlets).`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              source: { type: Type.STRING },
              date: { type: Type.STRING }
            },
            required: ["title", "summary", "source", "date"]
          }
        }
      },
    });

    const newsData = JSON.parse(response.text || "[]");

    // Extract sources from grounding metadata if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return newsData.map((item: any, index: number) => {
      // Try to match a URL from grounding chunks (simple heuristic)
      const relevantChunk = groundingChunks.find((c: any) => c.web?.title?.includes(item.source) || c.web?.uri);
      return {
        ...item,
        url: relevantChunk?.web?.uri || '#'
      };
    });

  } catch (error) {
    console.error("Error fetching tax news:", error);
    return [
      {
        title: "Erro ao carregar notícias",
        summary: "Não foi possível conectar ao serviço de inteligência fiscal no momento.",
        source: "Sistema",
        date: new Date().toISOString(),
        url: "#"
      }
    ];
  }
};

// 2. Thinking Mode for Complex Tax Analysis with Grounding
export const analyzeComplexTaxScenario = async (scenario: string): Promise<{ text: string, sources: Source[] }> => {
  // Check if AI client is available
  if (!ai) {
    return {
      text: "⚠️ Consultor IA não configurado. Adicione VITE_GEMINI_API_KEY no arquivo .env para usar esta funcionalidade.",
      sources: []
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `You are a senior tax consultant. Analyze this scenario deeply: ${scenario}. Provide a structured, legally backed opinion suitable for a professional accountant. cite specific laws (Lei), instructions (IN), and decrees.`,
      config: {
        thinkingConfig: { thinkingBudget: 16000 }, // Budget for reasoning
        tools: [{ googleSearch: {} }] // Enable search for up-to-date laws
      }
    });

    const text = response.text || "No analysis generated.";

    // Extract Grounding Chunks
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: Source[] = chunks
      .filter((c: any) => c.web?.uri && c.web?.title)
      .map((c: any) => {
        let snippet = "Fonte Web";
        try {
          const hostname = new URL(c.web.uri).hostname.replace('www.', '');
          snippet = hostname;
        } catch (e) { }

        return {
          title: c.web.title,
          url: c.web.uri,
          sourceType: 'Web',
          snippet: snippet
        };
      });

    // Dedup sources by URL
    const uniqueSources = Array.from(new Map(sources.map(item => [item.url, item])).values());

    return { text, sources: uniqueSources };

  } catch (error) {
    console.error("Analysis error:", error);
    return {
      text: "Desculpe, o sistema está sobrecarregado ou houve um erro na conexão. Tente novamente mais tarde.",
      sources: []
    };
  }
};

// 3. Image Generation for Article Thumbnails/Posts
export const generateFiscalImage = async (prompt: string, aspectRatio: AspectRatio): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          { text: prompt },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
          imageSize: "1K"
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image gen error:", error);
    return null;
  }
};

// 4. Image Editing (Nano Banana - Gemini 2.5 Flash Image)
export const editChartImage = async (imageBase64: string, instruction: string): Promise<string | null> => {
  try {
    // Strip data url prefix if present
    const cleanBase64 = imageBase64.split(',')[1] || imageBase64;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png', // Assuming PNG for simplicity in this demo
              data: cleanBase64
            }
          },
          { text: instruction }
        ]
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;

  } catch (error) {
    console.error("Image edit error:", error);
    return null;
  }
}