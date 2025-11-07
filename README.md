# Nest + Nuxt + Prisma Starter

- Backend: NestJS + Prisma (SQLite for dev)
- Frontend: Nuxt 3
- Feature: Invite-link registration (/register/:token)

## Quick start

```bash
# 1) Install deps
pnpm i

# 2) Configure envs
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# 3) DB migrate & generate
pnpm --filter api prisma generate
pnpm --filter api prisma migrate dev --name init

# 4) Run both
pnpm dev
```

Open: http://localhost:3000

Use POST http://localhost:3001/auth/invite with body `{ "email": "you@example.com" }`
to get an invite link like `http://localhost:3000/register/<token>`.
