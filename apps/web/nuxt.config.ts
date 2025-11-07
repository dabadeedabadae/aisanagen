export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: { strict: true },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'
    }
  },
  app: {
    head: {
      title: 'Info Site',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }]
    }
  }
})
