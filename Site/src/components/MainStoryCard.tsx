import React from 'react';
import type { NewsArticle } from '../types';

interface MainStoryCardProps {
    article: NewsArticle;
}

const MainStoryCard: React.FC<MainStoryCardProps> = ({ article }) => {
    const formattedDate = new Date(article.publishedDate).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg shadow-purple-900/20 mb-8 grid grid-cols-1 md:grid-cols-2 group">
            <div className="p-6 flex flex-col justify-center order-2 md:order-1">
                 <span className="inline-block bg-purple-600 text-purple-100 text-sm font-semibold px-3 py-1 rounded-full mb-4 self-start">
                    {article.topic}
                </span>
                <h1 className="text-3xl lg:text-4xl font-extrabold mb-3 text-white group-hover:text-purple-400 transition-colors duration-300">
                    {article.title}
                </h1>
                <div className="text-sm text-gray-400 mb-4 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span>Por <strong className="text-gray-200 font-semibold">{article.author}</strong></span>
                    <span className="text-gray-500 hidden sm:inline">•</span>
                    <span>{formattedDate}</span>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {article.summary}
                </p>
                {article.sources && article.sources.length > 0 && (
                <div className="mt-auto pt-4 border-t border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Fontes</h3>
                    <ul className="space-y-1">
                    {article.sources.slice(0, 2).map((source, index) => (
                        <li key={index} className="truncate">
                        <a
                            href={source.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                            title={source.title}
                        >
                            {source.title}
                        </a>
                        </li>
                    ))}
                    </ul>
                </div>
                )}
            </div>
             <div className="min-h-[250px] md:min-h-full order-1 md:order-2">
                 <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
             </div>
        </div>
    );
};

export default MainStoryCard;
