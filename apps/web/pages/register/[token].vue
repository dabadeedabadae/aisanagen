<script setup lang="ts">
const route = useRoute()
const token = route.params.token as string
const name = ref('')
const password = ref('')
const email = ref<string | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const ok = ref(false)

const config = useRuntimeConfig()
const api = config.public.apiBase

onMounted(async () => {
  try {
    const res = await $fetch<{ email: string }>(`${api}/auth/invite/${token}`)
    email.value = res.email
  } catch (e: any) {
    error.value = e?.data?.message || 'Invite not found or expired'
  } finally {
    loading.value = false
  }
})

async function submit() {
  error.value = null
  try {
    await $fetch(`${api}/auth/register`, {
      method: 'POST',
      body: { token, name: name.value, password: password.value }
    })
    ok.value = true
  } catch (e: any) {
    error.value = e?.data?.message || 'Registration failed'
  }
}
</script>

<template>
  <section>
    <h1>Регистрация по ссылке</h1>
    <div v-if="loading">Проверяем приглашение...</div>
    <div v-else-if="error" style="color:red">{{ error }}</div>
    <div v-else-if="ok">Готово! Аккаунт создан, можно входить.</div>
    <form v-else @submit.prevent="submit" style="display:flex; flex-direction:column; gap:8px; max-width:380px">
      <label>Email (только чтение)
        <input type="email" :value="email" readonly />
      </label>
      <label>Имя
        <input v-model="name" placeholder="Ваше имя" required />
      </label>
      <label>Пароль
        <input v-model="password" type="password" minlength="6" placeholder="Минимум 6 символов" required />
      </label>
      <button type="submit">Зарегистрироваться</button>
    </form>
  </section>
</template>
