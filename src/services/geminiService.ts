import { GoogleGenAI } from "@google/genai";
import type { NewsArticle, TickerData, Source } from '../types';

interface GeminiNewsResponse {
    trendingTopics: string[];
    mainStory: {
        title: string;
        content: string;
        imageKeywords: string[];
    };
    otherStories: {
        title: string;
        content: string;
        imageKeywords: string[];
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

let ai: GoogleGenAI;
try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string;

    if (!apiKey) {
        throw new Error("VITE_GEMINI_API_KEY not found in environment variables");
    }
    ai = new GoogleGenAI({ apiKey });
} catch (e) {
    console.error("API Key not found or invalid. Please check your .env.local file and ensure VITE_GEMINI_API_KEY is set.");
    console.error(e);
}

const fetchWithRetry = async <T,>(prompt: string): Promise<T | null> => {
    if (!ai) {
        throw new Error("GoogleGenAI client is not initialized. Check API Key.");
    }

    let retries = 3;
    while (retries > 0) {
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-1.5-flash',
                contents: prompt,
            });

            const textResponse = response.text;
            if (!textResponse) {
                throw new Error("Empty response from API");
            }
            const jsonString = textResponse.match(/```json\n([\s\S]*?)\n```/)?.[1] || textResponse;
            const data: T = JSON.parse(jsonString);

            return data;
        } catch (error) {
            console.error(`API call failed. Retries left: ${retries - 1}`, error);
            if (error instanceof Error) {
                console.error("Error details:", error.message);
            }
            retries--;
            if (retries === 0) {
                const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
                throw new Error(`Falha na IA: ${errorMessage}`);
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
    // COST OPTIMIZATION: Always use Unsplash to save Gemini API calls (approx. 6 calls per user).
    // The Gemini image generation code has been removed to ensure zero cost for images.
    const fallbackImageUrl = `https://source.unsplash.com/800x600/?${keywords.map(k => encodeURIComponent(k)).join(',')}`;
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