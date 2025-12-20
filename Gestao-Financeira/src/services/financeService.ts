import { Transaction, MonthlyData, FinancialSummary, PeriodFilter } from '../types/finance';

const STORAGE_KEY = 'finance_transactions';

class FinanceService {
    // Obter todas as transações
    getAllTransactions(): Transaction[] {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return [];

        const transactions = JSON.parse(data);
        // Converter strings de data de volta para objetos Date
        return transactions.map((t: any) => ({
            ...t,
            date: new Date(t.date),
            createdAt: new Date(t.createdAt),
            updatedAt: new Date(t.updatedAt),
        }));
    }

    // Salvar transações
    private saveTransactions(transactions: Transaction[]): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }

    // Adicionar nova transação
    addTransaction(transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Transaction {
        const transactions = this.getAllTransactions();
        const newTransaction: Transaction = {
            ...transaction,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        transactions.push(newTransaction);
        this.saveTransactions(transactions);
        return newTransaction;
    }

    // Atualizar transação
    updateTransaction(id: string, updates: Partial<Transaction>): Transaction | null {
        const transactions = this.getAllTransactions();
        const index = transactions.findIndex(t => t.id === id);

        if (index === -1) return null;

        transactions[index] = {
            ...transactions[index],
            ...updates,
            updatedAt: new Date(),
        };

        this.saveTransactions(transactions);
        return transactions[index];
    }

    // Deletar transação
    deleteTransaction(id: string): boolean {
        const transactions = this.getAllTransactions();
        const filtered = transactions.filter(t => t.id !== id);

        if (filtered.length === transactions.length) return false;

        this.saveTransactions(filtered);
        return true;
    }

    // Obter dados mensais agregados
    getMonthlyData(year: number): MonthlyData[] {
        const transactions = this.getAllTransactions();
        const monthlyMap = new Map<number, MonthlyData>();

        // Inicializar todos os meses
        for (let month = 0; month < 12; month++) {
            monthlyMap.set(month, {
                month,
                year,
                contasAPagar: 0,
                contasAReceber: 0,
                saldo: 0,
                transactions: [],
            });
        }

        // Agregar transações
        transactions.forEach(transaction => {
            const transactionDate = new Date(transaction.date);
            if (transactionDate.getFullYear() !== year) return;

            const month = transactionDate.getMonth();
            const data = monthlyMap.get(month)!;

            if (transaction.type === 'pagar') {
                data.contasAPagar += transaction.amount;
            } else {
                data.contasAReceber += transaction.amount;
            }

            data.transactions.push(transaction);
        });

        // Calcular saldo
        monthlyMap.forEach(data => {
            data.saldo = data.contasAReceber - data.contasAPagar;
        });

        return Array.from(monthlyMap.values());
    }

    // Obter resumo financeiro
    getFinancialSummary(filter?: PeriodFilter): FinancialSummary {
        let transactions = this.getAllTransactions();

        // Aplicar filtro de período se fornecido
        if (filter) {
            transactions = transactions.filter(t => {
                const date = new Date(t.date);
                return date >= filter.startDate && date <= filter.endDate;
            });
        }

        const totalPagar = transactions
            .filter(t => t.type === 'pagar')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalReceber = transactions
            .filter(t => t.type === 'receber')
            .reduce((sum, t) => sum + t.amount, 0);

        const saldoTotal = totalReceber - totalPagar;

        // Obter dados mensais do ano atual ou do filtro
        const year = filter?.startDate.getFullYear() || new Date().getFullYear();
        const monthlyData = this.getMonthlyData(year);

        return {
            totalPagar,
            totalReceber,
            saldoTotal,
            monthlyData,
        };
    }

    // Obter transações por período
    getTransactionsByPeriod(filter: PeriodFilter): Transaction[] {
        const transactions = this.getAllTransactions();
        return transactions.filter(t => {
            const date = new Date(t.date);
            return date >= filter.startDate && date <= filter.endDate;
        });
    }

    // Exportar dados para JSON
    exportData(): string {
        const transactions = this.getAllTransactions();
        return JSON.stringify(transactions, null, 2);
    }

    // Importar dados de JSON
    importData(jsonData: string): boolean {
        try {
            const transactions = JSON.parse(jsonData);
            // Validar estrutura básica
            if (!Array.isArray(transactions)) return false;

            this.saveTransactions(transactions);
            return true;
        } catch (error) {
            console.error('Erro ao importar dados:', error);
            return false;
        }
    }

    // Limpar todos os dados
    clearAllData(): void {
        localStorage.removeItem(STORAGE_KEY);
    }
}

export const financeService = new FinanceService();
