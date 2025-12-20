import React from 'react';
import logo from '../assets/logo.jpg';

interface HeaderProps {
  onTopicClick: (topic: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onTopicClick }) => {
  const categories = ["Ciência", "Tecnologia", "Atualidades"];

  return (
    <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onTopicClick("")}>
          <img
            src={logo}
            alt="Aleatorio Logo"
            className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-cyan-500/20"
          />
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tighter">
            ALEATORIO<span className="text-cyan-600">NEWS</span>
          </h1>
        </div>
        <div className="flex items-center ml-auto lg:ml-4">
          <a
            href="https://www.youtube.com/@AlêAtório_cnl01"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors border border-red-200"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
            <span className="hidden sm:inline">Acesse e Inscreva-se no nosso canal no Youtube</span>
            <span className="sm:hidden text-[11px]">Inscrever-se no Youtube</span>
          </a>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onTopicClick(category)}
              className="text-slate-600 hover:text-cyan-600 transition-colors font-semibold"
            >
              {category}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
