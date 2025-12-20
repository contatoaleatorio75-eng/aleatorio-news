# 💰 Gestão Financeira

Aplicativo web moderno para controle de finanças pessoais, desenvolvido com React + TypeScript + Vite.

## 📋 Funcionalidades

- ✅ **Dashboard Interativo**: Visualização de receitas, despesas e saldo
- ✅ **Entrada de Dados**: Formulário para adicionar contas a pagar e receber
- ✅ **Gráficos Dinâmicos**: Visualização mensal com gráficos de linha e barra
- ✅ **Armazenamento Local**: Dados salvos no navegador (LocalStorage)
- ✅ **Design Moderno**: Interface premium com gradientes e animações
- ✅ **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile

## 🚀 Como Usar

### Instalação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Primeiro Uso

1. Abra o aplicativo no navegador (geralmente em `http://localhost:5173`)
2. Clique em "Nova Transação" para adicionar suas primeiras entradas
3. Escolha entre "Conta a Receber" (receitas) ou "Conta a Pagar" (despesas)
4. Preencha os dados e clique em "Adicionar"
5. Navegue entre Dashboard, Gráficos e Relatórios usando os botões no topo

## 🛠️ Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool rápido
- **Recharts** - Gráficos interativos
- **Lucide React** - Ícones modernos
- **date-fns** - Manipulação de datas

## 📊 Estrutura do Projeto

```
Gestao-Financeira/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx          # Dashboard principal
│   │   ├── EntryForm.tsx          # Formulário de entrada
│   │   └── Charts/
│   │       ├── LineChart.tsx      # Gráfico de linha
│   │       └── BarChart.tsx       # Gráfico de barras
│   ├── services/
│   │   └── financeService.ts      # Lógica de dados
│   ├── types/
│   │   └── finance.ts             # Tipos TypeScript
│   ├── styles/
│   │   └── finance.css            # Estilos globais
│   ├── App.tsx                    # Componente principal
│   └── main.tsx                   # Entry point
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 💾 Armazenamento de Dados

Os dados são salvos localmente no navegador usando LocalStorage. Isso significa:

- ✅ Seus dados permanecem privados
- ✅ Não precisa de internet para funcionar
- ⚠️ Os dados são específicos do navegador
- ⚠️ Limpar o cache do navegador apaga os dados

**Dica**: Use a funcionalidade de exportação (em desenvolvimento) para fazer backup dos seus dados.

## 🎨 Personalização

O arquivo `src/styles/finance.css` contém todas as variáveis CSS para cores, espaçamentos e animações. Você pode personalizar:

- Cores principais (receitas, despesas, neutras)
- Gradientes
- Sombras
- Espaçamentos
- Transições

## 📝 Licença

Este projeto é de código aberto e está disponível para uso pessoal e comercial.

---

**Desenvolvido com ❤️ usando React + TypeScript**
