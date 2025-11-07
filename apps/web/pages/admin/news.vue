<script setup lang="ts">
const config = useRuntimeConfig()
const api = config.public.apiBase

const form = reactive({
  title: '',
  imageUrl: '',
  excerpt: '',
  content: '',
  published: true
})

const creating = ref(false)
const message = ref<string | null>(null)

async function submit() {
  creating.value = true
  message.value = null
  try {
    const res = await $fetch(`${api}/admin/news`, { method: 'POST', body: form })
    message.value = `Создано: /news/${(res as any).slug}`
    form.title = ''; form.imageUrl = ''; form.excerpt = ''; form.content = ''; form.published = true
  } catch (e: any) {
    message.value = e?.data?.message || 'Ошибка создания'
  } finally {
    creating.value = false
  }
}
</script>

<template>
  <section>
    <h1>Админка: Новости</h1>
    <form class="form" @submit.prevent="submit">
      <label>Заголовок
        <input v-model="form.title" required />
      </label>
      <label>Ссылка на изображение
        <input v-model="form.imageUrl" placeholder="https://..." />
      </label>
      <label>Краткое описание
        <textarea v-model="form.excerpt" rows="2" maxlength="300" />
      </label>
      <label>Полный текст
        <textarea v-model="form.content" rows="8" required />
      </label>
      <label class="row">
        <input type="checkbox" v-model="form.published" />
        Опубликовано
      </label>
      <div class="row">
        <button type="submit" :disabled="creating">Создать</button>
      </div>
      <div v-if="message" class="msg">{{ message }}</div>
    </form>
  </section>
</template>

<style scoped>
.form { display:flex; flex-direction: column; gap: 10px; max-width: 760px; }
.form input, .form textarea { width: 100%; padding: 10px; border-radius: 10px; border: 1px solid #444; background: rgba(255,255,255,.05); color: #fff; }
.row { display: flex; align-items: center; gap: 12px; }
button { padding: 10px 14px; border-radius: 10px; background: rgba(255,255,255,.12); border: 1px solid #555; }
.msg { margin-top: 8px; opacity: .9; }
</style>
