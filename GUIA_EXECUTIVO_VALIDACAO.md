# 🎬 GUIA EXECUTIVO - VALIDAÇÃO PASSO-A-PASSO

## COMO EXECUTAR A VALIDAÇÃO COMPLETA

---

## PARTE 1: VALIDAÇÃO VISUAL (5 minutos)

### Passo 1.1: Abrir a Aplicação

```
1. Copie a URL: https://portalfiscal-pro.vercel.app/#/tools/simples-nacional
2. Cole no navegador e pressione ENTER
3. Aguarde o carregamento (deve levar < 3 segundos)
```

✅ **Esperado:** Página carrega com formulário e histórico visível

---

### Passo 1.2: Inspecionar Cor do Botão "Calcular DAS"

**Método 1 - DevTools Inspector (RECOMENDADO)**

```
1. Pressione F12 (abre DevTools)
2. Clique no ícone de seletor (canto superior esquerdo do DevTools)
3. Clique no botão "Calcular DAS" (verde)
4. Vá para aba "Elements" (já deve estar selecionada)
5. Procure pela linha:
   <button type="submit" disabled={loading} 
           className="... bg-emerald-600 ...">
6. Na seção "Styles" abaixo, procure por "background-color"
7. O valor deve ser RGB ou HEX

RESULTADO ESPERADO:
✅ background-color: rgb(5, 150, 105)  // emerald-600
✅ Cor verde vibrante/esmeralda
```

**Método 2 - Color Picker (MAIS FÁCIL)**

```
1. DevTools aberto (F12)
2. Clique no ícone eyedropper (pipeta) no topo direito
3. Passe o mouse sobre o botão "Calcular DAS"
4. DevTools mostrará a cor HEX exata

RESULTADO ESPERADO:
✅ HEX: #059669 (ou próximo)
✅ Cor: Verde Esmeralda
```

---

### Passo 1.3: Verificar Border Radius

```
1. DevTools ainda aberto (F12) no botão
2. Procure na seção "Styles" por "border-radius"
3. Anote o valor

RESULTADO ESPERADO:
✅ border-radius: 12px (ou 0.75rem)
⚠️ Se estiver 8px ou 16px, não está correto
```

---

### Passo 1.4: Verificar Altura do Botão

```
1. DevTools ainda aberto (F12) no botão
2. Procure por "height" na seção Styles

RESULTADO ESPERADO:
✅ height: 44px (ou 2.75rem / 11 em Tailwind)
```

---

### Passo 1.5: Verificar Font Weight

```
1. DevTools ainda aberto (F12) no botão
2. Procure por "font-weight" na seção Styles

RESULTADO ESPERADO:
✅ font-weight: 600 (semibold)
✅ Texto visível em NEGRITO
```

---

## PARTE 2: RESPONSIVIDADE (10 minutos)

### Passo 2.1: Teste Mobile (375px)

```
1. DevTools ainda aberto (F12)
2. Clique no ícone "Toggle device toolbar" (Ctrl + Shift + M)
3. Mude para "iPhone 12" ou configure Custom 375px
4. Recarregue a página (F5)

CHECKLIST:
□ Formulário adapta para tela estreita
□ Campos de "Receita Bruta" e "Receita do Mês" empilham (1 coluna)
□ Botão "Calcular DAS" permanece clicável
□ Sem scroll horizontal
□ Sidebar "Histórico" aparece abaixo do formulário
□ Tamanho do botão ainda está correto (44px de altura)
□ Texto legível em todo o conteúdo

RESULTADO ESPERADO:
✅ Layout se adapta corretamente sem distorção
```

**Print esperado:**
- Formulário ocupando 100% da tela
- Cards empilhados verticalmente
- Botão verde grande e acessível

---

### Passo 2.2: Teste Tablet (768px)

```
1. DevTools → Device → Selecione iPad ou Custom 768px
2. Recarregue (F5)

CHECKLIST:
□ Grid muda para 2 colunas (formulário + sidebar)
□ Formulário ocupa 2/3 da tela à esquerda
□ Sidebar ocupa 1/3 à direita
□ Espaçamento gap-6 mantém proporção
□ Todos elementos legíveis
□ Botões acessíveis

RESULTADO ESPERADO:
✅ Layout de 2 colunas bem distribuído
```

---

### Passo 2.3: Teste Desktop (1920px)

```
1. DevTools → Device → Selecione Desktop ou feche device mode (Ctrl + Shift + M)
2. Maximize a janela do navegador
3. Recarregue (F5)

CHECKLIST:
□ Conteúdo tem max-width (não ocupa a tela toda)
□ Centralizado na tela (espaçamento simétrico)
□ Sidebar visível à direita
□ Tabela "Memória de Cálculo" completa
□ Sem distorção ou elementos quebrados

RESULTADO ESPERADO:
✅ Layout profissional em desktop
```

---

## PARTE 3: CONSOLE & NETWORK (10 minutos)

### Passo 3.1: Verificar Console

```
1. Feche device mode se ainda estiver aberto (Ctrl + Shift + M)
2. Pressione F12
3. Vá para aba "Console"
4. Aguarde 2 segundos pela mensagem "Loaded"
5. Procure por:
   - Erros em VERMELHO (Critical)
   - Warnings em AMARELO (Notes)

CHECKLIST - O que NÃO deve ter:
❌ "Cannot read property..." (erro crítico)
❌ "Uncaught TypeError" (erro não capturado)
❌ "Module not found" (arquivo faltando)
❌ "ReferenceError: ... is not defined" (variável não existe)

CHECKLIST - O que É OK:
✅ "Deprecation warning" (não afeta funcionalidade)
✅ "[Deprecation] Some API deprecated" (antigo)
✅ "Warning: ReactDOM.render" (apenas alerta)

RESULTADO ESPERADO:
✅ Console LIMPO ou com apenas warnings aceitáveis
✅ Nenhum erro crítico em vermelho
```

---

### Passo 3.2: Verificar Network

```
1. DevTools → Aba "Network"
2. Recarregue a página (F5)
3. Aguarde até que o símbolo de carregamento desapareça

CHECKLIST:
□ Procure por requisições com STATUS em vermelho (erro)
□ Clique em cada arquivo e veja o Status Code:
   ✅ 200 = OK
   ✅ 304 = Cached (OK)
   ❌ 404 = Not Found (ERRO)
   ❌ 500 = Server Error (ERRO)

ITENS A VALIDAR:
1. GET /tools/simples-nacional → Status 200
2. GET /index.tsx → Status 200
3. GET style.css (if any) → Status 200
4. GET fonts.google.com → Status 200

RESULTADO ESPERADO:
✅ Todos Status 200 ou 304 (verdes)
✅ Nenhum Status 4xx ou 5xx (vermelhos)
```

---

## PARTE 4: FUNCIONALIDADE (15 minutos)

### Passo 4.1: Teste de Cálculo Completo

```
1. Saia do device mode se estiver (Ctrl + Shift + M para fechar)
2. Acesse: https://portalfiscal-pro.vercel.app/#/tools/simples-nacional
3. Preencha o formulário com dados REAIS:

   Campo 1: "Receita Bruta 12 meses"
   Valor: 480000.00
   
   Campo 2: "Receita do Mês"
   Valor: 50000.00
   
   Campo 3: "Anexo"
   Seleção: I (Comércio)

4. Clique no botão VERDE "Calcular DAS"

OBSERVAR:
□ Botão muda texto para "Calculando..." (enquanto requisição)
□ Botão fica OPACO (opacity-50)
□ Um spinner/ícone aparece enquanto carrega
□ Aguarde 1-2 segundos

RESULTADO ESPERADO:
□ Botão volta ao normal: "Calcular DAS"
□ Seção "RESULTADO" aparece abaixo com 4 cards:
   - Alíq. Nominal: 4%
   - Dedução: R$ 0,00
   - Alíq. Efetiva: ~4%
   - DAS a Pagar: ~R$ 2.000,00
□ Tabela "Memória de Cálculo" aparece com 3 linhas
□ Hash gerado (SIMP-XXXXXXXXX)
□ Nenhum erro vermelho no Console
```

---

### Passo 4.2: Teste de Estado "Calculando..."

```
1. Limpe o Console (clique no ícone de lixeira)
2. Preencha o formulário novamente
3. Clique "Calcular DAS"
4. IMEDIATAMENTE (antes de 1 segundo), observe:
   □ Texto do botão: "Calculando..."
   □ Ícone Calculator está girando
   □ Botão está disabled (não responde a cliques)
   □ Opacity do botão é 50%

RESULTADO ESPERADO:
✅ Transição suave e imediata
✅ UX clara do loading
```

---

### Passo 4.3: Verificar Resultado Correto

```
COM OS DADOS:
- RBT12: 480.000
- Receita: 50.000
- Anexo I (Comércio)

CÁLCULO ESPERADO:
1. RBT12 (480.000) está na faixa 2: 180.001 - 360.000? NÃO
   → Na faixa 3: acima de 360.000? SIM
2. Alíq. Nominal para Faixa 3 (Anexo I): 9.5%
3. Dedução para Faixa 3: 13.860
4. Alíq. Efetiva: [(480.000 × 9.5%) - 13.860] / 480.000
                 = [45.600 - 13.860] / 480.000
                 = 31.740 / 480.000
                 = 0.06612 (6.61%)
5. DAS a Pagar: 50.000 × 0.06612 = R$ 3.306,00

CHECKLIST:
□ Alíq. Efetiva ≈ 6.61%
□ DAS a Pagar ≈ R$ 3.306,00
□ Anexo mostra: "Anexo I - Comércio"
□ Hash começa com "SIMP-"
□ Tabela de memória mostra 3 linhas de cálculo

RESULTADO ESPERADO:
✅ Valores calculados CORRETOS
✅ Hash GERADO
✅ Sem erros na resposta
```

---

### Passo 4.4: Teste de Histórico

```
1. Após o cálculo anterior, observe o painel DIREITO ("Histórico")
2. O cálculo deve aparecer como um card no topo

CHECKLIST:
□ Card mostra "Anexo I - Comércio"
□ Mostra "R$ 3.306,00" (DAS calculado)
□ Mostra o Hash "SIMP-XXXXXXXXX"
□ Pode clicar no card para repetir cálculo (se implementado)

3. Faça OUTRO cálculo com dados diferentes:
   - RBT12: 150.000
   - Receita: 15.000
   - Anexo: I
   
4. Observe o histórico ter 2 itens

CHECKLIST:
□ Novo cálculo aparece NO TOPO
□ Cálculo anterior move para baixo
□ Máximo 5 itens visíveis (conforme código: slice(0, 5))
□ Salvos em localStorage (persistem ao recarregar)

RESULTADO ESPERADO:
✅ Histórico FUNCIONANDO
✅ Dados PERSISTEM ao recarregar
```

---

### Passo 4.5: Teste de Erro

```
1. Limpe o formulário
2. Deixe os campos VAZIOS
3. Clique "Calcular DAS"

ESPERADO:
□ Navegador mostra: "Please fill out this field" (HTML5 validation)
□ Cálculo NÃO é executado

OU se conseguir passar:
1. Preencha com valores INVÁLIDOS:
   - RBT12: -100 (negativo)
   - Receita: 0 (zero)
2. Clique "Calcular DAS"

ESPERADO:
□ Mensagem de erro aparece em vermelho
□ Resultado NÃO aparece
□ Console mostra erro (se houver)

RESULTADO ESPERADO:
✅ Validação FUNCIONANDO
✅ Sem crashes ou erros críticos
```

---

## PARTE 5: PADRÃO VISUAL (5 minutos)

### Passo 5.1: Validar Cores de Todos Botões

```
1. Localize TODOS os botões na página:
   A. "Calcular DAS" (PRIMÁRIO - verde)
   B. "Copy Hash" (SECUNDÁRIO - cinza)
   C. "PDF Download" (SECUNDÁRIO - cinza)
   D. Cards de Histórico (INTERATIVOS)

2. Inspeccione cada um com DevTools:
   F12 → Elements → Hover no botão

ESPERADO:
A. "Calcular DAS":
   ✅ bg-emerald-600 (HEX: #059669)
   ✅ text-white
   ✅ hover: bg-emerald-700

B. "Copy Hash" / "PDF":
   ✅ border-slate-200
   ✅ bg-white ou transparent
   ✅ hover: bg-slate-50

C. Histórico:
   ✅ border-slate-200
   ✅ hover: bg-slate-50 dark:bg-slate-700

RESULTADO ESPERADO:
✅ Padrão CONSISTENTE
✅ Cores CORRETAS
✅ Hover states FUNCIONANDO
```

---

### Passo 5.2: Validar Dark Mode

```
1. Abra DevTools (F12)
2. Console → Execute:
   document.documentElement.classList.toggle('dark')
3. Observe a mudança de tema

CHECKLIST:
□ Fundo muda de branco para ESCURO (slate-800/900)
□ Texto muda de escuro para BRANCO
□ Botões se adaptam:
   - Botão primário permanece VERDE
   - Botões secundários mudam de cor
□ Cards têm bg-slate-800 dark:
□ Border muda para slate-700 em dark
□ Sombras desaparecem ou ficam sutis em dark

RESULTADO ESPERADO:
✅ Dark mode COMPLETO
✅ Sem elementos ilegíveis em dark
✅ Cores CONTRASTANTES em ambos temas
```

---

### Passo 5.3: Validar Tipografia

```
1. DevTools → Elements → Inspecione qualquer TEXT

CHECKLIST:
□ Fonte: Plus Jakarta Sans (Google Fonts)
□ Títulos: font-weight: bold (700)
□ Labels: font-weight: 600 (semibold), font-size: 12px
□ Botões: font-weight: 600, font-size: 14px
□ Resultados: font-weight: bold, font-size: 16px
□ Texto secundário: font-size: 12-14px, opacity reduzida

RESULTADO ESPERADO:
✅ Tipografia CONSISTENTE
✅ Hierarquia visual CLARA
✅ Legibilidade ÓTIMA
```

---

## PARTE 6: SCREENSHOTS (OBRIGATÓRIO)

### O que Tirar Screenshot

```
SCREENSHOT 1: Página Principal
- O quê: Formulário completo com layout responsivo
- Como: Print Screen → Paste no Paint → Save como PNG
- Localização: c:\Users\Pichau\Desktop\Screenshots\01_pagina_principal.png

SCREENSHOT 2: Botão Verde (Close-up)
- O quê: Zoom do botão "Calcular DAS"
- Como: DevTools aberto, clicar no botão com F12
- Localização: c:\Users\Pichau\Desktop\Screenshots\02_botao_verde.png

SCREENSHOT 3: Resultado do Cálculo
- O quê: Cards de resultado + Tabela de Memória
- Como: Depois de executar cálculo, print screen
- Localização: c:\Users\Pichau\Desktop\Screenshots\03_resultado.png

SCREENSHOT 4: Mobile (375px)
- O quÉ: Layout responsivo em mobile
- Como: Device mode 375px → Print Screen
- Localização: c:\Users\Pichau\Desktop\Screenshots\04_mobile.png

SCREENSHOT 5: Tablet (768px)
- O quê: Layout em tablet com 2 colunas
- Como: Device mode 768px → Print Screen
- Localização: c:\Users\Pichau\Desktop\Screenshots\05_tablet.png

SCREENSHOT 6: DevTools - Styles do Botão
- O quê: Inspecção mostrando classes e computed styles
- Como: F12 → Elements → Selecione botão → Styles visível
- Localização: c:\Users\Pichau\Desktop\Screenshots\06_devtools_styles.png

SCREENSHOT 7: Console Limpo
- O quê: Aba Console sem erros críticos
- Como: F12 → Console → Print Screen
- Localização: c:\Users\Pichau\Desktop\Screenshots\07_console_limpo.png

SCREENSHOT 8: Dark Mode
- O quê: Mesmo layout em tema escuro
- Como: Toggle dark mode → Print Screen
- Localização: c:\Users\Pichau\Desktop\Screenshots\08_dark_mode.png
```

---

## CHECKLIST FINAL DE EXECUÇÃO

```
PARTE 1: Visual & Design
[✓] F1.1 - Página carrega corretamente
[  ] F1.2 - Cor do botão é emerald (verde)
[  ] F1.3 - Border radius é 12px (rounded-xl)
[  ] F1.4 - Altura do botão é 44px (h-11)
[  ] F1.5 - Font weight é semibold (600)

PARTE 2: Responsividade
[  ] F2.1 - Mobile 375px se adapta
[  ] F2.2 - Tablet 768px tem 2 colunas
[  ] F2.3 - Desktop 1920px está centralizado

PARTE 3: Console & Network
[  ] F3.1 - Console sem erros críticos
[  ] F3.2 - Network: todos Status 200/304

PARTE 4: Funcionalidade
[  ] F4.1 - Cálculo executa corretamente
[  ] F4.2 - Botão muda para "Calculando..."
[  ] F4.3 - Resultado aparece correto
[  ] F4.4 - Histórico salva
[  ] F4.5 - Validações funcionam

PARTE 5: Padrão Visual
[  ] F5.1 - Todos botões seguem padrão
[  ] F5.2 - Dark mode completo
[  ] F5.3 - Tipografia consistente

PARTE 6: Screenshots
[  ] F6.1 - Página Principal
[  ] F6.2 - Botão Verde
[  ] F6.3 - Resultado
[  ] F6.4 - Mobile
[  ] F6.5 - Tablet
[  ] F6.6 - DevTools Styles
[  ] F6.7 - Console Limpo
[  ] F6.8 - Dark Mode

TOTAL: 24 pontos de validação
```

---

## TEMPO ESTIMADO

| Parte | Duração | Total |
|-------|---------|-------|
| 1. Visual & Design | 5 min | 5 min |
| 2. Responsividade | 10 min | 15 min |
| 3. Console & Network | 10 min | 25 min |
| 4. Funcionalidade | 15 min | 40 min |
| 5. Padrão Visual | 5 min | 45 min |
| 6. Screenshots | 10 min | **55 min TOTAL** |

---

## CONTATO & SUPORTE

Se encontrar ERROS durante a validação:

```
1. Anote o erro exato (screenshot)
2. Verifique o console (F12)
3. Copie a mensagem de erro
4. Abra um issue no GitHub com:
   - URL exata onde erro ocorreu
   - Steps para reproduzir
   - Screenshot do erro
   - Console log (copie o erro)
   - Navegador & versão (Chrome 120, Firefox 121, etc)
```

---

**Boa sorte com a validação! 🚀**

