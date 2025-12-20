import React from 'react';
import {
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { MonthlyData } from '../../types/finance';

interface LineChartProps {
    data: MonthlyData[];
}

export const LineChart: React.FC<LineChartProps> = ({ data }) => {
    const monthNames = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const chartData = data.map(month => ({
        name: monthNames[month.month],
        'Contas a Receber': month.contasAReceber,
        'Contas a Pagar': month.contasAPagar,
        'Saldo': month.saldo,
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
            <h3 className="mb-3">Evolução Mensal</h3>
            <ResponsiveContainer width="100%" height={400}>
                <RechartsLineChart data={chartData}>
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
                        iconType="line"
                    />
                    <Line
                        type="monotone"
                        dataKey="Contas a Receber"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: '#10b981', r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="Contas a Pagar"
                        stroke="#ef4444"
                        strokeWidth={3}
                        dot={{ fill: '#ef4444', r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="Saldo"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: '#3b82f6', r: 3 }}
                    />
                </RechartsLineChart>
            </ResponsiveContainer>
        </div>
    );
};
