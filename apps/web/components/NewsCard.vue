<script setup lang="ts">
defineProps<{ item: { slug: string; title: string; imageUrl?: string | null; excerpt?: string | null; publishedAt: string } }>()
</script>

<template>
  <article class="news-card">
    <NuxtLink :to="`/news/${item.slug}`" class="card-link">
      <div v-if="item.imageUrl" class="card-image">
        <img :src="item.imageUrl" :alt="item.title" />
        <div class="image-overlay"></div>
      </div>
      <div class="card-content">
        <h3 class="card-title">{{ item.title }}</h3>
        <p v-if="item.excerpt" class="card-excerpt">{{ item.excerpt }}</p>
        <div class="card-footer">
          <span class="card-date">
            {{ new Date(item.publishedAt).toLocaleDateString('ru-RU', { day:'numeric', month:'long', year:'numeric' }) }}
          </span>
          <span class="card-arrow">→</span>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped>
.news-card {
  background: rgba(15, 22, 52, 0.55);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 191, 255, 0.3);
  border-color: rgba(0, 191, 255, 0.5);
}

.card-link {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.card-image {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.news-card:hover .card-image img {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
  pointer-events: none;
}

.card-content {
  padding: 26px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-title {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: #fff;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-excerpt {
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  line-height: 1.6;
  margin: 0 0 20px 0;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.card-date {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: capitalize;
}

.card-arrow {
  font-size: 20px;
  color: #00bfff;
  transition: transform 0.3s ease;
}

.news-card:hover .card-arrow {
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .card-image {
    height: 180px;
  }
  
  .card-content {
    padding: 20px;
  }
  
  .card-title {
    font-size: 20px;
  }
  
  .card-excerpt {
    font-size: 14px;
  }
}
</style>
