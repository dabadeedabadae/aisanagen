<script setup lang="ts">
const { locale } = useI18n()
const config = useRuntimeConfig()
const api = config.public.apiBase

const { data: coursesData, refresh } = await useFetch<{ items: Array<{ id: string; slug: string; title: string; description: string; link: string }> }>(() => `${api}/courses?lang=${locale.value}`, {
  key: () => `courses-${locale.value}`
})

watch(locale, () => {
  refresh()
})

const courses = computed(() => coursesData.value?.items || [])
</script>

<template>
  <div class="courses-page">
    <div class="courses-container">
      <h1 class="courses-title">{{ $t('courses.title') }}</h1>
      
      <div class="courses-list">
        <div
          v-for="course in courses"
          :key="course.id"
          class="course-card"
        >
          <div class="course-content">
            <h2 class="course-title">
              <a :href="course.link" target="_blank" rel="noopener noreferrer">
                {{ course.title }}
              </a>
            </h2>
            <p class="course-description">{{ course.description }}</p>
          </div>
          <div class="course-actions">
            <a
              :href="course.link"
              target="_blank"
              rel="noopener noreferrer"
              class="course-button"
            >
              {{ $t('courses.details') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.courses-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1429 100%);
  position: relative;
  overflow: hidden;
  padding: 120px 20px 60px 20px;
}

.courses-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(2, 255, 192, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(0, 191, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.courses-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.courses-title {
  font-size: 48px;
  font-weight: 700;
  color: #fff;
  text-align: center;
  margin: 0 0 60px 0;
  background: linear-gradient(90deg, #02ffc0, #00bfff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(2, 255, 192, 0.3);
}

.courses-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.course-card {
  background: rgba(18, 24, 58, 0.4);
  border: 2px solid rgba(2, 255, 192, 0.3);
  border-radius: 16px;
  padding: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(2, 255, 192, 0.1) inset;
}

.course-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(2, 255, 192, 0.6), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.course-card:hover {
  border-color: rgba(2, 255, 192, 0.6);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 40px rgba(2, 255, 192, 0.2),
    0 0 0 1px rgba(2, 255, 192, 0.2) inset;
  transform: translateY(-2px);
}

.course-card:hover::before {
  opacity: 1;
}

.course-content {
  flex: 1;
  min-width: 0;
}

.course-title {
  margin: 0 0 12px 0;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.4;
}

.course-title a {
  color: #fff;
  text-decoration: underline;
  text-decoration-color: rgba(2, 255, 192, 0.5);
  text-underline-offset: 4px;
  transition: all 0.3s ease;
}

.course-title a:hover {
  color: #02ffc0;
  text-decoration-color: #02ffc0;
  text-shadow: 0 0 10px rgba(2, 255, 192, 0.5);
}

.course-description {
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
}

.course-actions {
  flex-shrink: 0;
}

.course-button {
  display: inline-block;
  padding: 12px 32px;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  white-space: nowrap;
}

.course-button:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .courses-page {
    padding: 100px 15px 40px 15px;
  }

  .courses-title {
    font-size: 36px;
    margin-bottom: 40px;
  }

  .course-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    gap: 20px;
  }

  .course-title {
    font-size: 20px;
  }

  .course-description {
    font-size: 14px;
  }

  .course-button {
    width: 100%;
    text-align: center;
  }
}
</style>
