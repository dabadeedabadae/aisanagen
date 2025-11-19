export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: { strict: true },
  modules: ['@nuxtjs/i18n'],
  
  i18n: {
    locales: [
      { code: 'kk', name: 'Қазақша', file: 'kk.json' },
      { code: 'ru', name: 'Русский', file: 'ru.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'ru',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'ru'
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'
    }
  },

  // 👇 важный блок
  vite: {
    server: {
      hmr: {
        protocol: 'ws',
        host: '127.0.0.1', // иногда localhost шалит — укажем явно
        port: 24679,       // свободный порт (или любой другой)
        clientPort: 24679, // должен совпадать
        path: '/_nuxt/'    // Nuxt ожидает этот путь в ws-URL (как в твоём скрине)
      }
    }
  },

  // при желании зафиксируй сам dev-порт
  devServer: { host: '127.0.0.1', port: 3000 },

  app: {
    head: {
      title: 'Info Site',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }]
    }
  }
})
