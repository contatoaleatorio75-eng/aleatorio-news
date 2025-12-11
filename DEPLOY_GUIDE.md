# 🚀 Guia de Deploy: Google AdSense

Siga estes passos para colocar os anúncios no ar em **aleatorionews.com.br**.

## 1️⃣ Configurar Vercel (Faça isso primeiro!)

Antes de enviar o código, você precisa configurar a variável de ambiente no Vercel.

1. Acesse o painel do seu projeto no [Vercel Dashboard](https://vercel.com/dashboard).
2. Vá em **Settings** (Configurações) > **Environment Variables**.
3. Adicione uma nova variável:
   - **Key (Nome):** `VITE_ADSENSE_CLIENT_ID`
   - **Value (Valor):** `ca-pub-4160276489030508`
   - **Environments:** Marque ✅ Production, ✅ Preview, ✅ Development.
4. Clique em **Save**.

## 2️⃣ Enviar Código para o GitHub

Agora vamos enviar as alterações que já preparei na pasta `C:\projects\Site`.

Abra o terminal (PowerShell) e execute os seguintes comandos:

```powershell
# 1. Entrar na pasta do repositório
cd C:\projects\Site

# 2. Adicionar todos os arquivos novos
git add .

# 3. Salvar as alterações (Commit)
git commit -m "Adicionar integração Google AdSense"

# 4. Enviar para o GitHub (Push)
git push
```

## 3️⃣ Verificar Deploy

Assim que você fizer o `git push`:
1. O Vercel vai detectar a mudança automaticamente.
2. Vai iniciar um novo deploy (leva cerca de 1-2 minutos).
3. Quando terminar, acesse **aleatorionews.com.br** e verifique se tudo está funcionando!

> 💡 **Nota:** Os anúncios podem demorar um pouco para aparecer (até 1 hora) ou ficarem em branco até que o Google aprove seu site completamente.

## ❓ Problemas Comuns

- **Erro no git push?** Verifique se você está logado no GitHub.
- **Anúncios não aparecem?** Verifique se o bloqueador de anúncios (AdBlock) está desligado no seu navegador.
