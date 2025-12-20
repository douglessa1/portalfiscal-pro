# 📱 GUIA DE TESTES DE RESPONSIVIDADE - Chrome DevTools MCP

**Como usar**: Copie e cole cada teste no chat do VS Code, um por vez.

---

## ✅ TESTE 1: iPhone SE (375x667) - Mobile

```
Use o Chrome DevTools MCP para:

1. Navegue para http://localhost:3000
2. Configure viewport: 375x667
3. Tire uma screenshot chamando de "mobile-375x667"
4. Verifique e reporte:
   - [ ] Menu hamburger está visível (navigation colapsado)?
   - [ ] Grid de ferramentas em 1 coluna?
   - [ ] Inputs em tamanho clicável (min 44px altura)?
   - [ ] Botões CTA com altura mínima 44px?
   - [ ] Sem scroll horizontal?
   - [ ] Company selector funciona?
   - [ ] Dark mode toggle acessível?

5. Tome screenshot da lista de tools (role para baixo)
```

---

## ✅ TESTE 2: iPad Portrait (768x1024) - Tablet

```
1. Configure viewport: 768x1024
2. Tire screenshot: "tablet-768x1024-portrait"
3. Verifique:
   - [ ] Navigation está em tamanho desktop ou colapsado?
   - [ ] Grid de ferramentas em 2 colunas?
   - [ ] Financial Module (se visitado) layout correto?
   - [ ] Cards com espaçamento adequado?
   - [ ] Sidebar colapsada ou visível?

4. Navegue para /tools/simples-nacional
5. Tire screenshot do formulário
```

---

## ✅ TESTE 3: iPad Landscape (1024x768) - Tablet Landscape

```
1. Configure viewport: 1024x768
2. Tire screenshot: "tablet-1024x768-landscape"
3. Verifique:
   - [ ] Grid de tools em 3 colunas?
   - [ ] Dashboard cards lado a lado?
   - [ ] FinancialModule com layout 2-coluna?
   - [ ] Sem espaços em branco excessivos?
```

---

## ✅ TESTE 4: Desktop (1920x1080) - Full HD

```
1. Configure viewport: 1920x1080
2. Tire screenshot full-page: "desktop-1920x1080-fullpage"
3. Verifique:
   - [ ] Nenhum elemento quebra?
   - [ ] Conteúdo centralizado e com margins?
   - [ ] Grid de tools em 4+ colunas?
   - [ ] Cards bem distribuídos?
   - [ ] Máximo de tools visíveis sem scroll?

4. Role para baixo e tire mais uma screenshot: "desktop-1920x1080-scroll"
```

---

## ✅ TESTE 5: Ultra-wide (2560x1440) - 4K

```
1. Configure viewport: 2560x1440
2. Tire screenshot: "ultrawide-2560x1440"
3. Verifique:
   - [ ] Conteúdo não fica muito espaçado?
   - [ ] Max-width está aplicado (ex: max-w-7xl)?
   - [ ] Texto legível?
   - [ ] Não há vazios excessivos nas laterais?
```

---

## 🔍 TESTES ESPECÍFICOS POR PÁGINA

### Dashboard
```
Abra http://localhost:3000/#dashboard (ou / direto)
Em cada breakpoint (375, 768, 1024, 1920):
  - [ ] Cards estão empilhados em mobile?
  - [ ] Gráficos são visíveis?
  - [ ] Botões "Iniciar Envio" e "Verificar Erros" estão clicáveis?
```

### ToolsHub
```
Navegue para ToolsHub (clique em "Ferramentas" no menu)
Em cada breakpoint:
  - [ ] Filtros ("Todos", "Gratuito", "Pro", "Auditor"):
    - Mobile: estão empilhados ou em 2 linhas?
    - Desktop: em 1 linha?
  - [ ] Cards de tools têm altura consistente?
  - [ ] Descrição visível sem truncar?
  - [ ] Ícone + Tier badge visíveis?
```

### Calculadora (Simples Nacional)
```
Navegue para /tools/simples-nacional
Em cada breakpoint:
  - [ ] Inputs em coluna única (mobile)?
  - [ ] Inputs em 2 colunas (desktop)?
  - [ ] Botão "Calcular" com altura mínima?
  - [ ] Resultado cards empilhados?
  - [ ] Tabela com scroll horizontal (se houver)?
```

### Financial Module
```
Clique em "Financeiro" na sidebar
Em cada breakpoint:
  - [ ] Sidebar funciona?
  - [ ] Main content ocupa espaço adequado?
  - [ ] Contas (Banco Inter, Nubank) acessíveis?
  - [ ] Extrato/tabelas com scroll horizontal?
```

---

## 📊 PREENCHIMENTO DO RELATÓRIO

Para cada teste, reporte:

```markdown
## Viewport: [375/768/1024/1920/2560]x[667/1024/768/1080/1440]

### Layout Geral
- Grid layout: ✅/⚠️/❌ [descrição]
- Navigation: ✅/⚠️/❌ [descrição]
- Overflow horizontal: ✅/⚠️/❌ [descrição]

### Componentes
- Botões (altura/width): ✅/⚠️/❌
- Inputs (tamanho): ✅/⚠️/❌
- Cards (espaçamento): ✅/⚠️/❌
- Ícones (visibilidade): ✅/⚠️/❌

### Problemas Identificados
- [Descrição do problema]
- [Como impacta UX]
- [Screenshot number]

### Recomendações
- [Ação recomendada]
```

---

## 🎯 RESUMO DOS TESTES

| Viewport | Status | Principais Issues |
|----------|--------|-------------------|
| 375x667  | 🔍 | [preencher após teste] |
| 768x1024 | 🔍 | [preencher após teste] |
| 1024x768 | 🔍 | [preencher após teste] |
| 1920x1080| 🔍 | [preencher após teste] |
| 2560x1440| 🔍 | [preencher após teste] |

---

## 💡 DICAS PARA USAR O MCP

1. **Tire screenshots**: Use o comando `screenshot` entre testes
2. **Compare layouts**: Salve filenames descritivos para comparar
3. **Teste interações**: Clique em botões/links em cada viewport
4. **Verifique console**: Procure por erros de CSS/JS
5. **Valide a rede**: Verifique se todas as requisições passam

---

**Gerado em**: 19 de Dezembro de 2025
