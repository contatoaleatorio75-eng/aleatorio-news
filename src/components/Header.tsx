
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img
            src="/logo.jpg"
            alt="Aleatorio Logo"
            className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-cyan-500/20"
          />
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-wider">
            ALEATORIO <span className="text-cyan-600">NEWS</span>
          </h1>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-slate-600 hover:text-cyan-600 transition-colors font-semibold">Ciência</a>
          <a href="#" className="text-slate-600 hover:text-cyan-600 transition-colors font-semibold">Tecnologia</a>
          <a href="#" className="text-slate-600 hover:text-cyan-600 transition-colors font-semibold">Atualidades</a>
        </nav>
      </div>
    </header>
  );
};
