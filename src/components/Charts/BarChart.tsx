import React from 'react';
import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { MonthlyData } from '../../types/finance';

interface BarChartProps {
    data: MonthlyData[];
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
    const monthNames = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const chartData = data.map(month => ({
        name: monthNames[month.month],
        'Receitas': month.contasAReceber,
        'Despesas': month.contasAPagar,
    }));

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="card">
            <h3 className="mb-3">Comparativo Mensal</h3>
            <ResponsiveContainer width="100%" height={400}>
                <RechartsBarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                    <XAxis
                        dataKey="name"
                        stroke="#94a3b8"
                        style={{ fontSize: '0.875rem' }}
                    />
                    <YAxis
                        stroke="#94a3b8"
                        style={{ fontSize: '0.875rem' }}
                        tickFormatter={formatCurrency}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1e293b',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '0.5rem',
                            color: '#f1f5f9',
                        }}
                        formatter={(value: number) => formatCurrency(value)}
                    />
                    <Legend
                        wrapperStyle={{ paddingTop: '1rem' }}
                    />
                    <Bar
                        dataKey="Receitas"
                        fill="#10b981"
                        radius={[8, 8, 0, 0]}
                    />
                    <Bar
                        dataKey="Despesas"
                        fill="#ef4444"
                        radius={[8, 8, 0, 0]}
                    />
                </RechartsBarChart>
            </ResponsiveContainer>
        </div>
    );
};
