import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { financeService } from '../services/financeService';
import { Transaction } from '../types/finance';

interface EntryFormProps {
    onTransactionAdded?: () => void;
}

export const EntryForm: React.FC<EntryFormProps> = ({ onTransactionAdded }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        type: 'receber' as 'pagar' | 'receber',
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const transaction = {
            type: formData.type,
            description: formData.description,
            amount: parseFloat(formData.amount),
            date: new Date(formData.date),
            category: formData.category || undefined,
        };

        financeService.addTransaction(transaction);

        // Reset form
        setFormData({
            type: 'receber',
            description: '',
            amount: '',
            date: new Date().toISOString().split('T')[0],
            category: '',
        });

        setIsOpen(false);

        // Notify parent component
        if (onTransactionAdded) {
            onTransactionAdded();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
            {/* Botão para abrir formulário */}
            {!isOpen && (
                <button
                    className="btn btn-primary"
                    onClick={() => setIsOpen(true)}
                >
                    <Plus size={20} />
                    Nova Transação
                </button>
            )}

            {/* Formulário */}
            {isOpen && (
                <div className="card card-glass fade-in">
                    <div className="flex justify-between items-center mb-3">
                        <h3>Nova Transação</h3>
                        <button
                            className="btn btn-outline"
                            onClick={() => setIsOpen(false)}
                            style={{ padding: '0.5rem' }}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Tipo */}
                        <div className="form-group">
                            <label className="form-label">Tipo</label>
                            <select
                                name="type"
                                className="form-select"
                                value={formData.type}
                                onChange={handleChange}
                                required
                            >
                                <option value="receber">Conta a Receber</option>
                                <option value="pagar">Conta a Pagar</option>
                            </select>
                        </div>

                        {/* Descrição */}
                        <div className="form-group">
                            <label className="form-label">Descrição</label>
                            <input
                                type="text"
                                name="description"
                                className="form-input"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Ex: Salário, Aluguel, Compras..."
                                required
                            />
                        </div>

                        {/* Valor */}
                        <div className="form-group">
                            <label className="form-label">Valor (R$)</label>
                            <input
                                type="number"
                                name="amount"
                                className="form-input"
                                value={formData.amount}
                                onChange={handleChange}
                                placeholder="0,00"
                                step="0.01"
                                min="0"
                                required
                            />
                        </div>

                        {/* Data */}
                        <div className="form-group">
                            <label className="form-label">Data</label>
                            <input
                                type="date"
                                name="date"
                                className="form-input"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Categoria (opcional) */}
                        <div className="form-group">
                            <label className="form-label">Categoria (opcional)</label>
                            <input
                                type="text"
                                name="category"
                                className="form-input"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="Ex: Moradia, Alimentação, Lazer..."
                            />
                        </div>

                        {/* Botões */}
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className={`btn ${formData.type === 'receber' ? 'btn-success' : 'btn-danger'}`}
                                style={{ flex: 1 }}
                            >
                                <Plus size={20} />
                                Adicionar {formData.type === 'receber' ? 'Receita' : 'Despesa'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};
