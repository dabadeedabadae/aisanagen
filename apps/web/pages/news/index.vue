<script setup lang="ts">
const config = useRuntimeConfig()
const api = config.public.apiBase
const page = ref(1)
const limit = ref(6) // 6 карточек на страницу

const { data, pending, error } = await useFetch(() => `${api}/news?page=${page.value}&limit=${limit.value}`, {
  key: () => `news-${page.value}`
})
</script>

<template>
  <section>
    <h1 class="h1">Новости</h1>

    <div v-if="pending">Загрузка...</div>
    <div v-else-if="error" style="color:red">Ошибка загрузки</div>
    <div v-else>
      <div class="grid">
        <NewsCard v-for="n in data!.items" :key="n.slug" :item="n" />
      </div>

      <div class="pager" v-if="data!.pages > 1">
        <button :disabled="page<=1" @click="page--">Назад</button>
        <span>{{ page }} / {{ data!.pages }}</span>
        <button :disabled="page>=data!.pages" @click="page++">Вперед</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.h1 { font-size: 42px; margin: 18px 0 22px; text-align: center; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
@media (max-width: 900px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }
.pager { display: flex; gap: 12px; justify-content: center; margin: 16px 0; }
</style>
