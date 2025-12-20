import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';
import { financeService } from '../services/financeService';
import { FinancialSummary } from '../types/finance';

export const Dashboard: React.FC = () => {
    const [summary, setSummary] = useState<FinancialSummary | null>(null);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        loadSummary();
    }, [selectedYear]);

    const loadSummary = () => {
        const data = financeService.getFinancialSummary();
        setSummary(data);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    if (!summary) {
        return <div>Carregando...</div>;
    }

    const saldoPositivo = summary.saldoTotal >= 0;

    return (
        <div className="dashboard fade-in">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1>Dashboard Financeiro</h1>
                    <p className="text-muted">Visão geral das suas finanças</p>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar size={20} />
                    <select
                        className="form-select"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        style={{ width: 'auto' }}
                    >
                        {[2023, 2024, 2025, 2026].map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-3 mb-4">
                {/* Contas a Receber */}
                <div className="stat-card success">
                    <div className="stat-label">Contas a Receber</div>
                    <div className="stat-value text-success">
                        {formatCurrency(summary.totalReceber)}
                    </div>
                    <div className="stat-change positive">
                        <TrendingUp size={16} />
                        <span>Receitas</span>
                    </div>
                </div>

                {/* Contas a Pagar */}
                <div className="stat-card danger">
                    <div className="stat-label">Contas a Pagar</div>
                    <div className="stat-value text-danger">
                        {formatCurrency(summary.totalPagar)}
                    </div>
                    <div className="stat-change negative">
                        <TrendingDown size={16} />
                        <span>Despesas</span>
                    </div>
                </div>

                {/* Saldo Total */}
                <div className={`stat-card ${saldoPositivo ? 'success' : 'danger'}`}>
                    <div className="stat-label">Saldo Total</div>
                    <div className={`stat-value ${saldoPositivo ? 'text-success' : 'text-danger'}`}>
                        {formatCurrency(summary.saldoTotal)}
                    </div>
                    <div className={`stat-change ${saldoPositivo ? 'positive' : 'negative'}`}>
                        <DollarSign size={16} />
                        <span>{saldoPositivo ? 'Positivo' : 'Negativo'}</span>
                    </div>
                </div>
            </div>

            {/* Resumo Mensal */}
            <div className="card">
                <h3>Resumo Mensal - {selectedYear}</h3>
                <div className="table-container mt-2">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Mês</th>
                                <th className="text-right">Contas a Receber</th>
                                <th className="text-right">Contas a Pagar</th>
                                <th className="text-right">Saldo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summary.monthlyData.map((month) => {
                                const monthNames = [
                                    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                                    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
                                ];
                                const saldoPositivo = month.saldo >= 0;

                                return (
                                    <tr key={month.month}>
                                        <td><strong>{monthNames[month.month]}</strong></td>
                                        <td className="text-right text-success">
                                            {formatCurrency(month.contasAReceber)}
                                        </td>
                                        <td className="text-right text-danger">
                                            {formatCurrency(month.contasAPagar)}
                                        </td>
                                        <td className={`text-right ${saldoPositivo ? 'text-success' : 'text-danger'}`}>
                                            <strong>{formatCurrency(month.saldo)}</strong>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr style={{ borderTop: '2px solid rgba(255, 255, 255, 0.1)' }}>
                                <td><strong>TOTAL</strong></td>
                                <td className="text-right text-success">
                                    <strong>{formatCurrency(summary.totalReceber)}</strong>
                                </td>
                                <td className="text-right text-danger">
                                    <strong>{formatCurrency(summary.totalPagar)}</strong>
                                </td>
                                <td className={`text-right ${saldoPositivo ? 'text-success' : 'text-danger'}`}>
                                    <strong>{formatCurrency(summary.saldoTotal)}</strong>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};
