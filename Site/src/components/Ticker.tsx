import React from 'react';
import type { TickerData } from '../types';

interface TickerProps {
    data: TickerData | null;
    isLoading: boolean;
}

const Ticker: React.FC<TickerProps> = ({ data, isLoading }) => {
    if (isLoading) {
        return (
            <div className="bg-gray-800/80 backdrop-blur-sm text-white text-sm py-2 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="h-5 bg-gray-700 rounded-full w-3/4 animate-pulse"></div>
                </div>
            </div>
        )
    }

    if (!data) return null;

    const { weather, dollarRate, breakingNews } = data;
    const tickerItems = [
        `CLIMA: ${weather.city} ${weather.temperature}°C ${weather.condition}`,
        `DÓLAR: R$ ${dollarRate.toFixed(2)}`,
        ...breakingNews
    ];

    const tickerContent = tickerItems.join('  •  ');

    return (
        <div className="bg-gray-800/80 backdrop-blur-sm text-white text-sm py-2 overflow-hidden sticky top-[68px] z-40">
           <style>
            {`
                @keyframes ticker-scroll {
                    0% {
                        transform: translateX(0%);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .ticker-content {
                    animation: ticker-scroll 40s linear infinite;
                }
            `}
           </style>
            <div className="whitespace-nowrap">
                 <div className="ticker-content inline-block">
                    <span className="px-4">{tickerContent}</span>
                    <span className="px-4">{tickerContent}</span>
                </div>
            </div>
        </div>
    );
};

export default Ticker;
