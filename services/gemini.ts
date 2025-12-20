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
    // Try com o modelo mais estável primeiro
    let response;
    try {
      // Tentar com gemini-2.0-flash (modelo estável)
      response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Find the latest tax and fiscal news in Brazil related to: ${query}. Return a JSON array of 8 items. Prioritize items from major official sources (Receita Federal, Portal Sped, major news outlets). Format: [{"title": "...", "summary": "...", "source": "...", "date": "YYYY-MM-DD"}]`,
      });
    } catch (modelError: any) {
      // Se falhar, tentar com gemini-1.5-flash (fallback)
      console.warn("Model gemini-2.0-flash não disponível, tentando gemini-1.5-flash...");
      response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: `Find the latest tax and fiscal news in Brazil related to: ${query}. Return a JSON array of 8 items with title, summary, source, and date.`,
      });
    }

    try {
      const newsData = JSON.parse(response.text || "[]");
      return Array.isArray(newsData) ? newsData.slice(0, 8) : [];
    } catch {
      // Se não conseguir parsear, retornar dados mock
      return [
        {
          title: "Sistema preparado para notícias",
          summary: "Aguardando conexão com banco de dados de notícias fiscais. Utilize ferramentas específicas para análises.",
          source: "Portal Fiscal Pro",
          date: new Date().toISOString(),
          url: "#"
        }
      ];
    }

  } catch (error: any) {
    console.error("Erro ao carregar notícias:", error?.message);
    
    // Retornar dados mock com mensagem amigável
    return [
      {
        title: "Serviço temporariamente indisponível",
        summary: "O serviço de notícias está em manutenção. Tente novamente em alguns minutos.",
        source: "Sistema",
        date: new Date().toISOString(),
        url: "#"
      },
      {
        title: "Dica: Use as ferramentas específicas",
        summary: "Enquanto isso, utilize nossas calculadoras e consultores para análises de Simples Nacional, ICMS, PIS/COFINS e mais.",
        source: "Portal Fiscal Pro",
        date: new Date().toISOString(),
        url: "#"
      }
    ];
  }
};

// 2. Tax Analysis (sem Thinking Mode que pode não estar disponível)
export const analyzeComplexTaxScenario = async (scenario: string): Promise<{ text: string, sources: Source[] }> => {
  // Check if AI client is available
  if (!ai) {
    return {
      text: "⚠️ Consultor IA não configurado. Adicione VITE_GEMINI_API_KEY no arquivo .env para usar esta funcionalidade.",
      sources: []
    };
  }

  try {
    let response;
    try {
      // Tentar com modelo estável
      response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `You are a senior tax consultant. Analyze this scenario: ${scenario}. Provide a structured opinion suitable for a professional accountant. Cite specific laws (Lei), instructions (IN), and decrees when applicable.`
      });
    } catch (modelError: any) {
      // Fallback para modelo anterior se gemini-2.0-flash não funcionar
      console.warn("Modelo gemini-2.0-flash não disponível, tentando gemini-1.5-flash...");
      response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: `Tax consultant analysis: ${scenario}`
      });
    }

    const text = response.text || "Análise não gerada. Tente reformular sua pergunta.";
    const sources: Source[] = []; // Simplificado sem grounding para evitar erros

    return { text, sources };

  } catch (error: any) {
    console.error("Analysis error:", error?.message);
    return {
      text: "Desculpe, o sistema está processando. Tente novamente em alguns minutos ou utilize as calculadoras específicas de tributação.",
      sources: []
    };
  }
};


// 3. Image Generation (Desativado - requer permissões especiais)
export const generateFiscalImage = async (prompt: string, aspectRatio: AspectRatio): Promise<string | null> => {
  console.warn("⚠️ Geração de imagens temporariamente desativada. Use imagens padrão.");
  return null;
};

// 4. Image Editing (Desativado - requer permissões especiais)
export const editChartImage = async (imageBase64: string, instruction: string): Promise<string | null> => {
  console.warn("⚠️ Edição de imagens temporariamente desativada.");
  return null;
};