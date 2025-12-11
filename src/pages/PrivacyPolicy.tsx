
import React from 'react';

export const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-gray-200">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-extrabold text-white mb-8">Política de Privacidade</h1>

                <div className="bg-slate-800 rounded-lg p-8 space-y-6">
                    <section>
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4">1. Informações Gerais</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Esta Política de Privacidade descreve como o <strong>ALEATORIONEWS.COM.BR</strong> coleta,
                            usa e protege as informações dos visitantes do nosso site. Ao acessar este site, você concorda
                            com os termos desta política.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4">2. Conteúdo Gerado por IA</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Todo o conteúdo editorial deste site é gerado por inteligência artificial e destina-se a fins
                            de entretenimento e informação. O conteúdo não representa jornalismo factual e não deve ser
                            considerado como fonte primária de notícias.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4">3. Cookies e Tecnologias Similares</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            Utilizamos cookies e tecnologias similares para melhorar sua experiência de navegação.
                            Os cookies são pequenos arquivos de texto armazenados no seu dispositivo.
                        </p>
                        <h3 className="text-xl font-semibold text-white mb-2">Tipos de Cookies Utilizados:</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                            <li><strong>Cookies Essenciais:</strong> Necessários para o funcionamento básico do site</li>
                            <li><strong>Cookies de Análise:</strong> Google Analytics para entender como os visitantes usam o site</li>
                            <li><strong>Cookies de Publicidade:</strong> Google AdSense para exibir anúncios relevantes</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4">4. Google AdSense</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            Este site utiliza o Google AdSense para exibir anúncios. O Google AdSense usa cookies para
                            exibir anúncios com base em visitas anteriores a este ou outros sites.
                        </p>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            Os cookies de publicidade permitem que o Google e seus parceiros exibam anúncios com base
                            em suas visitas a este site e/ou outros sites na Internet.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            Você pode desativar a publicidade personalizada visitando as
                            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer"
                                className="text-yellow-500 hover:text-yellow-400 underline ml-1">
                                Configurações de Anúncios do Google
                            </a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4">5. Google Analytics</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Utilizamos o Google Analytics para analisar o uso do nosso site. O Google Analytics coleta
                            informações como páginas visitadas, tempo de permanência e origem do tráfego. Essas informações
                            são anônimas e não identificam visitantes individualmente.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4">6. Informações Coletadas</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            Podemos coletar as seguintes informações:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                            <li>Endereço IP</li>
                            <li>Tipo de navegador e dispositivo</li>
                            <li>Páginas visitadas e tempo de permanência</li>
                            <li>Origem do tráfego (como você chegou ao nosso site)</li>
                            <li>Localização geográfica aproximada</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4">7. Uso das Informações</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            As informações coletadas são utilizadas para:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                            <li>Melhorar a experiência do usuário</li>
                            <li>Analisar tendências e padrões de uso</li>
                            <li>Exibir anúncios relevantes</li>
                            <li>Manter a segurança do site</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4">8. Compartilhamento de Informações</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Não vendemos, trocamos ou transferimos suas informações pessoais para terceiros, exceto
                            para parceiros confiáveis que nos ajudam a operar o site (como Google AdSense e Google Analytics),
                            desde que concordem em manter essas informações confidenciais.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4">9. Links de Terceiros</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Este site pode conter links para sites de terceiros. Não somos responsáveis pelas práticas
                            de privacidade desses sites. Recomendamos que você leia as políticas de privacidade de cada
                            site que visitar.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4">10. Direitos do Usuário (LGPD)</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                            <li>Confirmação da existência de tratamento de dados</li>
                            <li>Acesso aos seus dados</li>
                            <li>Correção de dados incompletos ou desatualizados</li>
                            <li>Eliminação de dados desnecessários</li>
                            <li>Revogação do consentimento</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4">11. Segurança</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Implementamos medidas de segurança para proteger suas informações contra acesso não autorizado,
                            alteração, divulgação ou destruição. No entanto, nenhum método de transmissão pela Internet
                            é 100% seguro.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4">12. Menores de Idade</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Este site não é direcionado a menores de 18 anos. Não coletamos intencionalmente informações
                            de menores de idade.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4">13. Alterações nesta Política</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que você revise
                            esta página regularmente para se manter informado sobre como protegemos suas informações.
                        </p>
                        <p className="text-gray-300 leading-relaxed mt-3">
                            <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4">14. Contato</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Se você tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento de seus dados,
                            entre em contato conosco através da página de <a href="/contato" className="text-yellow-500 hover:text-yellow-400 underline">Contato</a>.
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
