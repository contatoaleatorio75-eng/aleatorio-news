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

    if (t.includes("tecnologia") || t.includes("inovação")) {
        return {
            trendingTopics: ["IA Generativa", "Metaverso Industrial", "Cibersegurança", "5G no Brasil", "Chips Quânticos"],
            mainStory: {
                title: "O Salto Quântico: Computadores do Futuro Já São Realidade?",
                content: "Laboratórios ao redor do mundo anunciam avanços significativos na computação quântica. O que antes parecia teoria distante, agora promete quebrar criptografias complexas e simular novos medicamentos em segundos. A corrida tecnológica entre grandes potências se intensifica, buscando a supremacia digital.",
                imageKeywords: ["quantum computer"],
                imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80"
            },
            otherStories: [
                { title: "Smartphones Dobráveis", content: "A nova geração de celulares flexíveis promete durabilidade e telas ainda maiores.", imageKeywords: ["foldable phone"], imageUrl: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&q=80" },
                { title: "Drones de Entrega", content: "Empresas de logística testam entregas autônomas em condomínios de São Paulo.", imageKeywords: ["delivery drone"], imageUrl: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800&q=80" },
                { title: "Carros Autônomos", content: "A legislação brasileira começa a se adaptar para os veículos sem motorista.", imageKeywords: ["autonomous car"], imageUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80" },
                { title: "Realidade Aumentada", content: "Óculos inteligentes voltam à moda com novas funcionalidades para o trabalho.", imageKeywords: ["ar glasses"], imageUrl: "https://images.unsplash.com/photo-1535378437327-b7bc751d3885?w=800&q=80" },
                { title: "Impressão 3D na Saúde", content: "Médicos imprimem próteses personalizadas de baixo custo em hospitais públicos.", imageKeywords: ["3d printing"], imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80" }
            ]
        };
    }

    if (t.includes("economia") || t.includes("finanças") || t.includes("investimentos")) {
        return {
            trendingTopics: ["Taxa Selic", "Criptomoedas", "Bolsa de Valores", "Agronegócio", "Startups"],
            mainStory: {
                title: "Dólar e Juros: Como o Cenário Global Impacta seu Bolso",
                content: "Com as recentes movimentações do Federal Reserve e as decisões do Banco Central, entender o mercado financeiro tornou-se essencial. Analistas explicam como proteger seus investimentos em tempos de volatilidade e quais setores prometem maior retorno no próximo semestre.",
                imageKeywords: ["stock market"],
                imageUrl: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?w=1200&q=80"
            },
            otherStories: [
                { title: "O Boom das Fintechs", content: "Bancos digitais continuam ganhando mercado e desafiando instituições tradicionais.", imageKeywords: ["fintech"], imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80" },
                { title: "Criptoativos em Alta", content: "Bitcoin volta a testar resistências históricas com entrada de investidores institucionais.", imageKeywords: ["bitcoin"], imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80" },
                { title: "Inflação Controlada?", content: "Novos índices mostram desaceleração nos preços dos alimentos, aliviando as famílias.", imageKeywords: ["supermarket"], imageUrl: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=800&q=80" },
                { title: "Agronegócio 4.0", content: "Tecnologia no campo bate recordes de produtividade na safra de grãos.", imageKeywords: ["agriculture"], imageUrl: "https://images.unsplash.com/photo-1625246333195-bf436c7cb859?w=800&q=80" },
                { title: "Imóveis Valorizados", content: "O mercado imobiliário aquece nas capitais com a volta dos escritórios presenciais.", imageKeywords: ["real estate"], imageUrl: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80" }
            ]
        };
    }

    // Default: General / AI / Future
    return {
        trendingTopics: ["Inteligência Artificial", "Inovação Sustentável", "Exploração Espacial", "Carros Elétricos", "Futuro do Trabalho"],
        mainStory: {
            title: "A Revolução Silenciosa da IA no Cotidiano: O que Esperar do Futuro Próximo?",
            content: "Enquanto muitos focam nos robôs de ficção científica, a verdadeira revolução da Inteligência Artificial acontece nos bastidores de nossas vidas. Desde algoritmos que otimizam o trânsito até assistentes pessoais que gerenciam nossas agendas, a tecnologia está se tornando invisível e indispensável. Especialistas preveem que, nos próximos anos, a integração será tão fluida que deixaremos de perceber onde a tecnologia termina e a assistência humana começa.",
            imageKeywords: ["artificial intelligence"],
            imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80"
        },
        otherStories: [
            { title: "Energia Solar: O Brasil na Liderança Global?", content: "Com um potencial inexplorado gigantesco, o Brasil se posiciona com destaque.", imageKeywords: ["solar energy"], imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80" },
            { title: "O Renascimento da Exploração Lunar", content: "Agências espaciais e empresas privadas correm contra o tempo para estabelecer bases.", imageKeywords: ["moon"], imageUrl: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=800&q=80" },
            { title: "Carros Voadores: Sonho ou Realidade?", content: "Projetos de eVTOLs avançam nas grandes metrópoles, prometendo desafogar o trânsito.", imageKeywords: ["flying car"], imageUrl: "https://images.unsplash.com/photo-1558507357-12b236ce4370?w=800&q=80" },
            { title: "Medicina Personalizada", content: "Tratamentos baseados em DNA estão mudando para sempre a saúde humana.", imageKeywords: ["dna"], imageUrl: "https://images.unsplash.com/photo-1530482054429-cc491f61333b?w=800&q=80" },
            { title: "Home Office e a Economia", content: "Como o trabalho remoto transformou o planejamento urbano e a economia.", imageKeywords: ["remote work"], imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80" }
        ]
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
    const fallbackImageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=800&height=450&nologo=true&seed=${Math.random()}`;
    return fallbackImageUrl;
};


export const getNewsData = async (topic?: string | null): Promise<{ mainStory: NewsArticle, otherStories: NewsArticle[], trendingTopics: string[] } | null> => {
    const CACHE_KEY = `news_data_${topic || 'default'}`;
    const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

    // Check cache
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
            console.log("Serving news from cache");
            return data;
        }
    }

    const topicInstruction = topic
        ? `1. ALL generated content (mainStory and otherStories) MUST be original blog-style articles about the topic: "${topic}".
       2. The "trendingTopics" array in the JSON MUST be empty.`
        : `1. The content should be original blog-style articles about a variety of currently trending topics in Brazil.
       2. The "trendingTopics" array must be populated with 5 distinct, relevant, and current trending topics in Brazil.`;

    const prompt = `
    You are a creative writer for a news-style blog called ALEATORIO NEWS. Your task is to generate original content based on your knowledge of current events and general topics in Brazil.
    Your output MUST be your own unique, originally generated content.

    Respond ONLY with a single valid JSON object wrapped in \`\`\`json markdown. Do not add any text before or after the JSON block.
    The JSON structure MUST be:
    {
      "trendingTopics": ["topic1", "topic2", "topic3", "topic4", "topic5"],
      "mainStory": {
        "title": "An engaging and creative title for the main article",
        "content": "A detailed original article with at least 80 words, written in an engaging blog style.",
        "imageKeywords": ["keyword1", "keyword2"]
      },
      "otherStories": [
        { "title": "Creative title for story 1", "content": "A short, original blurb for story 1 (at least 30 words).", "imageKeywords": ["keyword3", "keyword4"] },
        { "title": "Creative title for story 2", "content": "A short, original blurb for story 2 (at least 30 words).", "imageKeywords": ["keyword5", "keyword6"] },
        { "title": "Creative title for story 3", "content": "A short, original blurb for story 3 (at least 30 words).", "imageKeywords": ["keyword7", "keyword8"] },
        { "title": "Creative title for story 4", "content": "A short, original blurb for story 4 (at least 30 words).", "imageKeywords": ["keyword9", "keyword10"] },
        { "title": "Creative title for story 5", "content": "A short, original blurb for story 5 (at least 30 words).", "imageKeywords": ["keyword11", "keyword12"] }
      ]
    }

    Rules:
    ${topicInstruction}
    3. All 'title' and 'content' fields must be in Brazilian Portuguese.
    4. All 'imageKeywords' must be in English and suitable for a stock photo search (e.g., "abstract", "technology", "brazil politics").
    5. The generated content must be completely original and written by you. Do not summarize.
    6. Ensure the JSON is well-formed and valid.
    `;

    const data = await fetchWithRetry<GeminiNewsResponse>(prompt);

    if (!data) return null;

    const imagePromises = [
        generateImage(data.mainStory.imageKeywords),
        ...data.otherStories.map(story => generateImage(story.imageKeywords))
    ];

    const [mainStoryImageUrl, ...otherStoriesImageUrls] = await Promise.all(imagePromises);

    const result = {
        mainStory: {
            ...data.mainStory,
            imageUrl: mainStoryImageUrl,
            sources: createLearnMoreSource(data.mainStory.title),
        },
        otherStories: data.otherStories.map((story, index) => ({
            ...story,
            imageUrl: otherStoriesImageUrls[index],
            sources: createLearnMoreSource(story.title),
        })),
        trendingTopics: data.trendingTopics,
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
    const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

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