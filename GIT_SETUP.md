# Инструкция по настройке Git и подключению к GitHub

## Шаг 1: Установка Git

Git не установлен на вашем компьютере. Вам нужно установить его:

1. **Скачайте Git для Windows:**
   - Перейдите на https://git-scm.com/download/win
   - Скачайте установщик (автоматически определит 64-bit версию)
   - Или используйте прямую ссылку: https://github.com/git-for-windows/git/releases/latest

2. **Установите Git:**
   - Запустите установщик
   - Используйте настройки по умолчанию (рекомендуется)
   - Важно: выберите опцию "Git from the command line and also from 3rd-party software"
   - Завершите установку

3. **Перезапустите Cursor** после установки Git

## Шаг 2: Настройка Git (после установки)

После установки Git выполните следующие команды в терминале Cursor:

```powershell
# Настройка имени пользователя
git config --global user.name "Ваше Имя"

# Настройка email (используйте email, привязанный к GitHub)
git config --global user.email "ваш-email@example.com"

# Настройка редактора по умолчанию (опционально)
git config --global core.editor "code --wait"
```

## Шаг 3: Инициализация репозитория

Перейдите в папку проекта и инициализируйте Git:

```powershell
cd C:\Users\Admin\Documents\belimport
git init
```

## Шаг 4: Подключение к удаленному репозиторию GitHub

```powershell
# Добавьте удаленный репозиторий
git remote add origin https://github.com/shelbit1/belimport.git

# Проверьте подключение
git remote -v
```

## Шаг 5: Первый коммит и отправка

```powershell
# Добавьте все файлы
git add .

# Создайте первый коммит
git commit -m "Initial commit"

# Отправьте в GitHub (если это ваш репозиторий)
git push -u origin main
```

## Альтернативный способ: Использование GitHub Desktop

Если вы предпочитаете графический интерфейс:

1. Скачайте GitHub Desktop: https://desktop.github.com/
2. Установите и войдите в свой аккаунт GitHub
3. Откройте проект через GitHub Desktop
4. GitHub Desktop автоматически настроит Git

## Настройка SSH ключей (опционально, для более безопасного доступа)

Если вы хотите использовать SSH вместо HTTPS:

1. Сгенерируйте SSH ключ:
   ```powershell
   ssh-keygen -t ed25519 -C "ваш-email@example.com"
   ```

2. Добавьте публичный ключ в GitHub:
   - Скопируйте содержимое файла `C:\Users\Admin\.ssh\id_ed25519.pub`
   - Перейдите в GitHub → Settings → SSH and GPG keys → New SSH key
   - Вставьте ключ и сохраните

3. Измените URL удаленного репозитория:
   ```powershell
   git remote set-url origin git@github.com:shelbit1/belimport.git
   ```

## Проверка подключения

После настройки проверьте:

```powershell
git status
git remote -v
git log
```

---

**Примечание:** После установки Git перезапустите Cursor, чтобы изменения в PATH вступили в силу.

