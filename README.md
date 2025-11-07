# Nest + Nuxt + Prisma Starter

- Backend: NestJS + Prisma (SQLite for dev)
- Frontend: Nuxt 3
- Feature: Invite-link registration (/register/:token)

## Quick start
Убедитесь что у вас есть 

Node.js 20+ (LTS),
npm 10+,
Git

это для веба
```bash
cd apps/api

# env (если файла нет, создай простой .env)
# cp .env.example .env
# В .env можно ничего не указывать — по умолчанию порт 3001.
# При желании:
# PORT=3001

npm i

# Prisma (SQLite dev)
npx prisma generate
npx prisma migrate dev --name init

# Папка для загрузок изображений (если нет)
mkdir -p uploads

# Запуск dev-сервера Nest
npm run dev

```
это для фронта 
```bash
cd apps/web

# env
# cp .env.example .env
# Открой .env и УБЕДИСЬ, что указана база API:
# NUXT_PUBLIC_API_BASE_URL=http://localhost:3001

npm i

# Запуск dev-сервера Nuxt
npm run dev


```
Open: http://localhost:3000

Use POST http://localhost:3001/auth/invite with body `{ "email": "you@example.com" }`
to get an invite link like `http://localhost:3000/register/<token>`.
