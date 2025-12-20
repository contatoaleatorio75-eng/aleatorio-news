
import React from 'react';
import type { NewsArticle } from '../types';
import { SourceLinkIcon } from './icons/SourceLinkIcon';

interface NewsCardProps {
  article: NewsArticle;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border border-slate-100">
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-40 object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"; // Fallback Tech Generic
        }}
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-900 mb-2 flex-grow">{article.title}</h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-3">{article.content}</p>
        <div>
          <h4 className="text-xs font-semibold text-cyan-600 mb-1">Saiba Mais:</h4>
          {article.sources.slice(0, 1).map((source) => (
            <a
              key={source.uri}
              href={source.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-xs text-slate-500 hover:text-cyan-600 transition-colors truncate"
            >
              <SourceLinkIcon className="w-3 h-3 mr-1.5 flex-shrink-0" />
              <span className="truncate">{source.title || source.uri}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
