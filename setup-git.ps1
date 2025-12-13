# Скрипт для автоматической настройки Git и подключения к GitHub
# Запустите этот скрипт ПОСЛЕ установки Git

Write-Host "=== Настройка Git и подключение к GitHub ===" -ForegroundColor Green
Write-Host ""

# Проверка наличия Git
try {
    $gitVersion = git --version
    Write-Host "✓ Git найден: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git не найден! Пожалуйста, установите Git сначала." -ForegroundColor Red
    Write-Host "Скачайте с: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Текущая директория: $(Get-Location)" -ForegroundColor Cyan
Write-Host ""

# Переход в папку проекта
$projectPath = "C:\Users\Admin\Documents\belimport"
if (Test-Path $projectPath) {
    Set-Location $projectPath
    Write-Host "✓ Перешли в папку проекта" -ForegroundColor Green
} else {
    Write-Host "✗ Папка проекта не найдена: $projectPath" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== Настройка Git ===" -ForegroundColor Yellow

# Запрос данных пользователя
$userName = Read-Host "Введите ваше имя для Git"
$userEmail = Read-Host "Введите ваш email (используйте email от GitHub)"

# Настройка Git
git config --global user.name "$userName"
git config --global user.email "$userEmail"
git config --global init.defaultBranch main

Write-Host "✓ Git настроен" -ForegroundColor Green
Write-Host ""

# Инициализация репозитория (если еще не инициализирован)
if (-not (Test-Path ".git")) {
    Write-Host "=== Инициализация Git репозитория ===" -ForegroundColor Yellow
    git init
    Write-Host "✓ Репозиторий инициализирован" -ForegroundColor Green
} else {
    Write-Host "✓ Git репозиторий уже инициализирован" -ForegroundColor Green
}

Write-Host ""

# Проверка и добавление удаленного репозитория
Write-Host "=== Настройка удаленного репозитория ===" -ForegroundColor Yellow
$remoteUrl = "https://github.com/shelbit1/belimport.git"

# Проверяем, существует ли уже remote
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "✓ Удаленный репозиторий уже настроен: $existingRemote" -ForegroundColor Green
    $changeRemote = Read-Host "Хотите изменить URL? (y/n)"
    if ($changeRemote -eq "y" -or $changeRemote -eq "Y") {
        git remote set-url origin $remoteUrl
        Write-Host "✓ URL обновлен" -ForegroundColor Green
    }
} else {
    git remote add origin $remoteUrl
    Write-Host "✓ Удаленный репозиторий добавлен: $remoteUrl" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Проверка подключения ===" -ForegroundColor Yellow
git remote -v
Write-Host ""

# Проверка статуса
Write-Host "=== Статус репозитория ===" -ForegroundColor Yellow
git status
Write-Host ""

Write-Host "=== Настройка завершена! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Следующие шаги:" -ForegroundColor Cyan
Write-Host "1. Добавьте файлы: git add ." -ForegroundColor White
Write-Host "2. Создайте коммит: git commit -m 'Initial commit'" -ForegroundColor White
Write-Host "3. Отправьте в GitHub: git push -u origin main" -ForegroundColor White
Write-Host ""

