import { GoogleGenerativeAI } from "@google/generative-ai";
import type { NewsArticle, TickerData, Source } from '../types';

interface GeminiNewsResponse {
    trendingTopics: string[];
    mainStory: {
        title: string;
        content: string;
        imageKeywords: string[];
        imageUrl?: string;
    };
    otherStories: {
        title: string;
        content: string;
        imageKeywords: string[];
        imageUrl?: string;
    }[];
}

interface GeminiTickerResponse {
    weather: {
        city: string;
        temperature: string;
        condition: string;
    };
    dollarRate: string;
    headlines: string[];
}

// MOCK DATA FACTORY
const getMockNews = (topic?: string | null): GeminiNewsResponse => {
    const t = topic?.toLowerCase() || "";

    // Pool of varied stories per category
    const techStories = [
        { title: "O Salto Quântico: Computadores do Futuro Já São Realidade?", content: "Laboratórios ao redor do mundo anunciam avanços significativos na computação quântica. O que antes parecia teoria distante, agora promete quebrar criptografias complexas e simular novos medicamentos em segundos.", imageKeywords: ["quantum computer"] },
        { title: "Smartphones Dobráveis: A Revolução das Telas", content: "A nova geração de celulares flexíveis promete durabilidade e telas ainda maiores que se transformam em tablets.", imageKeywords: ["foldable phone"] },
        { title: "Drones de Entrega em Testes em SP", content: "Empresas de logística testam entregas autônomas em condomínios de São Paulo para agilizar o delivery final.", imageKeywords: ["delivery drone"] },
        { title: "O Futuro dos Carros Autônomos", content: "A legislação brasileira começa a se adaptar para os veículos sem motorista em áreas urbanas controladas.", imageKeywords: ["autonomous car"] },
        { title: "Realidade Aumentada no Trabalho", content: "Óculos inteligentes ganham novas funcionalidades para o trabalho colaborativo e manutenção industrial.", imageKeywords: ["ar glasses"] },
        { title: "Impressão 3D na Saúde Pública", content: "Médicos imprimem próteses personalizadas de baixo custo em hospitais públicos do Brasil.", imageKeywords: ["3d printing health"] },
        { title: "Cibersegurança em 2025", content: "Ataques sofisticados exigem novas defesas baseadas em IA para proteger dados sensíveis de usuários.", imageKeywords: ["cybersecurity"] },
        { title: "Baterias de Longa Duração", content: "Pesquisadores anunciam nova tecnologia de estado sólido que pode triplicar autonomia de eletrônicos.", imageKeywords: ["battery tech"] }
    ];

    const econStories = [
        { title: "Dólar e Juros: Impacto no Cenário Global", content: "Entenda o mercado financeiro e como proteger seus investimentos em tempos de volatilidade e mudanças nas taxas globais.", imageKeywords: ["stock market"] },
        { title: "O Boom das Fintechs no Brasil", content: "Bancos digitais continuam ganhando mercado e desafiando instituições tradicionais com serviços inovadores.", imageKeywords: ["fintech"] },
        { title: "Criptoativos em Nova Alta", content: "Bitcoin volta a testar resistências históricas com a entrada massiva de investidores institucionais.", imageKeywords: ["bitcoin"] },
        { title: "Agronegócio 4.0: Safra Recorde", content: "Tecnologia no campo bate recordes de produtividade na safra de grãos com o uso de sensores IoT.", imageKeywords: ["agriculture technology"] },
        { title: "Mercado Imobiliário Aquecido", content: "As capitais brasileiras registram aumento na procura por imóveis comerciais com a volta do trabalho presencial.", imageKeywords: ["modern building"] },
        { title: "Inflação e o Poder de Compra", content: "Analistas discutem o impacto da nova cesta básica nos custos das famílias brasileiras neste trimestre.", imageKeywords: ["supermarket aisle"] },
        { title: "Startups Brasileiras em Destaque", content: "Novos unicórnios surgem no cenário nacional focados em soluções de logística e sustentabilidade.", imageKeywords: ["startup office"] },
        { title: "Economia Verde e Investimentos", content: "O crescimento dos títulos ESG atrai grandes fundos para projetos de preservação na Amazônia.", imageKeywords: ["green economy"] }
    ];

    const generalStories = [
        { title: "A Revolução Silenciosa da IA", content: "Enquanto muitos focam nos robôs de ficção, a IA já otimiza nosso trânsito e agendas de forma invisível.", imageKeywords: ["artificial intelligence"] },
        { title: "Energia Solar: Liderança Global do Brasil", content: "Com potencial gigantesco, o país se posiciona com destaque na matriz energética limpa.", imageKeywords: ["solar panels"] },
        { title: "Exploração Lunar e Bases Privadas", content: "Agências espaciais e empresas correm contra o tempo para estabelecer bases permanentes na Lua.", imageKeywords: ["moon base"] },
        { title: "Carros Voadores nas Metrópoles", content: "Projetos de eVTOLs avançam e prometem revolucionar o transporte urbano individual em breve.", imageKeywords: ["flying car evtol"] },
        { title: "Medicina Personalizada via DNA", content: "Tratamentos baseados no código genético de cada paciente transformam a eficácia de terapias complexas.", imageKeywords: ["dna sequence"] },
        { title: "O Futuro do Home Office", content: "Trabalho híbrido redefine o planejamento das cidades e o comércio nos bairros residenciais.", imageKeywords: ["remote worker"] },
        { title: "Turismo Sustentável em Alta", content: "Destinos ecológicos brasileiros registram recorde de visitantes interessados em preservação.", imageKeywords: ["eco tourism"] },
        { title: "Novas Fronteiras da Educação Híbrida", content: "Universidades integram metaverso para criar experiências imersivas de aprendizado à distância.", imageKeywords: ["vr education"] }
    ];

    const shuffle = <T>(array: T[]) => [...array].sort(() => Math.random() - 0.5);

    let sourcePool = generalStories;
    let trends = ["Inteligência Artificial", "Inovação", "Espaço", "Sustentabilidade", "Trabalho"];

    if (t.includes("tec")) {
        sourcePool = techStories;
        trends = ["IA Generativa", "Metaverso", "Cibersegurança", "5G", "Semicondutores"];
    } else if (t.includes("eco") || t.includes("fin")) {
        sourcePool = econStories;
        trends = ["Taxa Selic", "Bitcoin", "Bolsa de Valores", "Agronegócio", "Crédito"];
    } else if (t.includes("ciên")) {
        sourcePool = generalStories;
        trends = ["Astronomia", "Genética", "Clima", "Física Quântica", "Biologia"];
    }

    const shuffled = shuffle(sourcePool);
    return {
        trendingTopics: trends,
        mainStory: shuffled[0],
        otherStories: shuffled.slice(1, 8) // Get up to 7 more
    };
};

const MOCK_TICKER: GeminiTickerResponse = {
    weather: { city: "São Paulo", temperature: "26°C", condition: "Parcialmente Nublado" },
    dollarRate: "R$ 5,65",
    headlines: [
        "Tecnologia avança: Novos chips prometem dobrar velocidade de processamento.",
        "Mercado financeiro reage positivamente às novas políticas econômicas.",
        "Esporte: Brasil garante vaga na final do campeonato mundial."
    ]
};

let genAI: GoogleGenerativeAI;
try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string;

    if (!apiKey) {
        throw new Error("VITE_GEMINI_API_KEY not found in environment variables");
    }
    genAI = new GoogleGenerativeAI(apiKey);
} catch (e) {
    console.error("API Key not found or invalid. Please check your .env.local file and ensure VITE_GEMINI_API_KEY is set.");
    console.error(e);
}

const fetchWithRetry = async <T,>(prompt: string): Promise<T | null> => {
    if (!genAI) {
        throw new Error("GoogleGenerativeAI client is not initialized. Check API Key.");
    }

    let retries = 3;
    while (retries > 0) {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const textResponse = response.text();

            if (!textResponse) {
                throw new Error("Empty response from API");
            }
            const jsonString = textResponse.match(/```json\n([\s\S]*?)\n```/)?.[1] || textResponse;
            const data: T = JSON.parse(jsonString);

            return data;
        } catch (error) {
            console.error(`API call failed. Retries left: ${retries - 1}`, error);

            // Fallback to MOCK DATA on error (429, 404, 500)
            retries--;
            if (retries === 0) {
                console.warn("All retries failed. Serving MOCK DATA to ensure site stability.");
                const isNewsRequest = prompt.includes("trending topics") || prompt.includes("original blog-style articles");

                // Extract topic from prompt for better mock data
                let topic = null;
                if (prompt.includes('topic: "')) {
                    const match = prompt.match(/topic: "([^"]+)"/);
                    if (match) topic = match[1];
                }

                return (isNewsRequest ? getMockNews(topic) : MOCK_TICKER) as unknown as T;
            }
            await new Promise(res => setTimeout(res, 1000));
        }
    }
    return null;
};

const createLearnMoreSource = (title: string): Source[] => {
    return [{
        title: `Pesquisar "${title}" no Google`,
        uri: `https://www.google.com/search?q=${encodeURIComponent(title)}`
    }];
};

const generateImage = async (keywords: string[]): Promise<string> => {
    // FIX: Unsplash source is deprecated. Switched to Pollinations.ai for reliable AI image generation.
    const prompt = keywords.join(' ');
    const fallbackImageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=800&height=600&seed=${Math.random()}`;
    return fallbackImageUrl;
};


export const getNewsData = async (topic?: string | null, force: boolean = false): Promise<{ mainStory: NewsArticle, otherStories: NewsArticle[], trendingTopics: string[] } | null> => {
    const CACHE_KEY = `news_data_${topic || 'default'}`;
    const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

    // Check cache
    if (!force) {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            try {
                const { timestamp, data } = JSON.parse(cached);
                // Ensure data is valid and has the required structure
                if (Date.now() - timestamp < CACHE_DURATION && data && data.mainStory) {
                    console.log("Serving news from cache");
                    return data;
                } else {
                    localStorage.removeItem(CACHE_KEY); // Clean up bad/stale cache
                }
            } catch (e) {
                localStorage.removeItem(CACHE_KEY);
            }
        }
    } else {
        localStorage.removeItem(CACHE_KEY);
    }

    const topicInstruction = topic
        ? `CRITICAL: The topic is "${topic}". ALL 6 articles (1 mainStory and 5 otherStories) MUST be uniquely about "${topic}". DO NOT talk about anything else.`
        : `Generate articles about a variety of currently trending topics in Brazil. Populate "trendingTopics" with 5 current trends.`;

    const prompt = `
    Timestamp: ${new Date().toISOString()} - ${Math.random()}
    You are a professional journalist for ALEATORIO NEWS. 
    Generate a JSON response with fresh, unique news content.
    ${topicInstruction}


    Structure:
    {
      "trendingTopics": ["topic1", "topic2", "topic3", "topic4", "topic5"],
      "mainStory": { "title": "...", "content": "...", "imageKeywords": [...] },
      "otherStories": [
        { "title": "...", "content": "...", "imageKeywords": [...] },
        ... 6 more stories (Total 7)
      ]
    }
    All text in Brazilian Portuguese.
    `;


    const data = await fetchWithRetry<GeminiNewsResponse>(prompt);

    if (!data || !data.mainStory) {
        console.error("Invalid or missing news data structure", data);
        // Force mock fallback if API returned garbage
        const fallback = getMockNews(topic);
        if (!fallback) return null;
        Object.assign(data || {}, fallback);
    }

    const imagePromises = [
        generateImage(data.mainStory.imageKeywords || ["news"]),
        ...(data.otherStories || []).map(story => generateImage(story.imageKeywords || ["news"]))
    ];

    const [mainStoryImageUrl, ...otherStoriesImageUrls] = await Promise.all(imagePromises);

    const timestamp = new Date().toISOString();
    const result = {
        mainStory: {
            ...data.mainStory,
            id: `main-${Date.now()}`,
            timestamp,
            imageUrl: mainStoryImageUrl,
            sources: createLearnMoreSource(data.mainStory.title || "Notícia Aleatoria"),
        },
        otherStories: (data.otherStories || []).map((story, index) => ({
            ...story,
            id: `other-${Date.now()}-${index}`,
            timestamp,
            imageUrl: otherStoriesImageUrls[index] || "https://images.unsplash.com/photo-1504711441094-74d03e832d78?w=800&q=80",
            sources: createLearnMoreSource(story.title || "Notícia Aleatoria"),
        })),
        trendingTopics: data.trendingTopics || [],
    };

    // Save to cache
    localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data: result
    }));

    return result;
};

export const getTickerData = async (): Promise<TickerData | null> => {
    const CACHE_KEY = 'ticker_data';
    const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

    // Check cache
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
            console.log("Serving ticker from cache");
            return data;
        }
    }

    const prompt = `
    You are an API for a news ticker. Provide real-time information for Brazil.

    Respond ONLY with a single valid JSON object wrapped in \`\`\`json markdown.
    The JSON structure MUST be:
    {
      "weather": { "city": "São Paulo", "temperature": "22°C", "condition": "Ensolarado" },
      "dollarRate": "5.43",
      "headlines": [
        "A short, AI-generated headline inspired by current events.",
        "Another short, AI-generated headline on a different topic.",
        "A third AI-generated headline from politics or economy."
      ]
    }

    Rules:
    1. Information should be current for Brazil. Weather is for São Paulo.
    2. 'dollarRate' is the current commercial USD to BRL rate.
    3. 'headlines' must be 3 short, distinct, AI-generated headlines inspired by, but not copying, real news.
    4. All text must be in Brazilian Portuguese.
    5. Ensure the JSON is well-formed.
    `;
    const data = await fetchWithRetry<GeminiTickerResponse>(prompt);

    if (data) {
        // Save to cache
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data
        }));
    }

    return data;
};