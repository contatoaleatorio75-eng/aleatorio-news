
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-slate-900 text-2xl font-black">
            A
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-wider">
            ALEATORIO <span className="text-yellow-600">NEWS</span>
          </h1>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-slate-600 hover:text-yellow-600 transition-colors font-semibold">Ciência</a>
          <a href="#" className="text-slate-600 hover:text-yellow-600 transition-colors font-semibold">Tecnologia</a>
          <a href="#" className="text-slate-600 hover:text-yellow-600 transition-colors font-semibold">Atualidades</a>
        </nav>
      </div>
    </header>
  );
};
