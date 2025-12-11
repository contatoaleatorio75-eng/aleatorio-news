
import React from 'react';

export const About: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-gray-200">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-extrabold text-white mb-8">Sobre Nós</h1>

                <div className="bg-slate-800 rounded-lg p-8 space-y-6">
                    <section>
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4">O que é o Aleatorio News?</h2>
                        <p className="text-gray-300 leading-relaxed">
                            O <strong>ALEATORIONEWS.COM.BR</strong> é uma plataforma inovadora de notícias que utiliza
                            inteligência artificial de última geração para gerar conteúdo informativo e envolvente sobre
                            diversos tópicos, incluindo Ciência, Tecnologia e Atualidades.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4">Nossa Missão</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Nossa missão é democratizar o acesso à informação através da tecnologia, oferecendo uma
                            experiência de leitura moderna, dinâmica e acessível para todos os públicos.
                        </p>
                    </section>

                    <section className="bg-yellow-500/10 border-l-4 border-yellow-500 p-6 rounded">
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4">⚠️ Transparência e Responsabilidade</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            <strong>IMPORTANTE:</strong> Todo o conteúdo editorial deste site é gerado por inteligência
                            artificial e destina-se exclusivamente a fins de entretenimento e informação geral.
                        </p>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            Nosso conteúdo <strong>NÃO representa jornalismo factual</strong> e não deve ser considerado
                            como fonte primária ou única de notícias. Sempre verifique informações importantes através de
                            fontes jornalísticas tradicionais e confiáveis.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            As imagens utilizadas são fornecidas por <a href="https://unsplash.com" target="_blank"
                                rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400 underline">Unsplash</a>
                            e são de uso livre.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4">Tecnologias Utilizadas</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            O Aleatorio News é construído com tecnologias modernas e de ponta:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                            <li><strong>Google Gemini AI:</strong> Inteligência artificial para geração de conteúdo</li>
                            <li><strong>React + TypeScript:</strong> Interface moderna e responsiva</li>
                            <li><strong>Vite:</strong> Build tool rápido e eficiente</li>
                            <li><strong>Tailwind CSS:</strong> Design system profissional</li>
                            <li><strong>Vercel:</strong> Hospedagem e deploy contínuo</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4">Categorias de Conteúdo</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-slate-700 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold text-white mb-2">🔬 Ciência</h3>
                                <p className="text-gray-300 text-sm">
                                    Descobertas científicas, pesquisas e avanços tecnológicos
                                </p>
                            </div>
                            <div className="bg-slate-700 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold text-white mb-2">💻 Tecnologia</h3>
                                <p className="text-gray-300 text-sm">
                                    Inovações, gadgets e tendências do mundo tech
                                </p>
                            </div>
                            <div className="bg-slate-700 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold text-white mb-2">📰 Atualidades</h3>
                                <p className="text-gray-300 text-sm">
                                    Eventos, tendências e tópicos relevantes do momento
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4">Compromisso com a Privacidade</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Respeitamos sua privacidade e seguimos rigorosamente a Lei Geral de Proteção de Dados (LGPD).
                            Para mais informações, consulte nossa <a href="/privacidade"
                                className="text-yellow-500 hover:text-yellow-400 underline">Política de Privacidade</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4">Contato</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Tem dúvidas, sugestões ou quer entrar em contato conosco? Visite nossa página de
                            <a href="/contato" className="text-yellow-500 hover:text-yellow-400 underline ml-1">Contato</a>.
                        </p>
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
