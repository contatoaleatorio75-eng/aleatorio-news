import React, { useState, useEffect } from 'react';

export const CookieNotice: React.FC = () => {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Show notice after a small delay for better UX
      setTimeout(() => setShowNotice(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setShowNotice(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setShowNotice(false);
  };

  if (!showNotice) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm text-white p-4 md:p-6 shadow-2xl z-50 border-t-2 border-cyan-500 animate-slide-up">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">🍪</span>
          <div>
            <h3 className="font-bold text-base md:text-lg mb-1">Política de Cookies</h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Este site utiliza cookies para melhorar sua experiência de navegação e exibir anúncios personalizados através do Google AdSense. 
              Ao aceitar, você concorda com o uso de cookies conforme nossa política de privacidade.
            </p>
          </div>
        </div>
        <div className="flex gap-3 flex-shrink-0 w-full md:w-auto">
          <button
            onClick={handleReject}
            className="flex-1 md:flex-none px-5 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-all text-sm border border-slate-600 hover:border-slate-500"
            aria-label="Rejeitar cookies"
          >
            Rejeitar
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 md:flex-none px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-bold transition-all text-sm shadow-lg hover:shadow-cyan-500/50"
            aria-label="Aceitar cookies"
          >
            Aceitar Cookies
          </button>
        </div>
      </div>
    </div>
  );
};
