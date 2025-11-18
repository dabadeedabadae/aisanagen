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
const uploading = ref(false)
const message = ref<string | null>(null)
const messageType = ref<'success' | 'error'>('success')
const selectedFile = ref<File | null>(null)
const imagePreview = ref<string | null>(null)

async function submit() {
  creating.value = true
  message.value = null
  try {
    const res = await $fetch(`${api}/admin/news`, { method: 'POST', body: form })
    message.value = `Новость создана! Ссылка: /news/${(res as any).slug}`
    messageType.value = 'success'
    form.title = ''
    form.imageUrl = ''
    form.excerpt = ''
    form.content = ''
    form.published = true
    selectedFile.value = null
    imagePreview.value = null
  } catch (e: any) {
    message.value = e?.data?.message || 'Ошибка создания новости'
    messageType.value = 'error'
  } finally {
    creating.value = false
  }
}

const excerptLength = computed(() => form.excerpt.length)
const titleLength = computed(() => form.title.length)

async function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  // Проверка типа файла
  if (!file.type.match(/^image\/(jpg|jpeg|png|gif|webp)$/)) {
    message.value = 'Пожалуйста, выберите изображение (JPG, PNG, GIF, WEBP)'
    messageType.value = 'error'
    return
  }

  // Проверка размера (5MB)
  if (file.size > 5 * 1024 * 1024) {
    message.value = 'Размер файла не должен превышать 5MB'
    messageType.value = 'error'
    return
  }

  selectedFile.value = file
  
  // Превью изображения
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target?.result as string
  }
  reader.readAsDataURL(file)

  // Загрузка файла на сервер
  await uploadFile(file)
}

async function uploadFile(file: File) {
  uploading.value = true
  message.value = null
  
  try {
    const formData = new FormData()
    formData.append('file', file)
    
    const res = await $fetch(`${api}/admin/upload`, {
      method: 'POST',
      body: formData,
    }) as any
    
    if (res.error) {
      throw new Error(res.error)
    }
    
    form.imageUrl = `${api}${res.url}`
    message.value = 'Изображение успешно загружено'
    messageType.value = 'success'
  } catch (e: any) {
    message.value = e?.data?.message || e?.message || 'Ошибка загрузки изображения'
    messageType.value = 'error'
    selectedFile.value = null
    imagePreview.value = null
  } finally {
    uploading.value = false
  }
}

function removeImage() {
  selectedFile.value = null
  imagePreview.value = null
  form.imageUrl = ''
}
</script>

<template>
  <div class="admin-container">
    <div class="admin-header">
      <h1 class="admin-title">Админка: Новости</h1>
      <p class="admin-subtitle">Создание новой новости</p>
    </div>

    <form class="admin-form" @submit.prevent="submit">
      <!-- Заголовок -->
      <div class="form-group">
        <label class="form-label">
          Заголовок
          <span class="char-count">{{ titleLength }}/180</span>
      </label>
        <input
          v-model="form.title"
          type="text"
          class="form-input"
          placeholder="Введите заголовок новости"
          required
          maxlength="180"
        />
      </div>

      <!-- Загрузка изображения -->
      <div class="form-group">
        <label class="form-label">
          Изображение
        </label>
        <div class="file-upload-container">
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            class="file-input"
            @change="handleFileSelect"
            :disabled="uploading"
            id="image-upload"
          />
          <label for="image-upload" class="file-upload-label" :class="{ 'uploading': uploading }">
            <span v-if="!uploading && !imagePreview && !form.imageUrl" class="file-upload-text">
              <span class="upload-icon">📁</span>
              Выберите изображение или перетащите его сюда
            </span>
            <span v-else-if="uploading" class="file-upload-text">
              <span class="upload-icon">⏳</span>
              Загрузка...
            </span>
            <span v-else class="file-upload-text">
              <span class="upload-icon">✓</span>
              Изображение загружено
            </span>
      </label>
        </div>
        <div v-if="imagePreview || form.imageUrl" class="image-preview-container">
          <div class="image-preview">
            <img :src="imagePreview || form.imageUrl" alt="Preview" />
            <button type="button" class="remove-image-btn" @click="removeImage">✕</button>
          </div>
        </div>
        <p class="file-hint">Поддерживаемые форматы: JPG, PNG, GIF, WEBP. Максимальный размер: 5MB</p>
      </div>

      <!-- Краткое описание -->
      <div class="form-group">
        <label class="form-label">
          Краткое описание
          <span class="char-count">{{ excerptLength }}/300</span>
      </label>
        <textarea
          v-model="form.excerpt"
          class="form-textarea"
          rows="3"
          maxlength="300"
          placeholder="Краткое описание новости (до 300 символов)"
        />
      </div>

      <!-- Полный текст -->
      <div class="form-group">
        <label class="form-label">
          Полный текст
      </label>
        <textarea
          v-model="form.content"
          class="form-textarea form-textarea-large"
          rows="12"
          required
          placeholder="Полный текст новости"
        />
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

.form-textarea-large {
  min-height: 200px;
}

.file-upload-container {
  position: relative;
  margin-bottom: 15px;
}

.file-input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  overflow: hidden;
}

.file-upload-label {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 120px;
}

.file-upload-label:hover:not(.uploading) {
  border-color: #00bfff;
  background: rgba(0, 191, 255, 0.1);
}

.file-upload-label.uploading {
  cursor: not-allowed;
  opacity: 0.7;
}

.file-upload-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  text-align: center;
}

.upload-icon {
  font-size: 32px;
  opacity: 0.8;
}

.image-preview-container {
  margin-top: 15px;
}

.image-preview {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  max-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-preview img {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  display: block;
}

.remove-image-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(220, 53, 69, 0.9);
  color: white;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.remove-image-btn:hover {
  background: rgba(220, 53, 69, 1);
  transform: scale(1.1);
}

.file-hint {
  margin-top: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
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
