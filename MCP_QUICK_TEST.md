# 🚀 TESTE DE RESPONSIVIDADE - INSTRUÇÕES RÁPIDAS

## Como fazer os testes com Chrome DevTools MCP no chat:

### 1️⃣ MÓVEL (375x667)
```
Navegue para http://localhost:3000
Use set_device_emulation ou set_viewport com 375x667
Tire uma screenshot
Verifique: Menu colapsado? Grid em 1 coluna? Sem overflow?
```

### 2️⃣ TABLET PORTRAIT (768x1024)
```
Configure viewport: 768x1024
Screenshot
Verifique: Navigation? Grid em 2 colunas? Cards espaçados?
```

### 3️⃣ TABLET LANDSCAPE (1024x768)
```
Configure viewport: 1024x768
Screenshot
Verifique: Grid em 3 colunas? Layout Financial Module?
```

### 4️⃣ DESKTOP (1920x1080)
```
Configure viewport: 1920x1080
Screenshot (full-page se possível)
Verifique: Sem quebras? Max-width aplicado? Proporções?
```

### 5️⃣ ULTRA-WIDE (2560x1440)
```
Configure viewport: 2560x1440
Screenshot
Verifique: Conteúdo centrado? Não muito espaçado? Legível?
```

---

## Exemplo de comando para o MCP:

```
Set viewport to 375x667, navigate to http://localhost:3000, 
take a screenshot called "mobile-375", then verify:
- Navigation menu is collapsed (hamburger visible)
- Tools grid shows 1 column
- No horizontal scrolling
- All buttons are 44px+ height
```

---

## Próxima ação:
**Cole estes comandos no chat do VS Code, um por vez, enquanto o MCP executa.**

Salve as screenshots e reporte os problemas encontrados aqui.
