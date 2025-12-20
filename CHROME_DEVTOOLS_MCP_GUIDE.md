# Chrome DevTools MCP Integration

## Configuração Concluída ✅

O **Chrome DevTools MCP** foi integrado ao seu projeto Portal Fiscal Pro para validação automatizada via chat do VS Code.

### O que foi configurado?

1. **Instalação Local**: `chrome-devtools-mcp` adicionado como devDependency
2. **VS Code Settings**: Arquivo `.vscode/settings.json` configurado
3. **MCP Server Config**: Arquivo `mcp.json` na raiz do projeto

### Como Usar

#### 1. **Iniciar o App Localmente**
```powershell
npm run dev
# App rodará em http://localhost:5173 (ou similar)
```

#### 2. **Ativar Chrome DevTools MCP no Chat**
- Abra o chat do VS Code (Copilot ou extensão MCP)
- O MCP deve estar automaticamente disponível
- Use comandos naturais para validar seu projeto

#### 3. **Exemplos de Validação**

**Testar calculadora fiscal:**
```
Abra o navegador em http://localhost:5173
Navegue até o tool "Simples Nacional"
Clique no input de receita bruta
Digite 50000
Tire uma screenshot para validar o resultado
```

**Validar performance:**
```
Tire um trace de performance da página http://localhost:5173/dashboard
Me mostre os Core Web Vitals
Identifique gargalos de carregamento
```

**Testar formulários:**
```
Preencha o formulário de login
Valide os campos obrigatórios
Clique em submit
Verifique se redireciona corretamente
```

### Ferramentas Disponíveis

O Chrome DevTools MCP expõe 28+ ferramentas em 6 categorias:

| Categoria | Ferramentas | Uso |
|-----------|------------|-----|
| **Input Automation** | click, fill, drag, upload, type, hover | Preencher formulários, clicar elementos |
| **Navigation** | new_page, navigate, wait_for, reload | Navegar entre páginas e aguardar elementos |
| **Performance** | get_performance_insights, trace_page | Analisar performance e Core Web Vitals |
| **Network** | get_request_list, get_response_body | Inspecionar requisições HTTP |
| **Emulation** | set_device_emulation, set_viewport | Testar em diferentes dispositivos |
| **Debugging** | screenshot, console_log_list, evaluate_script | Capturar telas, logs e executar scripts |

### Exemplos de Uso Prático

#### Screenshot de Validação
```
Take a screenshot of http://localhost:5173/tools/simples-nacional
```

#### Validar Cálculo
```
Navigate to http://localhost:5173/tools/icms-st-calculator
Fill the input with value "100000"
Click the "Calcular" button
Wait for the result
Take a screenshot of the result
```

#### Performance Profile
```
Navigate to http://localhost:5173/dashboard
Take a performance trace
Show me the Core Web Vitals
Identify the slowest components
```

#### Network Analysis
```
Navigate to http://localhost:5173/tools/monitor-nfe
Get the request list
Filter for API calls to Gemini
Show the response time of each request
```

### Configuração Avançada

#### Rodando Chrome em Headless Mode (sem UI)
Edite `.vscode/settings.json`:
```json
{
  "[mcp]": {
    "mcpServers": {
      "chrome-devtools": {
        "command": "npx",
        "args": ["-y", "chrome-devtools-mcp@latest", "--headless"]
      }
    }
  }
}
```

#### Conectar a Chrome Existente
Se tiver Chrome rodando em `http://127.0.0.1:9222`:
```json
{
  "[mcp]": {
    "mcpServers": {
      "chrome-devtools": {
        "command": "npx",
        "args": ["-y", "chrome-devtools-mcp@latest", "--browser-url", "http://127.0.0.1:9222"]
      }
    }
  }
}
```

#### Viewport Customizado
```json
{
  "[mcp]": {
    "mcpServers": {
      "chrome-devtools": {
        "command": "npx",
        "args": ["-y", "chrome-devtools-mcp@latest", "--viewport", "1920x1080"]
      }
    }
  }
}
```

### Troubleshooting

**Problema**: Chrome não é encontrado
- **Solução**: VS Code procura em locais padrão. Se instalado em local customizado, especifique o caminho em `mcp.json`

**Problema**: MCP não aparece no chat
- **Solução**: Reinicie o VS Code (`Ctrl+K Ctrl+R`)
- Verifique se `cody.enabled` é `true` em `.vscode/settings.json`

**Problema**: Timeout ao conectar ao Chrome
- **Solução**: Certifique-se que o app local está rodando (`npm run dev`)
- Aumentar timeout do MCP em `mcp.json`

### Documentação Oficial

- 📖 [Chrome DevTools MCP GitHub](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- 📚 [Tool Reference](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/tool-reference.md)
- 🐛 [Troubleshooting Guide](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/troubleshooting.md)

### Próximos Passos

1. Reinicie o VS Code
2. Abra a Paleta de Comandos (`Ctrl+Shift+P`)
3. Digite "MCP" para ver opções disponíveis
4. Inicie o app local: `npm run dev`
5. Abra o chat e comece a validar seu projeto!

---

**Versão**: Chrome DevTools MCP v0.12.1  
**Atualizado**: Dezembro 2025
