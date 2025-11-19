<script setup lang="ts">
const config = useRuntimeConfig()
const api = config.public.apiBase

const form = reactive({
  title: '',
  titleKk: '',
  titleEn: '',
  description: '',
  descriptionKk: '',
  descriptionEn: '',
  link: '',
  published: true
})

const creating = ref(false)
const message = ref<string | null>(null)
const messageType = ref<'success' | 'error'>('success')

async function submit() {
  creating.value = true
  message.value = null
  try {
    const res = await $fetch(`${api}/admin/courses`, { method: 'POST', body: form })
    message.value = `Курс создан!`
    messageType.value = 'success'
    form.title = ''
    form.titleKk = ''
    form.titleEn = ''
    form.description = ''
    form.descriptionKk = ''
    form.descriptionEn = ''
    form.link = ''
    form.published = true
  } catch (e: any) {
    message.value = e?.data?.message || 'Ошибка создания курса'
    messageType.value = 'error'
  } finally {
    creating.value = false
  }
}

const titleLength = computed(() => form.title.length)
const descriptionLength = computed(() => form.description.length)
</script>

<template>
  <div class="admin-container">
    <div class="admin-header">
      <h1 class="admin-title">Админка: Курсы</h1>
      <p class="admin-subtitle">Создание нового курса</p>
    </div>

    <form class="admin-form" @submit.prevent="submit">
      <!-- Название -->
      <div class="form-group">
        <label class="form-label">
          Название (Русский) *
          <span class="char-count">{{ titleLength }}/200</span>
        </label>
        <input
          v-model="form.title"
          type="text"
          class="form-input"
          placeholder="Введите название курса"
          required
          maxlength="200"
        />
      </div>

      <!-- Название Казахский -->
      <div class="form-group">
        <label class="form-label">
          Название (Қазақша)
          <span class="char-count">{{ form.titleKk.length }}/200</span>
        </label>
        <input
          v-model="form.titleKk"
          type="text"
          class="form-input"
          placeholder="Атауы қазақша (если нет, будет использован русский)"
          maxlength="200"
        />
      </div>

      <!-- Название Английский -->
      <div class="form-group">
        <label class="form-label">
          Название (English)
          <span class="char-count">{{ form.titleEn.length }}/200</span>
        </label>
        <input
          v-model="form.titleEn"
          type="text"
          class="form-input"
          placeholder="Title in English (if not provided, Russian will be used)"
          maxlength="200"
        />
      </div>

      <!-- Описание -->
      <div class="form-group">
        <label class="form-label">
          Описание (Русский) *
          <span class="char-count">{{ descriptionLength }}/500</span>
        </label>
        <textarea
          v-model="form.description"
          class="form-textarea"
          rows="4"
          maxlength="500"
          placeholder="Описание курса (до 500 символов)"
          required
        />
      </div>

      <!-- Описание Казахский -->
      <div class="form-group">
        <label class="form-label">
          Описание (Қазақша)
          <span class="char-count">{{ form.descriptionKk.length }}/500</span>
        </label>
        <textarea
          v-model="form.descriptionKk"
          class="form-textarea"
          rows="4"
          maxlength="500"
          placeholder="Сипаттама қазақша (если нет, будет использован русский)"
        />
      </div>

      <!-- Описание Английский -->
      <div class="form-group">
        <label class="form-label">
          Описание (English)
          <span class="char-count">{{ form.descriptionEn.length }}/500</span>
        </label>
        <textarea
          v-model="form.descriptionEn"
          class="form-textarea"
          rows="4"
          maxlength="500"
          placeholder="Description in English (if not provided, Russian will be used)"
        />
      </div>

      <!-- Ссылка -->
      <div class="form-group">
        <label class="form-label">
          Ссылка на курс
        </label>
        <input
          v-model="form.link"
          type="url"
          class="form-input"
          placeholder="https://example.com/course"
          required
        />
        <p class="form-hint">Ссылка должна вести на страницу курса</p>
      </div>

      <!-- Опубликовано -->
      <div class="form-group">
        <label class="checkbox-label">
          <input
            type="checkbox"
            v-model="form.published"
            class="checkbox-input"
          />
          <span class="checkbox-custom"></span>
          <span class="checkbox-text">Опубликовано</span>
        </label>
      </div>

      <!-- Сообщение -->
      <div v-if="message" :class="['message', `message-${messageType}`]">
        <span class="message-icon">{{ messageType === 'success' ? '✓' : '✕' }}</span>
        <span>{{ message }}</span>
      </div>

      <!-- Кнопка создания -->
      <div class="form-actions">
        <button
          type="submit"
          class="submit-btn"
          :disabled="creating"
          :class="{ 'btn-loading': creating }"
        >
          <span v-if="!creating">Создать</span>
          <span v-else class="loading-spinner">Создание...</span>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.admin-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #151d4a 0%, #2d3c78 100%);
  padding: 40px 20px;
  color: #fff;
}

.admin-header {
  max-width: 900px;
  margin: 0 auto 40px;
  text-align: center;
}

.admin-title {
  font-size: 42px;
  font-weight: 700;
  margin: 0 0 10px 0;
  background: linear-gradient(90deg, #02ffc0, #00bfff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.admin-subtitle {
  font-size: 16px;
  opacity: 0.7;
  margin: 0;
}

.admin-form {
  max-width: 900px;
  margin: 0 auto;
  background: rgba(18, 24, 58, 0.55);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-group {
  margin-bottom: 30px;
}

.form-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #e0e0e0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.char-count {
  font-size: 12px;
  font-weight: 400;
  opacity: 0.6;
  text-transform: none;
  letter-spacing: 0;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 14px 18px;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 15px;
  font-family: inherit;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #00bfff;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 4px rgba(0, 191, 255, 0.1);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
  line-height: 1.6;
}

.form-hint {
  margin-top: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  gap: 12px;
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  width: 24px;
  height: 24px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  position: relative;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.checkbox-input:checked + .checkbox-custom {
  background: linear-gradient(90deg, #02ffc0, #00bfff);
  border-color: #00bfff;
}

.checkbox-input:checked + .checkbox-custom::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000;
  font-weight: bold;
  font-size: 14px;
}

.checkbox-text {
  font-size: 15px;
  color: #e0e0e0;
}

.message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  font-size: 14px;
  animation: slideIn 0.3s ease;
}

.message-success {
  background: rgba(40, 167, 69, 0.2);
  border: 1px solid rgba(40, 167, 69, 0.4);
  color: #4ade80;
}

.message-error {
  background: rgba(220, 53, 69, 0.2);
  border: 1px solid rgba(220, 53, 69, 0.4);
  color: #f87171;
}

.message-icon {
  font-size: 18px;
  font-weight: bold;
}

.form-actions {
  margin-top: 30px;
}

.submit-btn {
  width: 100%;
  padding: 16px 32px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(90deg, #02ffc0, #00bfff);
  color: #000;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 191, 255, 0.4);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-loading {
  pointer-events: none;
}

.loading-spinner {
  display: inline-block;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@media (max-width: 768px) {
  .admin-container {
    padding: 20px 15px;
  }

  .admin-title {
    font-size: 32px;
  }

  .admin-form {
    padding: 25px 20px;
  }

  .form-group {
    margin-bottom: 25px;
  }
}
</style>

