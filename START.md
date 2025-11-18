# Как запустить проект

## Быстрый старт

### 1. Установка зависимостей (уже выполнено)
```bash
pnpm install
```

### 2. Генерация Prisma Client (уже выполнено)
```bash
cd apps/api
pnpm prisma generate
```

### 3. Запуск проекта

**Вариант 1: Запустить оба приложения одновременно (рекомендуется)**
```bash
# Из корневой директории проекта
pnpm dev
```

Это запустит:
- **API** на `http://localhost:3001`
- **Web** на `http://localhost:3000`

**Вариант 2: Запустить приложения отдельно**

В одном терминале:
```bash
cd apps/api
pnpm dev
```

В другом терминале:
```bash
cd apps/web
pnpm dev
```

## Доступ к приложению

- **Frontend (Nuxt)**: http://localhost:3000
- **Backend API (NestJS)**: http://localhost:3001

## Полезные команды

### API (apps/api)
- `pnpm dev` - запуск в режиме разработки
- `pnpm build` - сборка проекта
- `pnpm start` - запуск собранного проекта
- `pnpm prisma generate` - генерация Prisma Client
- `pnpm prisma migrate dev` - применение миграций

### Web (apps/web)
- `pnpm dev` - запуск в режиме разработки (откроет браузер автоматически)
- `pnpm build` - сборка проекта
- `pnpm preview` - предпросмотр собранного проекта

## Переменные окружения

Если нужно настроить порты или другие параметры, создайте файлы `.env`:

**apps/api/.env** (опционально):
```
DATABASE_URL="file:./prisma/dev.db"
API_PORT=3001
```

**apps/web/.env** (опционально):
```
NUXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

По умолчанию всё работает и без этих файлов.


