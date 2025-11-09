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
  <section class="main-section">
    <section class="container">
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
  </section>
</template>

<style scoped>
.main-section {
  background: url('/uploads/background2.jpg') center top / cover no-repeat;
  background-attachment: scroll;
  min-height: 100vh;
  width: 100%;
  padding: 40px 0;
  color: white;
  display: flex;
  flex-direction: column;
}

.h1 {
  font-size: 42px;
  margin: 18px 0 22px;
  text-align: center;
  color: inherit;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
@media (max-width: 900px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
}

.pager {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin: 16px 0;
}

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
}
</style>