# Guia de Configuração do Google AdSense

Este guia irá ajudá-lo a configurar o Google AdSense no site ALEATORIO NEWS.

## Pré-requisitos

Antes de se inscrever no AdSense, certifique-se de que seu site atende aos seguintes requisitos:

> [!IMPORTANT]
> **Requisitos Essenciais do Google AdSense**
> - ✅ Seu site deve estar **publicado e acessível** na internet
> - ✅ Você deve ter **conteúdo original e de qualidade**
> - ✅ Idade mínima de **18 anos**
> - ✅ Ter uma **conta Google**
> - ✅ O site deve cumprir as [Políticas do Programa AdSense](https://support.google.com/adsense/answer/48182)

### Políticas Importantes

Seu site **NÃO PODE** conter:
- Conteúdo adulto ou sexual
- Conteúdo violento ou chocante
- Conteúdo que promova ódio ou discriminação
- Conteúdo protegido por direitos autorais sem permissão
- Conteúdo enganoso ou clickbait excessivo

---

## Passo 1: Inscrição no Google AdSense

1. Acesse [https://www.google.com/adsense](https://www.google.com/adsense)
2. Clique em **"Começar"** ou **"Sign Up Now"**
3. Faça login com sua conta Google
4. Preencha o formulário de inscrição:
   - **URL do site**: Insira o domínio do seu site (ex: `https://seu-dominio.com`)
   - **Email**: Confirme seu email para receber notificações importantes
   - **País/Região**: Selecione Brasil
   - Aceite os termos e condições

---

## Passo 2: Adicionar o Código do AdSense ao Seu Site

Após a inscrição, o Google fornecerá um **código de verificação** que você precisa adicionar ao seu site.

### 2.1 Copiar o Código do AdSense

O código será algo parecido com isto:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
```

### 2.2 Adicionar o Código ao `index.html`

Você precisa adicionar este código na seção `<head>` do arquivo `index.html`:

**Localização do arquivo**: `index.html` (na raiz do projeto)

Adicione o código entre as tags `<head>` e `</head>`, preferencialmente logo após a tag `<title>`:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ALEATORIO NEWS</title>
  
  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
       crossorigin="anonymous"></script>
  
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- resto do código -->
</head>
```

> [!WARNING]
> **Substitua `ca-pub-XXXXXXXXXXXXXXXX`** pelo seu ID de editor real fornecido pelo Google AdSense!

---

## Passo 3: Fazer Deploy das Alterações

Após adicionar o código, você precisa fazer o deploy do site atualizado:

```bash
# Se estiver usando Vercel (como indicado pelos arquivos do projeto)
npm run build
vercel --prod
```

Ou faça o deploy através da interface do Vercel se preferir.

---

## Passo 4: Verificação pelo Google

1. Volte ao painel do AdSense
2. Clique em **"Verificar site"** ou **"Request Review"**
3. O Google verificará se o código foi instalado corretamente
4. Aguarde a aprovação (pode levar de **alguns dias até 2 semanas**)

> [!NOTE]
> Durante este período, o Google analisará seu site para garantir que ele cumpre todas as políticas do programa.

---

## Passo 5: Criar Blocos de Anúncios

Após a aprovação, você poderá criar blocos de anúncios:

### 5.1 Anúncios Automáticos (Recomendado para Iniciantes)

Os anúncios automáticos são a opção mais simples - o Google coloca os anúncios automaticamente nas melhores posições.

**Para ativar:**
1. No painel do AdSense, vá em **"Anúncios" > "Por site"**
2. Ative os **"Anúncios automáticos"** para seu site
3. Escolha os formatos de anúncio que deseja exibir

### 5.2 Blocos de Anúncios Personalizados

Para ter mais controle sobre onde os anúncios aparecem:

1. No painel do AdSense, vá em **"Anúncios" > "Por unidade de anúncio"**
2. Clique em **"Novo bloco de anúncios"**
3. Escolha o tipo:
   - **Display**: Anúncios responsivos de banner
   - **In-feed**: Anúncios que aparecem no feed de notícias
   - **In-article**: Anúncios dentro dos artigos
   - **Multiplex**: Anúncios em grade

4. Configure o bloco e copie o código gerado

---

## Passo 6: Adicionar Blocos de Anúncios ao Site React

Para adicionar blocos de anúncios específicos em componentes React, você pode criar um componente reutilizável:

### Exemplo de Componente AdSense

Crie um arquivo `src/components/AdSense.tsx`:

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

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive.toString()}
    />
  );
};
```

### Como Usar o Componente

```typescript
import { AdSense } from './components/AdSense';

function App() {
  return (
    <div>
      <h1>Meu Artigo</h1>
      <p>Conteúdo do artigo...</p>
      
      {/* Anúncio no meio do conteúdo */}
      <AdSense adSlot="1234567890" />
      
      <p>Mais conteúdo...</p>
    </div>
  );
}
```

---

## Dicas para Maximizar Ganhos

> [!TIP]
> **Melhores Práticas para AdSense**
> 
> 1. **Conteúdo de Qualidade**: Publique conteúdo original e relevante regularmente
> 2. **Tráfego Orgânico**: Foque em SEO para aumentar visitantes
> 3. **Posicionamento**: Coloque anúncios em locais visíveis, mas sem prejudicar a experiência do usuário
> 4. **Responsividade**: Certifique-se de que os anúncios funcionam bem em dispositivos móveis
> 5. **Não Clique nos Próprios Anúncios**: Isso viola as políticas e pode resultar em banimento
> 6. **Não Peça Cliques**: Nunca incentive usuários a clicar nos anúncios

---

## Monitoramento e Relatórios

Acesse regularmente o painel do AdSense para:
- Ver seus ganhos
- Analisar o desempenho dos anúncios
- Otimizar posicionamento
- Verificar métricas como CTR (taxa de cliques) e RPM (receita por mil impressões)

---

## Problemas Comuns

### Site Não Aprovado?

Se seu site não for aprovado, verifique:
- ✅ Conteúdo suficiente (mínimo de 15-20 artigos de qualidade)
- ✅ Navegação clara e funcional
- ✅ Páginas importantes: Sobre, Contato, Política de Privacidade
- ✅ Sem erros 404 ou links quebrados
- ✅ Design profissional e responsivo

### Código Não Detectado?

- Verifique se o código está no `<head>` do HTML
- Certifique-se de que o site está publicado e acessível
- Aguarde até 24 horas após adicionar o código
- Limpe o cache do navegador

---

## Próximos Passos

1. [ ] Inscrever-se no Google AdSense
2. [ ] Adicionar código de verificação ao `index.html`
3. [ ] Fazer deploy do site atualizado
4. [ ] Aguardar aprovação do Google
5. [ ] Configurar blocos de anúncios
6. [ ] Implementar componente AdSense no React
7. [ ] Monitorar desempenho e otimizar

---

## Recursos Úteis

- [Central de Ajuda do AdSense](https://support.google.com/adsense)
- [Políticas do Programa AdSense](https://support.google.com/adsense/answer/48182)
- [Guia de Otimização do AdSense](https://support.google.com/adsense/answer/17957)
- [Fórum da Comunidade AdSense](https://support.google.com/adsense/community)

---

> [!CAUTION]
> **Importante**: Nunca compartilhe seu ID de editor do AdSense publicamente ou em repositórios públicos do GitHub. Use variáveis de ambiente para informações sensíveis em produção.
