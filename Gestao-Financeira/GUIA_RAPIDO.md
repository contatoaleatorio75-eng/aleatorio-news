# 🚀 Guia de Início Rápido - Gestão Financeira

## Localização do Projeto

O aplicativo de gestão financeira está localizado em:
```
Site/Gestao-Financeira/
```

Este é um projeto **completamente separado** do site de notícias, com sua própria estrutura e dependências.

## Como Executar

### 1. Navegar até a pasta do projeto

```bash
cd "c:\Users\alexa\Transmissão no Google Drive\Meu Drive\Canais\AleAtorio\SITE\Site\Gestao-Financeira"
```

### 2. Instalar dependências (se ainda não instalou)

```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

O aplicativo abrirá em `http://localhost:5173` (ou outra porta se 5173 estiver ocupada).

## Estrutura do Projeto

```
Gestao-Financeira/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Dashboard.tsx    # Dashboard com resumo financeiro
│   │   ├── EntryForm.tsx    # Formulário para adicionar transações
│   │   └── Charts/          # Gráficos
│   │       ├── LineChart.tsx
│   │       └── BarChart.tsx
│   ├── services/
│   │   └── financeService.ts  # Lógica de negócio e LocalStorage
│   ├── types/
│   │   └── finance.ts         # Tipos TypeScript
│   ├── styles/
│   │   └── finance.css        # Estilos globais
│   ├── App.tsx                # Componente principal
│   └── main.tsx               # Entry point
├── package.json
├── vite.config.ts
└── README.md
```

## Primeiros Passos no Aplicativo

1. **Adicionar uma transação**
   - Clique no botão "Nova Transação"
   - Escolha o tipo (Receber ou Pagar)
   - Preencha descrição, valor e data
   - Clique em "Adicionar"

2. **Visualizar Dashboard**
   - Veja o resumo com totais de receitas, despesas e saldo
   - Tabela mensal mostra detalhamento por mês

3. **Ver Gráficos**
   - Clique na aba "Gráficos"
   - Gráfico de linha mostra evolução mensal
   - Gráfico de barras compara receitas vs despesas

## Tecnologias Utilizadas

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Recharts** (gráficos)
- **Lucide React** (ícones)
- **date-fns** (manipulação de datas)

## Armazenamento de Dados

- Dados salvos no **LocalStorage** do navegador
- Privado e offline
- Específico para cada navegador
- ⚠️ Limpar cache apaga os dados

## Próximos Passos

- [ ] Adicionar filtros por período
- [ ] Implementar exportação para CSV/Excel
- [ ] Criar relatórios PDF
- [ ] Adicionar categorias personalizadas
- [ ] Implementar backup/restore de dados
- [ ] Sincronização com Google Sheets (opcional)

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## Suporte

Para dúvidas ou problemas, consulte o README.md completo na pasta do projeto.
