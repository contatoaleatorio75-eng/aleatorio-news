
import React from 'react';
import type { NewsArticle } from '../types';
import { SourceLinkIcon } from './icons/SourceLinkIcon';

interface MainStoryProps {
  article: NewsArticle;
}

export const MainStory: React.FC<MainStoryProps> = ({ article }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0 border border-slate-100">
      <div className="relative h-64 lg:h-auto">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "https://images.unsplash.com/photo-1504711331083-9c895941bf81?w=800&q=80"; // Fallback Tech
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      <div className="p-6 md:p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">{article.title}</h2>
          <p className="text-slate-600 mb-6 text-lg">{article.content}</p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-cyan-600 mb-2">Saiba Mais Sobre o Assunto:</h4>
          <div className="flex flex-col space-y-2">
            {article.sources.slice(0, 1).map((source) => (
              <a
                key={source.uri}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-slate-500 hover:text-cyan-600 transition-colors truncate"
              >
                <SourceLinkIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">{source.title || source.uri}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
