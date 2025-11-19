<script setup lang="ts">
const { locale } = useI18n()
const route = useRoute()
const slug = route.params.slug as string
const config = useRuntimeConfig()
const api = config.public.apiBase

const localePath = (path: string) => {
  if (locale.value === 'ru') return path;
  return `/${locale.value}${path}`;
};

const { data, pending, error, refresh } = await useFetch(() => `${api}/news/${slug}?lang=${locale.value}`, {
  key: () => `news-${slug}-${locale.value}`
})

watch(locale, () => {
  refresh()
})

useHead({
  title: data.value ? `${data.value.title} - Новости` : 'Новость',
  meta: [
    {
      name: 'description',
      content: data.value?.excerpt || 'Читайте новости на AI Sana'
    }
  ]
})
</script>

<template>
  <section class="article-section">
    <div v-if="pending" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Загрузка новости...</p>
    </div>

    <div v-else-if="error" class="error-container">
      <span class="error-icon">⚠️</span>
      <h2>Новость не найдена</h2>
      <NuxtLink :to="localePath('/news')" class="back-link">{{ $t('news.back') }}</NuxtLink>
    </div>

    <article v-else class="article-container">
      <!-- Заголовок и метаданные -->
      <header class="article-header">
        <NuxtLink :to="localePath('/news')" class="back-button">
          <span class="back-arrow">←</span>
          <span>{{ $t('news.backToNews') }}</span>
        </NuxtLink>
        
        <div class="article-meta">
          <time class="article-date">
            {{ new Date(data!.publishedAt).toLocaleDateString('ru-RU', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }) }}
          </time>
        </div>

        <h1 class="article-title">{{ data!.title }}</h1>
        
        <p v-if="data!.excerpt" class="article-excerpt">{{ data!.excerpt }}</p>
      </header>

      <!-- Изображение -->
      <div v-if="data!.imageUrl" class="article-image">
        <img :src="data!.imageUrl" :alt="data!.title" />
      </div>

      <!-- Содержание -->
      <div class="article-content">
        <div class="content-text">
          <p 
            v-for="(paragraph, i) in data!.content.split('\n').filter(Boolean)" 
            :key="i"
            class="paragraph"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>

      <!-- Футер статьи -->
      <footer class="article-footer">
        <NuxtLink :to="localePath('/news')" class="footer-link">
          <span>←</span>
          <span>{{ $t('news.allNews') }}</span>
        </NuxtLink>
      </footer>
    </article>
  </section>
</template>

<style scoped>
.article-section {
  min-height: 100vh;
  background: linear-gradient(135deg, #131b44 0%, #28356c 100%);
  padding: 120px 20px 60px 20px;
  color: white;
}

.loading-container,
.error-container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
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

.error-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.error-container h2 {
  font-size: 28px;
  margin-bottom: 20px;
}

.article-container {
  max-width: 900px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 24px;
  padding: 50px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.article-header {
  margin-bottom: 40px;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 30px;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: rgba(0, 191, 255, 0.1);
  border-color: #00bfff;
  transform: translateX(-3px);
}

.back-arrow {
  font-size: 18px;
}

.article-meta {
  margin-bottom: 20px;
}

.article-date {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  background: rgba(0, 191, 255, 0.1);
  border: 1px solid rgba(0, 191, 255, 0.3);
  color: #00bfff;
  font-size: 14px;
  font-weight: 600;
  text-transform: capitalize;
}

.article-title {
  font-size: 42px;
  font-weight: 700;
  margin: 0 0 20px 0;
  line-height: 1.3;
  background: linear-gradient(90deg, #fff, #00bfff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.article-excerpt {
  font-size: 20px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-weight: 400;
}

.article-image {
  margin: 40px 0;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.article-image img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.article-content {
  margin: 40px 0;
}

.content-text {
  font-size: 18px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
}

.paragraph {
  margin: 0 0 24px 0;
  text-align: justify;
}

.paragraph:last-child {
  margin-bottom: 0;
}

.article-footer {
  margin-top: 60px;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 12px;
  background: linear-gradient(90deg, #02ffc0, #00bfff);
  color: #000;
  text-decoration: none;
  font-size: 16px;
  font-weight: 700;
  transition: all 0.3s ease;
}

.footer-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 191, 255, 0.4);
}

.back-link {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 12px;
  background: linear-gradient(90deg, #02ffc0, #00bfff);
  color: #000;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s ease;
}

.back-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 191, 255, 0.4);
}

@media (max-width: 768px) {
  .article-container {
    padding: 30px 20px;
  }

  .article-title {
    font-size: 32px;
  }

  .article-excerpt {
    font-size: 18px;
  }

  .content-text {
    font-size: 16px;
  }

  .article-image {
    margin: 30px 0;
  }
}

@media (max-width: 480px) {
  .article-section {
    padding: 100px 15px 20px 15px;
  }

  .article-container {
    padding: 25px 15px;
  }

  .article-title {
    font-size: 28px;
  }

  .article-excerpt {
    font-size: 16px;
  }
}
</style>
