<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const config = useRuntimeConfig()
const api = config.public.apiBase

const { data, pending, error } = await useFetch(() => `${api}/news/${slug}`)
</script>

<template>
  <section class="wrap">
    <div v-if="pending">Загрузка...</div>
    <div v-else-if="error" style="color:red">Новость не найдена</div>
    <div v-else>
      <h1 class="title">{{ data!.title }}</h1>
      <div class="date">{{ new Date(data!.publishedAt).toLocaleDateString('ru-RU', { day:'numeric', month:'long', year:'numeric' }) }}</div>
      <img v-if="data!.imageUrl" :src="data!.imageUrl" class="cover" alt="" />
      <article class="content">
        <p v-for="(p, i) in data!.content.split('\n').filter(Boolean)" :key="i">{{ p }}</p>
      </article>
      <NuxtLink to="/news" class="back">Назад</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.wrap { max-width: 920px; margin: 0 auto; }
.title { font-size: 48px; margin: 12px 0; }
.date { opacity: .85; margin-bottom: 12px; text-decoration: underline; text-underline-offset: 3px; }
.cover { width: 100%; height: auto; border-radius: 14px; margin: 14px 0; }
.content p { margin: 10px 0; line-height: 1.6; }
.back { display: inline-block; margin-top: 12px; padding: 8px 12px; border-radius: 10px; background: rgba(255,255,255,.1); text-decoration: none; }
</style>
