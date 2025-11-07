<script setup lang="ts">
defineProps<{ item: { slug: string; title: string; imageUrl?: string | null; excerpt?: string | null; publishedAt: string } }>()
</script>

<template>
  <article class="card">
    <img v-if="item.imageUrl" :src="item.imageUrl" alt="" class="cover" />
    <h3 class="title">
      <NuxtLink :to="`/news/${item.slug}`">{{ item.title }}</NuxtLink>
    </h3>
    <p class="excerpt">{{ item.excerpt }}</p>
    <div class="footer">
      <span class="date">
        {{ new Date(item.publishedAt).toLocaleDateString('ru-RU', { day:'numeric', month:'long', year:'numeric' }) }}
      </span>
      <NuxtLink class="more" :to="`/news/${item.slug}`">Подробнее</NuxtLink>
    </div>
  </article>
</template>

<style scoped>
.card { background: rgba(0,0,0,.6); border: 1px solid rgba(255,255,255,.1); border-radius: 16px; padding: 12px; backdrop-filter: blur(8px); }
.cover { width: 100%; height: 200px; object-fit: cover; border-radius: 12px; }
.title { margin: 10px 0 6px; font-size: 20px; line-height: 1.2; text-decoration: underline; text-underline-offset: 4px; }
.excerpt { color: #ddd; min-height: 60px; }
.footer { display: flex; align-items: center; justify-content: space-between; margin-top: 8px; }
.more { padding: 8px 12px; border-radius: 20px; background: rgba(255,255,255,.1); text-decoration: none; }
.date { text-decoration: underline; text-underline-offset: 3px; }
</style>
