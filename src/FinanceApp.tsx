import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, FileText, Settings } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { EntryForm } from './components/EntryForm';
import { LineChart } from './components/Charts/LineChart';
import { BarChart } from './components/Charts/BarChart';
import { financeService } from './services/financeService';
import { MonthlyData } from './types/finance';
import '../styles/finance.css';

type View = 'dashboard' | 'charts' | 'reports';

export const FinanceApp: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>('dashboard');
    const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        loadData();
    }, [refreshKey]);

    const loadData = () => {
        const year = new Date().getFullYear();
        const data = financeService.getMonthlyData(year);
        setMonthlyData(data);
    };

    const handleTransactionAdded = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="finance-app">
            {/* Header */}
            <header className="mb-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 style={{
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            marginBottom: '0.5rem'
                        }}>
                            💰 Gestão Financeira
                        </h1>
                        <p className="text-muted">Controle suas finanças de forma simples e eficiente</p>
                    </div>
                    <EntryForm onTransactionAdded={handleTransactionAdded} />
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="card mb-4" style={{ padding: 'var(--spacing-md)' }}>
                <div className="flex gap-2">
                    <button
                        className={`btn ${currentView === 'dashboard' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setCurrentView('dashboard')}
                    >
                        <BarChart3 size={20} />
                        Dashboard
                    </button>
                    <button
                        className={`btn ${currentView === 'charts' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setCurrentView('charts')}
                    >
                        <TrendingUp size={20} />
                        Gráficos
                    </button>
                    <button
                        className={`btn ${currentView === 'reports' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setCurrentView('reports')}
                    >
                        <FileText size={20} />
                        Relatórios
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="content">
                {currentView === 'dashboard' && (
                    <Dashboard key={refreshKey} />
                )}

                {currentView === 'charts' && (
                    <div className="grid grid-2 gap-3">
                        <LineChart data={monthlyData} />
                        <BarChart data={monthlyData} />
                    </div>
                )}

                {currentView === 'reports' && (
                    <div className="card">
                        <h2>Relatórios</h2>
                        <p className="text-muted mt-2">
                            Funcionalidade de relatórios em desenvolvimento. Em breve você poderá:
                        </p>
                        <ul className="mt-3" style={{ paddingLeft: '1.5rem', color: 'var(--color-text-secondary)' }}>
                            <li>Exportar dados para Excel/CSV</li>
                            <li>Gerar relatórios PDF personalizados</li>
                            <li>Análise de tendências e previsões</li>
                            <li>Comparativos entre períodos</li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="mt-4 text-center text-muted" style={{ fontSize: '0.875rem' }}>
                <p>© {new Date().getFullYear()} Gestão Financeira - Seus dados são salvos localmente no navegador</p>
            </footer>
        </div>
    );
};
