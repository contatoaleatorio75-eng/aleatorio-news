
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { NewsTicker } from './components/NewsTicker';
import { TrendingTopics } from './components/TrendingTopics';
import { MainStory } from './components/MainStory';
import { NewsCard } from './components/NewsCard';
import { AdPlaceholder } from './components/AdPlaceholder';
import { Spinner } from './components/Spinner';
import { Archive } from './components/Archive';
import { getNewsData, getTickerData } from './services/geminiService';
import { initializeAdSense } from './utils/adsense';
import type { NewsArticle, TickerData } from './types';

const FIXED_CATEGORIES = ["Ciência", "Tecnologia", "Atualidades"];

const App: React.FC = () => {
  const [mainStory, setMainStory] = useState<NewsArticle | null>(null);
  const [otherStories, setOtherStories] = useState<NewsArticle[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [tickerData, setTickerData] = useState<TickerData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [archivedArticles, setArchivedArticles] = useState<NewsArticle[]>([]);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  // Load archive on mount
  useEffect(() => {
    const saved = localStorage.getItem('news_history');
    if (saved) {
      try {
        setArchivedArticles(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse news history", e);
      }
    }
  }, []);

  // Save to archive helper
  const addToArchive = (main: NewsArticle, others: NewsArticle[]) => {
    setArchivedArticles(prev => {
      const allNew = [main, ...others];
      // Filter out duplicates based on title (simple check)
      const filteredNew = allNew.filter(a => !prev.some(p => p.title === a.title));
      if (filteredNew.length === 0) return prev;

      const updated = [...filteredNew, ...prev].slice(0, 50); // Keep last 50
      localStorage.setItem('news_history', JSON.stringify(updated));
      return updated;
    });
  };

  const fetchNewsAndTopics = useCallback(async (topic?: string | null, force: boolean = false) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getNewsData(topic, force);
      if (data) {
        setMainStory(data.mainStory);
        setOtherStories(data.otherStories);
        addToArchive(data.mainStory, data.otherStories);
        if (!topic && data.trendingTopics.length > 0) {
          setTopics(data.trendingTopics);
        }
      } else {
        throw new Error("Não foi possível gerar o conteúdo.");
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Ocorreu um erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchTicker = useCallback(async () => {
    try {
      const data = await getTickerData();
      if (data) {
        setTickerData(data);
      }
    } catch (err) {
      console.error("Failed to fetch ticker data:", err);
    }
  }, []);

  useEffect(() => {
    // Initialize Google AdSense
    initializeAdSense();

    // Fetch initial data
    fetchNewsAndTopics();
    fetchTicker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
    fetchNewsAndTopics(topic, true); // Force refresh on topic click
  };

  const handleUpdateOrViewAll = () => {
    if (selectedTopic) {
      setSelectedTopic(null);
      fetchNewsAndTopics(null, true);
    } else {
      fetchNewsAndTopics(null, true);
    }
  };

  const combinedTopics = Array.from(new Set([...FIXED_CATEGORIES, ...topics]));

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-96">
          <Spinner />
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center text-red-400 p-8 bg-slate-800 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Ops! Algo deu errado.</h2>
          <p>{error}</p>
          <button
            onClick={() => fetchNewsAndTopics(selectedTopic, true)}
            className="mt-4 px-6 py-2 bg-yellow-500 text-slate-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-12">
        {mainStory && (
          <section>
            <MainStory article={mainStory} />
          </section>
        )}

        <div className="py-4 border-y border-slate-200 bg-white/50">
          <AdPlaceholder />
        </div>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherStories.map((story, index) => (
              <React.Fragment key={index}>
                <NewsCard article={story} />
                {/* Optional: Add middle-grid ad if we had many more, for now 8 items is fine */}
              </React.Fragment>
            ))}
          </div>
        </section>

        <div className="py-10 border-t border-slate-200">
          <AdPlaceholder />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onTopicClick={handleTopicClick} />
      {tickerData && <NewsTicker data={tickerData} />}
      <main className="container mx-auto px-4 py-8">
        <TrendingTopics
          topics={combinedTopics}
          selectedTopic={selectedTopic}
          onTopicClick={handleTopicClick}
        />
        <div className="flex justify-between items-center my-6 border-b-2 border-slate-200 pb-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {selectedTopic ? selectedTopic : "Em Destaque"}
          </h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsArchiveOpen(true)}
              className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-lg hover:bg-slate-200 transition-colors border border-slate-200 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Histórico
            </button>
            <button
              onClick={handleUpdateOrViewAll}
              className="px-5 py-2.5 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 transition-colors shadow-lg disabled:opacity-50"
              disabled={isLoading}
            >
              {selectedTopic ? "Ver Todos" : "Atualizar"}
            </button>
          </div>
        </div>
        {renderContent()}
      </main>

      <Archive
        articles={archivedArticles}
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
      />
      <footer className="bg-white text-center p-6 text-sm text-slate-500 border-t border-slate-200">
        <p className="mb-2">&copy; {new Date().getFullYear()} ALEATORIONEWS.COM.BR - Todos os direitos reservados.</p>
        <p className="text-xs">
          Todo o conteúdo deste site é gerado por inteligência artificial e destina-se a fins de entretenimento e informação.
          As imagens são fornecidas por Unsplash. O conteúdo não representa jornalismo factual. v1.9.5 (AdSense Ready)
        </p>
      </footer>
    </div>
  );
};

export default App;
