
import React from 'react';

export const AdPlaceholder: React.FC = () => {
  return (
    <div className="bg-slate-800 rounded-lg p-4 h-full flex flex-col justify-center items-center text-center text-slate-500 sticky top-24">
      <span className="text-xs">PUBLICIDADE</span>
      <div className="w-full h-64 bg-slate-700 mt-2 rounded flex items-center justify-center">
        <p className="text-sm font-semibold">Espaço Publicitário</p>
      </div>
    </div>
  );
};
