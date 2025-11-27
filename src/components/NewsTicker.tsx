
import React from 'react';
import type { TickerData } from '../types';

interface NewsTickerProps {
  data: TickerData;
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ data }) => {
  const tickerItems = [
    `CLIMA: ${data.weather.city} ${data.weather.temperature}, ${data.weather.condition}`,
    `DÓLAR: R$ ${data.dollarRate}`,
    ...data.headlines.map(h => `URGENTE: ${h}`)
  ];

  return (
    <>
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .ticker-content {
          animation: ticker-scroll 40s linear infinite;
        }
        .ticker-container:hover .ticker-content {
          animation-play-state: paused;
        }
      `}</style>
      <div className="bg-yellow-500 text-slate-900 py-2 overflow-hidden ticker-container">
        <div className="whitespace-nowrap ticker-content flex">
          {tickerItems.map((item, index) => (
            <span key={index} className="mx-8 font-bold text-sm tracking-wider">
              {item}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {tickerItems.map((item, index) => (
            <span key={`dup-${index}`} className="mx-8 font-bold text-sm tracking-wider">
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};
