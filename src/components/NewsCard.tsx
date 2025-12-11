
import React from 'react';
import type { NewsArticle } from '../types';
import { SourceLinkIcon } from './icons/SourceLinkIcon';

interface NewsCardProps {
  article: NewsArticle;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full transform hover:-translate-y-1 transition-transform duration-300">
      <img src={article.imageUrl} alt={article.title} className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-2 flex-grow">{article.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{article.content}</p>
        <div>
          <h4 className="text-xs font-semibold text-yellow-400 mb-1">Saiba Mais:</h4>
          {article.sources.slice(0, 1).map((source) => (
            <a
              key={source.uri}
              href={source.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-xs text-gray-400 hover:text-yellow-500 transition-colors truncate"
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
