
import React from 'react';
import type { NewsArticle } from '../types';
import { SourceLinkIcon } from './icons/SourceLinkIcon';

interface MainStoryProps {
  article: NewsArticle;
}

export const MainStory: React.FC<MainStoryProps> = ({ article }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 border border-slate-100 transform hover:scale-[1.005] transition-transform duration-500 max-h-[500px]">
      <div className="relative h-48 lg:h-auto lg:col-span-5">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "https://images.unsplash.com/photo-1504711331083-9c895941bf81?w=800&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
      </div>
      <div className="p-5 md:p-6 lg:col-span-7 flex flex-col justify-center">
        <div>
          <span className="inline-block px-2 py-1 bg-cyan-100 text-cyan-700 text-[10px] font-bold uppercase tracking-wider rounded mb-3">
            Em Destaque
          </span>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 leading-tight">
            {article.title}
          </h2>
          <p className="text-slate-600 mb-4 text-sm md:text-base line-clamp-3 lg:line-clamp-none">
            {article.content}
          </p>
        </div>
        <div className="pt-2 border-t border-slate-100">
          <h4 className="text-[11px] font-bold text-cyan-600 mb-2 uppercase tracking-tight">Saiba Mais:</h4>
          <div className="flex flex-col space-y-1">
            {article.sources.slice(0, 1).map((source) => (
              <a
                key={source.uri}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-xs text-slate-500 hover:text-cyan-600 transition-colors truncate"
              >
                <SourceLinkIcon className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
                <span className="truncate font-medium">{source.title || "Ler matéria completa"}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
