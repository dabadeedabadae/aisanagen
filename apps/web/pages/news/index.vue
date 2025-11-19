<script setup lang="ts">
const { locale } = useI18n()
const config = useRuntimeConfig()
const api = config.public.apiBase
const page = ref(1)
const limit = ref(6)

const { data, pending, error, refresh } = await useFetch(() => `${api}/news?page=${page.value}&limit=${limit.value}&lang=${locale.value}`, {
  key: () => `news-${page.value}-${locale.value}`
})

watch([page, locale], () => {
  refresh()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<template>
  <section class="news-section">
    <div class="news-header">
      <h1 class="news-title">{{ $t('news.title') }}</h1>
      <p class="news-subtitle">{{ $t('news.subtitle') }}</p>
    </div>

    <div class="container">
      <div v-if="pending" class="loading">
        <div class="loading-spinner"></div>
        <p>{{ $t('news.loading') }}</p>
      </div>

      <div v-else-if="error" class="error-message">
        <span class="error-icon">⚠️</span>
        <p>{{ $t('news.error') }}</p>
      </div>

      <div v-else-if="!data?.items || data.items.length === 0" class="empty-state">
        <span class="empty-icon">📰</span>
        <p>{{ $t('news.empty') }}</p>
      </div>

      <div v-else>
        <div class="news-grid">
          <NewsCard v-for="n in data.items" :key="n.slug" :item="n" />
        </div>

        <div v-if="data.pages > 1" class="pagination">
          <button
            class="pagination-btn"
            :disabled="page <= 1"
            @click="page--"
            :class="{ 'disabled': page <= 1 }"
          >
            <span>←</span>
            <span>{{ $t('common.prev') }}</span>
          </button>
          
          <div class="pagination-info">
            <span class="current-page">{{ page }}</span>
            <span class="separator">из</span>
            <span class="total-pages">{{ data.pages }}</span>
          </div>
          
          <button
            class="pagination-btn"
            :disabled="page >= data.pages"
            @click="page++"
            :class="{ 'disabled': page >= data.pages }"
          >
            <span>{{ $t('common.next') }}</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.news-section {
  min-height: 100vh;
  background: linear-gradient(135deg, #131b44 0%, #263366 100%);
  padding: 120px 20px 60px 20px;
  color: white;
}

.news-header {
  text-align: center;
  margin-bottom: 50px;
}

.news-title {
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 10px 0;
  background: linear-gradient(90deg, #02ffc0, #00bfff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.news-subtitle {
  font-size: 18px;
  opacity: 0.7;
  margin: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.loading,
.error-message,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top-color: #00bfff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-icon,
.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.6;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

@media (max-width: 900px) {
  .news-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 640px) {
  .news-section {
    padding: 100px 15px 40px 15px;
  }
  
  .news-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .news-title {
    font-size: 36px;
  }
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 50px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(.disabled) {
  border-color: #00bfff;
  background: rgba(0, 191, 255, 0.1);
  transform: translateY(-2px);
}

.pagination-btn.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
}

.current-page {
  color: #00bfff;
  font-size: 20px;
}

.separator {
  opacity: 0.5;
}

.total-pages {
  opacity: 0.7;
}

@media (max-width: 640px) {
  .pagination {
    flex-direction: column;
    gap: 15px;
  }
  
  .pagination-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
