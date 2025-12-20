// Tipos para transações financeiras
export interface Transaction {
  id: string;
  type: 'pagar' | 'receber';
  description: string;
  amount: number;
  date: Date;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Dados agregados por mês
export interface MonthlyData {
  month: number; // 0-11 (Janeiro = 0)
  year: number;
  contasAPagar: number;
  contasAReceber: number;
  saldo: number;
  transactions: Transaction[];
}

// Resumo financeiro geral
export interface FinancialSummary {
  totalPagar: number;
  totalReceber: number;
  saldoTotal: number;
  monthlyData: MonthlyData[];
}

// Filtro de período
export interface PeriodFilter {
  startDate: Date;
  endDate: Date;
  type?: 'month' | 'year' | 'custom';
}

// Categoria de transação
export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
}
