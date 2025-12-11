# Configuração de Domínio Registro.br no Vercel

Este guia mostra como conectar seu domínio do Registro.br ao seu projeto no Vercel.

## 📋 Passo 1: Adicionar Domínio no Vercel

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto **Aleatorio News**
3. Clique em **Settings** (Configurações)
4. No menu lateral, clique em **Domains**
5. Clique no botão **Add**
6. Digite seu domínio (exemplo: `seudominio.com.br`)
7. Clique em **Add**

O Vercel irá mostrar as configurações DNS necessárias.

---

## 🌐 Passo 2: Configurar DNS no Registro.br

### Acessar o Painel do Registro.br

1. Acesse [registro.br](https://registro.br)
2. Faça login com sua conta
3. Vá em **Meus Domínios**
4. Clique no domínio que deseja configurar
5. Clique em **Editar Zona** ou **DNS**

### Configurar os Registros DNS

Você precisará adicionar os seguintes registros:

#### **Para o domínio raiz (exemplo.com.br):**

```
Tipo: A
Nome: @
Valor: 76.76.21.21
TTL: 3600 (ou deixe o padrão)
```

#### **Para www (www.exemplo.com.br):**

```
Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
TTL: 3600 (ou deixe o padrão)
```

### Instruções Detalhadas no Registro.br

1. Na página de edição de zona DNS:
   - Clique em **Nova Entrada** ou **Adicionar Registro**
   
2. **Primeiro Registro (A):**
   - **Tipo**: Selecione `A`
   - **Nome/Host**: Digite `@` (representa o domínio raiz)
   - **Dados/Valor**: Digite `76.76.21.21`
   - **TTL**: Deixe o padrão ou use `3600`
   - Clique em **Adicionar** ou **Salvar**

3. **Segundo Registro (CNAME):**
   - **Tipo**: Selecione `CNAME`
   - **Nome/Host**: Digite `www`
   - **Dados/Valor**: Digite `cname.vercel-dns.com`
   - **TTL**: Deixe o padrão ou use `3600`
   - Clique em **Adicionar** ou **Salvar**

4. Clique em **Salvar Alterações** ou **Publicar Zona**

---

## ⏱️ Passo 3: Aguardar Propagação

- A propagação DNS pode levar de **15 minutos a 48 horas**
- Geralmente, no Registro.br, leva entre **30 minutos a 2 horas**
- Você pode verificar o status no painel do Vercel
- O Vercel emitirá automaticamente um **certificado SSL gratuito** quando o domínio for verificado

### Verificar Propagação

Você pode verificar se o DNS já propagou usando:
- [whatsmydns.net](https://www.whatsmydns.net/)
- Digite seu domínio e selecione o tipo de registro (A ou CNAME)

---

## ✅ Passo 4: Verificação no Vercel

1. Volte ao painel do Vercel
2. Vá em **Settings** → **Domains**
3. Você verá o status do seu domínio:
   - ⏳ **Pending**: Aguardando configuração DNS
   - ✅ **Valid**: Configurado com sucesso!

Quando aparecer como **Valid**, seu domínio estará funcionando!

---

## 🔧 Configurações Opcionais

### Redirecionar www para domínio raiz (ou vice-versa)

No Vercel, você pode configurar redirecionamentos automáticos:

1. Vá em **Settings** → **Domains**
2. Clique nos três pontos (**...**) ao lado do domínio
3. Selecione **Redirect to** e escolha qual domínio será o principal

### Configurar Domínio Personalizado como Padrão

1. No painel de Domains
2. Clique em **Edit** ao lado do domínio desejado
3. Marque como **Primary Domain**

---

## 📝 Notas Importantes

- O Registro.br pode levar algumas horas para propagar as mudanças
- Certifique-se de salvar todas as alterações no painel do Registro.br
- O certificado SSL é gratuito e renovado automaticamente pelo Vercel
- Você pode adicionar múltiplos domínios ao mesmo projeto

---

## ❓ Problemas Comuns

### "Domain is not configured correctly"
- Verifique se os registros DNS estão corretos
- Aguarde mais tempo para a propagação
- Limpe o cache DNS do seu navegador

### "Invalid Configuration"
- Certifique-se de usar `@` para o domínio raiz, não deixe em branco
- Verifique se não há espaços extras nos valores

### "SSL Certificate Error"
- Aguarde a propagação completa do DNS
- O Vercel emitirá o certificado automaticamente após verificar o domínio

---

## 🎉 Pronto!

Após seguir estes passos, seu domínio personalizado estará funcionando no Vercel com HTTPS automático!

Se tiver alguma dúvida ou problema, consulte a [documentação oficial do Vercel](https://vercel.com/docs/concepts/projects/domains).
