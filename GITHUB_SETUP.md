# Como Colocar o Código no GitHub de Forma Segura

Este guia explica como você pode subir seu código para o GitHub sem expor informações sensíveis como seu ID do Google AdSense.

## 🔒 Segurança em Primeiro Lugar

> [!CAUTION]
> **NUNCA** commite informações sensíveis no GitHub, incluindo:
> - IDs do Google AdSense (`ca-pub-XXXXXXXXXXXXXXXX`)
> - Chaves de API
> - Senhas ou tokens
> - Informações pessoais

---

## ✅ Configuração Segura (Passo a Passo)

### 1. Verificar o `.gitignore`

Seu projeto já tem um arquivo `.gitignore` configurado corretamente! ✅

Ele já contém a linha `*.local` que impede que arquivos `.env.local` sejam enviados ao GitHub.

### 2. Criar Arquivo de Variáveis de Ambiente

Você já tem um arquivo `.env.example` criado. Agora crie o arquivo real:

**Crie o arquivo `.env.local`** (se ainda não existir) com seu ID real do AdSense:

```bash
# No PowerShell ou terminal
echo "VITE_ADSENSE_CLIENT_ID=ca-pub-SEU-ID-REAL-AQUI" > .env.local
```

Ou crie manualmente o arquivo `.env.local` com o conteúdo:

```env
VITE_ADSENSE_CLIENT_ID=ca-pub-1234567890123456
```

> [!IMPORTANT]
> Substitua `ca-pub-1234567890123456` pelo seu ID real do AdSense!

### 3. Usar Variáveis de Ambiente no Código

#### No `index.html`

**❌ NÃO faça assim (inseguro):**
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
     crossorigin="anonymous"></script>
```

**✅ Faça assim (seguro):**

O Vite não suporta variáveis de ambiente diretamente no `index.html`, então você tem duas opções:

#### **Opção 1: Adicionar via JavaScript (Recomendado)**

No seu arquivo `src/index.tsx` ou `src/App.tsx`, adicione:

```typescript
// Adicionar script do AdSense dinamicamente
useEffect(() => {
  const adsenseId = import.meta.env.VITE_ADSENSE_CLIENT_ID;
  
  if (adsenseId && !document.querySelector('[data-ad-client]')) {
    const script = document.createElement('script');
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }
}, []);
```

#### **Opção 2: Plugin Vite para HTML**

Instale o plugin:
```bash
npm install vite-plugin-html-config --save-dev
```

Configure no `vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html-config';

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          adsenseId: process.env.VITE_ADSENSE_CLIENT_ID || ''
        }
      }
    })
  ]
});
```

E no `index.html`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=<%= adsenseId %>"
     crossorigin="anonymous"></script>
```

#### No Componente React (`AdSense.tsx`)

```typescript
import { useEffect } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
}

export const AdSense: React.FC<AdSenseProps> = ({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style = { display: 'block' }
}) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  // ✅ Usar variável de ambiente
  const adsenseClientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client={adsenseClientId}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive.toString()}
    />
  );
};
```

---

## 📤 Subindo para o GitHub

### Primeira vez (criar repositório)

```bash
# 1. Inicializar repositório Git (se ainda não foi feito)
git init

# 2. Adicionar todos os arquivos
git add .

# 3. Fazer o primeiro commit
git commit -m "Initial commit: ALEATORIO NEWS"

# 4. Criar repositório no GitHub
# Acesse https://github.com/new e crie um novo repositório

# 5. Conectar ao repositório remoto
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git

# 6. Enviar código para o GitHub
git branch -M main
git push -u origin main
```

### Atualizações futuras

```bash
# 1. Adicionar alterações
git add .

# 2. Fazer commit
git commit -m "Descrição das alterações"

# 3. Enviar para o GitHub
git push
```

---

## 🚀 Configurar Variáveis de Ambiente no Vercel

Quando você fizer deploy no Vercel, precisa adicionar as variáveis de ambiente lá também:

### No Painel do Vercel:

1. Acesse seu projeto no [Vercel Dashboard](https://vercel.com/dashboard)
2. Vá em **Settings** → **Environment Variables**
3. Adicione:
   - **Name**: `VITE_ADSENSE_CLIENT_ID`
   - **Value**: `ca-pub-SEU-ID-REAL-AQUI`
   - **Environment**: Selecione `Production`, `Preview`, e `Development`
4. Clique em **Save**
5. Faça um novo deploy para aplicar as mudanças

### Via CLI do Vercel:

```bash
vercel env add VITE_ADSENSE_CLIENT_ID
# Cole seu ID quando solicitado
# Selecione os ambientes: Production, Preview, Development
```

---

## ✅ Checklist de Segurança

Antes de fazer push para o GitHub, verifique:

- [ ] Arquivo `.gitignore` contém `*.local`
- [ ] Arquivo `.env.local` **NÃO** está sendo rastreado pelo Git
- [ ] Arquivo `.env.example` está no repositório (com valores de exemplo)
- [ ] Código usa `import.meta.env.VITE_ADSENSE_CLIENT_ID` em vez de valores hardcoded
- [ ] Variáveis de ambiente configuradas no Vercel

### Como verificar se `.env.local` está sendo ignorado:

```bash
git status
```

Se `.env.local` aparecer na lista, **NÃO faça commit!** Adicione-o ao `.gitignore`.

---

## 📁 Estrutura de Arquivos

Após configurar tudo, sua estrutura ficará assim:

```
seu-projeto/
├── .env.local          # ❌ NÃO vai para o GitHub (ignorado)
├── .env.example        # ✅ Vai para o GitHub (valores de exemplo)
├── .gitignore          # ✅ Vai para o GitHub
├── src/
│   ├── components/
│   │   └── AdSense.tsx # ✅ Usa variáveis de ambiente
│   └── index.tsx       # ✅ Usa variáveis de ambiente
└── index.html          # ✅ Vai para o GitHub
```

---

## 🔍 Verificar se Está Tudo Certo

### Teste Local:

```bash
# Verificar se a variável está carregando
npm run dev
```

Abra o console do navegador e digite:
```javascript
console.log(import.meta.env.VITE_ADSENSE_CLIENT_ID);
```

Deve mostrar seu ID do AdSense.

### Teste no GitHub:

1. Faça push do código
2. Acesse o repositório no GitHub
3. Verifique se o arquivo `.env.local` **NÃO** está lá
4. Verifique se o arquivo `.env.example` **ESTÁ** lá

---

## ❓ Perguntas Frequentes

### E se eu já commitei o `.env.local` por engano?

Se você já enviou informações sensíveis para o GitHub:

```bash
# 1. Remover do histórico
git rm --cached .env.local

# 2. Adicionar ao .gitignore
echo "*.local" >> .gitignore

# 3. Commit
git commit -m "Remove sensitive .env.local file"

# 4. Push
git push
```

> [!WARNING]
> Mesmo após remover, o arquivo ainda estará no histórico do Git. Se for muito sensível, considere:
> - Gerar um novo ID do AdSense
> - Usar ferramentas como `git filter-branch` ou `BFG Repo-Cleaner` para limpar o histórico

### Posso usar outro nome para as variáveis?

Sim! Mas no Vite, variáveis de ambiente **devem começar com `VITE_`** para serem acessíveis no frontend.

### E se eu quiser tornar o repositório privado?

Você pode tornar o repositório privado no GitHub:
1. Vá em **Settings** do repositório
2. Role até **Danger Zone**
3. Clique em **Change visibility** → **Make private**

Mas ainda assim, é boa prática usar variáveis de ambiente!

---

## 📚 Recursos Adicionais

- [Documentação do Vite sobre Variáveis de Ambiente](https://vitejs.dev/guide/env-and-mode.html)
- [Documentação do Vercel sobre Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [GitHub: Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)

---

> [!TIP]
> **Dica Pro**: Sempre que adicionar uma nova variável de ambiente, atualize também o `.env.example` para que outros desenvolvedores (ou você no futuro) saibam quais variáveis são necessárias!
