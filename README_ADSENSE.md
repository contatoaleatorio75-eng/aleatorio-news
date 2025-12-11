# 🚀 Guia Rápido: GitHub + AdSense

## ✅ Sim, você pode colocar no GitHub!

Mas precisa seguir estes passos para manter seu ID do AdSense seguro:

---

## 📋 Checklist Rápido

### 1️⃣ Criar arquivo `.env.local`

Crie o arquivo `.env.local` na raiz do projeto com:

```env
VITE_ADSENSE_CLIENT_ID=ca-pub-SEU-ID-AQUI
```

> ⚠️ Substitua `ca-pub-SEU-ID-AQUI` pelo seu ID real do AdSense!

### 2️⃣ Inicializar AdSense no App

No arquivo `src/App.tsx` ou `src/index.tsx`, adicione:

```typescript
import { useEffect } from 'react';
import { initializeAdSense } from './utils/adsense';

function App() {
  useEffect(() => {
    initializeAdSense();
  }, []);
  
  // resto do código...
}
```

### 3️⃣ Usar o componente GoogleAd

O componente já está atualizado e pronto para usar:

```typescript
import { GoogleAd } from './components/GoogleAd';

<GoogleAd slot="1234567890" />
```

### 4️⃣ Subir para o GitHub

```bash
git add .
git commit -m "Add AdSense integration with environment variables"
git push
```

✅ **Seguro!** O arquivo `.env.local` NÃO será enviado (está no `.gitignore`)

### 5️⃣ Configurar no Vercel

No painel do Vercel:
1. **Settings** → **Environment Variables**
2. Adicione: `VITE_ADSENSE_CLIENT_ID` = `ca-pub-SEU-ID-AQUI`
3. Salve e faça redeploy

---

## 📚 Documentação Completa

Para mais detalhes, consulte:
- [GITHUB_SETUP.md](./GITHUB_SETUP.md) - Guia completo sobre GitHub
- [google-adsense-setup.md](./google-adsense-setup.md) - Guia completo do AdSense

---

## ✨ O que foi feito

- ✅ Criado `.env.example` (vai para o GitHub)
- ✅ Atualizado `GoogleAd.tsx` para usar variáveis de ambiente
- ✅ Criado helper `src/utils/adsense.ts` para inicializar o script
- ✅ `.gitignore` já configurado corretamente

---

## 🔒 Segurança

| Arquivo | GitHub | Descrição |
|---------|--------|-----------|
| `.env.local` | ❌ NÃO | Contém seu ID real (ignorado) |
| `.env.example` | ✅ SIM | Exemplo sem dados reais |
| `GoogleAd.tsx` | ✅ SIM | Usa variável de ambiente |
| `adsense.ts` | ✅ SIM | Helper seguro |

**Tudo pronto para o GitHub! 🎉**
