# 🔐 Setup de Variáveis de Ambiente - Portal Fiscal Pro

## 📋 O que é e por que precisa?

Seu app usa a **Google Generative AI (Gemini)** para:
- 📰 Carregar notícias fiscais em tempo real (News Feed)
- 🤖 Fornecer consultoria fiscal automática (Tax Advisor)
- 💡 Gerar insights inteligentes

Sem a API key, essas funcionalidades **não funcionam em produção**.

---

## 🚀 Setup Rápido (5 minutos)

### Passo 1: Obter API Key do Google

1. Acesse: **https://ai.google.dev/**
2. Clique em **"Get API Key"** (botão azul)
3. Clique em **"Create API key in new project"**
4. Copie a chave que aparece
5. Salve em um lugar seguro

**Visualização**:
```
API Key: AIzaSyD1234567890abcdefghijklmnopqrst_uv
```

---

### Passo 2: Configurar em Desenvolvimento

#### 2.1 - Criar arquivo `.env` local

Na raiz do projeto (`c:\Users\Pichau\Desktop\Portal Fiscal\portal-fiscal-pro\`), crie um arquivo chamado `.env`:

```bash
# Windows PowerShell
cd "c:\Users\Pichau\Desktop\Portal Fiscal\portal-fiscal-pro"
New-Item -Path ".env" -Type File -Value "VITE_GEMINI_API_KEY=sua_chave_aqui"
```

Ou manualmente:
1. Clique direito na pasta do projeto
2. "New" → "Text File"
3. Nomeie como `.env`
4. Abra com editor de texto
5. Cole:
```
VITE_GEMINI_API_KEY=AIzaSyD1234567890abcdefghijklmnopqrst_uv
```

#### 2.2 - Testar Localmente

```bash
npm run dev
```

Abra http://localhost:3000 e:
- [ ] Vá para "Notícias Fiscais"
- [ ] Verifique se carrega notícias
- [ ] Abra DevTools (F12)
- [ ] Procure no Console por erros de API key

**Se aparecer erro**:
```
⚠️ GEMINI_API_KEY não configurada!
```
→ Verifique se `.env` está na raiz correta

**Se funcionar**:
→ Pronto! Agora configurar em Vercel

---

### Passo 3: Configurar em Vercel (Produção)

1. Acesse seu **Vercel Dashboard**: https://vercel.com/dashboard
2. Selecione seu projeto: **portalfiscal-pro**
3. Vá em **Settings** → **Environment Variables**
4. Clique em **"Add New"**
5. Preencha:
   - **Name**: `VITE_GEMINI_API_KEY`
   - **Value**: `AIzaSyD1234567890abcdefghijklmnopqrst_uv`
   - **Environment**: Production (ou Production + Preview)
6. Clique **"Save"**

7. **Redeploy** seu projeto:
   - Clique em **"Deployments"**
   - Clique nos 3 pontinhos de seu deploy mais recente
   - Clique em **"Redeploy"**

---

### Passo 4: Validar em Produção

Depois que o Vercel terminar o redeploy:

1. Abra sua app em produção
2. Vá para **"Notícias Fiscais"**
3. Verifique se carrega notícias
4. Abra DevTools (F12 → Console)
5. Procure por erros

**Esperado**: Notícias carregando sem erros ✅

---

## 🔒 Segurança

### ⚠️ IMPORTANTE: Não Commitar `.env`

O arquivo `.env` **NUNCA** deve ser commitado para GitHub porque contém suas chaves secretas!

**Verificar `.gitignore`**:
```bash
cat .gitignore
```

Deve conter:
```
.env
.env.local
.env.*.local
```

Se não tiver, adicione!

### ✅ Prática Recomendada

```bash
# ❌ ERRADO
git add .env
git commit -m "Add api key"  # PERIGO!

# ✅ CORRETO
# Usar Vercel Environment Variables (já vimos acima)
# Nunca commitar .env para GitHub
```

---

## 📝 Checklist

### Desenvolvimento Local
- [ ] API key obtida do Google
- [ ] `.env` file criado na raiz
- [ ] `VITE_GEMINI_API_KEY` adicionado
- [ ] `npm run dev` testado
- [ ] News Feed carrega sem erros
- [ ] Console limpo (sem warnings)

### Vercel (Produção)
- [ ] Environment Variable configurada em Vercel
- [ ] Projeto reimplementado (redeploy)
- [ ] App em produção testada
- [ ] News Feed carrega notícias
- [ ] Console limpo em produção

---

## 🆘 Troubleshooting

### ❌ "GEMINI_API_KEY não configurada" em Dev

**Solução**:
1. Verificar se `.env` está na raiz correta
2. Verificar se VITE_ está no começo (importante!)
3. Reiniciar `npm run dev`
4. Limpar cache: `npm cache clean --force`

```bash
# Debug: verificar se arquivo existe
ls -la .env

# Renovar servidor
npm run dev -- --force
```

### ❌ "Erro de API em Produção"

**Verificar**:
1. Vercel Dashboard → Environment Variables
2. Confirmar que `VITE_GEMINI_API_KEY` está lá
3. Confirmar que foi reimplementado (redeploy)
4. Abrir DevTools e ver erro específico

### ❌ "API key inválida"

**Solução**:
1. Copiar novamente a chave de https://ai.google.dev/
2. Verificar se não tem espaços extras
3. Atualizar em Vercel
4. Redeploy

---

## 🎯 Próximos Passos

### Imediato (hoje)
1. ✅ Obter API key
2. ✅ Configurar localmente
3. ✅ Testar
4. ✅ Configurar em Vercel
5. ✅ Validar em produção

### Futuro (próximas semanas)
- [ ] Implementar retry logic
- [ ] Cache de notícias
- [ ] Tratamento de erros melhorado
- [ ] Rate limiting
- [ ] Backend próprio para cache

---

## 📞 Recursos

- **Google AI**: https://ai.google.dev/
- **Vite Env**: https://vitejs.dev/guide/env-and-mode.html
- **React Env**: https://create-react-app.dev/docs/adding-custom-environment-variables/
- **Vercel Env**: https://vercel.com/docs/concepts/projects/environment-variables

---

**Status**: Configuração manual necessária ⚠️  
**Tempo Estimado**: 5 minutos  
**Dificuldade**: Fácil 🟢

Após completar estes passos, seu Portal Fiscal Pro estará **100% funcional** em produção! 🎉
