
import React from 'react';

export const Contact: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-gray-200">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-extrabold text-white mb-8">Contato</h1>

                <div className="bg-slate-800 rounded-lg p-8 space-y-6">
                    <section>
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4">Entre em Contato</h2>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            Tem dúvidas, sugestões ou quer falar conosco? Estamos aqui para ajudar!
                        </p>
                    </section>

                    <section className="bg-slate-700 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-white mb-4">📧 Email</h3>
                        <p className="text-gray-300 mb-2">
                            Para questões gerais, sugestões ou parcerias:
                        </p>
                        <a href="mailto:contato@aleatorionews.com.br"
                            className="text-yellow-500 hover:text-yellow-400 text-lg font-semibold">
                            contato@aleatorionews.com.br
                        </a>
                    </section>

                    <section className="bg-slate-700 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-white mb-4">🔒 Privacidade e Dados</h3>
                        <p className="text-gray-300 mb-2">
                            Para questões relacionadas à privacidade e proteção de dados (LGPD):
                        </p>
                        <a href="mailto:privacidade@aleatorionews.com.br"
                            className="text-yellow-500 hover:text-yellow-400 text-lg font-semibold">
                            privacidade@aleatorionews.com.br
                        </a>
                    </section>

                    <section className="bg-slate-700 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-white mb-4">💼 Publicidade</h3>
                        <p className="text-gray-300 mb-2">
                            Interessado em anunciar conosco?
                        </p>
                        <a href="mailto:publicidade@aleatorionews.com.br"
                            className="text-yellow-500 hover:text-yellow-400 text-lg font-semibold">
                            publicidade@aleatorionews.com.br
                        </a>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4">📍 Informações</h2>
                        <div className="space-y-3 text-gray-300">
                            <p>
                                <strong className="text-white">Site:</strong>
                                <a href="https://aleatorionews.com.br" className="text-yellow-500 hover:text-yellow-400 ml-2">
                                    www.aleatorionews.com.br
                                </a>
                            </p>
                            <p>
                                <strong className="text-white">Horário de Atendimento:</strong>
                                <span className="ml-2">Segunda a Sexta, 9h às 18h (horário de Brasília)</span>
                            </p>
                            <p>
                                <strong className="text-white">Tempo de Resposta:</strong>
                                <span className="ml-2">Até 48 horas úteis</span>
                            </p>
                        </div>
                    </section>

                    <section className="bg-yellow-500/10 border-l-4 border-yellow-500 p-6 rounded">
                        <h3 className="text-xl font-semibold text-yellow-500 mb-3">ℹ️ Importante</h3>
                        <p className="text-gray-300 leading-relaxed">
                            Lembre-se que todo o conteúdo do Aleatorio News é gerado por inteligência artificial
                            e destina-se a fins de entretenimento e informação. Para questões jornalísticas ou
                            verificação de fatos, recomendamos consultar fontes de notícias tradicionais.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4">🔗 Links Úteis</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <a href="/sobre"
                                className="bg-slate-700 p-4 rounded-lg hover:bg-slate-600 transition-colors">
                                <h4 className="text-white font-semibold mb-2">Sobre Nós</h4>
                                <p className="text-gray-300 text-sm">Conheça mais sobre o Aleatorio News</p>
                            </a>
                            <a href="/privacidade"
                                className="bg-slate-700 p-4 rounded-lg hover:bg-slate-600 transition-colors">
                                <h4 className="text-white font-semibold mb-2">Política de Privacidade</h4>
                                <p className="text-gray-300 text-sm">Como tratamos seus dados</p>
                            </a>
                        </div>
                    </section>
                </div>

                <div className="mt-8 text-center">
                    <a href="/" className="inline-block px-6 py-3 bg-yellow-500 text-slate-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors">
                        Voltar para a Página Inicial
                    </a>
                </div>
            </div>
        </div>
    );
};
