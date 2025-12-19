# Portal Fiscal Pro - Deploy Script
# Este script configura Git e faz push para GitHub

Write-Host "🚀 Portal Fiscal Pro - Deploy para GitHub" -ForegroundColor Cyan
Write-Host ""

# Navegar para o diretório
Set-Location "c:\Users\Pichau\Desktop\Portal Fiscal\portal-fiscal-pro"

# Configurar Git
Write-Host "⚙️  Configurando Git..." -ForegroundColor Yellow
git config user.email "douglessa1@gmail.com"
git config user.name "Douglas Alves"

# Verificar status
Write-Host ""
Write-Host "📊 Status do repositório:" -ForegroundColor Yellow
git status

# Adicionar todos os arquivos
Write-Host ""
Write-Host "📦 Adicionando arquivos..." -ForegroundColor Yellow
git add .

# Commit
Write-Host ""
Write-Host "💾 Fazendo commit..." -ForegroundColor Yellow
git commit -m "feat: Portal Fiscal Pro - 30 ferramentas fiscais completas

- 30 ferramentas migradas com sucesso
- Design System Slate/Emerald aplicado
- Fórmulas validadas por Jules AI
- TypeScript + React 19 + Vite
- Dark mode completo
- CalculationMemory em todos os cálculos
- Pronto para produção"

# Verificar se remote existe
$remoteExists = git remote | Select-String "origin"
if (-not $remoteExists) {
    Write-Host ""
    Write-Host "🔗 Adicionando remote..." -ForegroundColor Yellow
    git remote add origin https://github.com/douglessa1/https-github.com-douglessa1-portal-fiscal-pro.git
}

# Renomear branch para main
Write-Host ""
Write-Host "🌿 Configurando branch main..." -ForegroundColor Yellow
git branch -M main

# Push
Write-Host ""
Write-Host "🚀 Fazendo push para GitHub..." -ForegroundColor Yellow
Write-Host "⚠️  Você precisará autenticar com seu Personal Access Token" -ForegroundColor Red
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ SUCESSO! Código enviado para GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Repositório: https://github.com/douglessa1/https-github.com-douglessa1-portal-fiscal-pro" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📋 Próximos passos:" -ForegroundColor Yellow
    Write-Host "1. Acesse https://vercel.com/new" -ForegroundColor White
    Write-Host "2. Importe o repositório portal-fiscal-pro" -ForegroundColor White
    Write-Host "3. Configure:" -ForegroundColor White
    Write-Host "   - Framework: Vite" -ForegroundColor Gray
    Write-Host "   - Build Command: npm run build" -ForegroundColor Gray
    Write-Host "   - Output Directory: dist" -ForegroundColor Gray
    Write-Host "4. Clique em Deploy!" -ForegroundColor White
    Write-Host ""
}
else {
    Write-Host ""
    Write-Host "❌ Erro no push. Possíveis causas:" -ForegroundColor Red
    Write-Host "1. Credenciais incorretas (use Personal Access Token)" -ForegroundColor Yellow
    Write-Host "2. Repositório remoto tem arquivos conflitantes" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "💡 Solução alternativa:" -ForegroundColor Cyan
    Write-Host "1. Delete o repositório no GitHub" -ForegroundColor White
    Write-Host "2. Crie um novo repositório vazio (sem README)" -ForegroundColor White
    Write-Host "3. Rode este script novamente" -ForegroundColor White
    Write-Host ""
}

Write-Host "Pressione qualquer tecla para continuar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
