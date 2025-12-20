
import React from 'react';
import type { NewsArticle } from '../types';
import { NewsCard } from './NewsCard';

interface ArchiveProps {
    articles: NewsArticle[];
    isOpen: boolean;
    onClose: () => void;
}

export const Archive: React.FC<ArchiveProps> = ({ articles, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-900/80 backdrop-blur-md">
            <div className="min-h-screen px-4 py-12">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                        <div>
                            <h2 className="text-3xl font-extrabold text-slate-900">Histórico de Notícias</h2>
                            <p className="text-slate-500">Artigos gerados anteriormente</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {articles.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-xl shadow-lg">
                            <p className="text-slate-400 text-xl font-semibold">Nenhum artigo no histórico ainda.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {articles.map((article, index) => (
                                <div key={article.id || index} className="flex flex-col h-full bg-white rounded-xl shadow-lg border border-slate-100 p-2">
                                    <span className="text-[10px] font-bold text-slate-400 mb-2 ml-2">
                                        {article.timestamp ? new Date(article.timestamp).toLocaleString('pt-BR') : ''}
                                    </span>
                                    <NewsCard article={article} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
