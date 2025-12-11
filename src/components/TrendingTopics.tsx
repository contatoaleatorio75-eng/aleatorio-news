
import React from 'react';

interface TrendingTopicsProps {
  topics: string[];
  selectedTopic: string | null;
  onTopicClick: (topic: string) => void;
}

export const TrendingTopics: React.FC<TrendingTopicsProps> = ({ topics, selectedTopic, onTopicClick }) => {
  return (
    <div className="flex overflow-x-auto space-x-3 pb-3 -mx-4 px-4">
      {topics.map((topic) => (
        <button
          key={topic}
          onClick={() => onTopicClick(topic)}
          className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors duration-200 border
            ${selectedTopic === topic
              ? 'bg-cyan-500 text-white shadow-md border-cyan-500'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
            }`}
        >
          {topic}
        </button>
      ))}
    </div>
  );
};
