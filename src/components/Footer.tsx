
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-purple-800/50 mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} ALEATORIO NEWS. Todos os direitos reservados.</p>
        <p className="text-sm mt-1">ALEATORIONEWS.COM.BR</p>
      </div>
    </footer>
  );
};

export default Footer;
