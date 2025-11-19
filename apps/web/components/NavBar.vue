<template>
  <nav class="nav">
    <div class="brand">
      <img src="/uploads/logo.svg" alt="AI Sana logo" class="logo" />
    </div>
    <div class="links" :class="{ open: menuOpen }">
      <NuxtLink :to="localePath('/')"><img src="./icons/home.svg" alt="Иконка Главная страница" class="icon" />{{ $t('nav.home') }}</NuxtLink>
      <NuxtLink :to="localePath('/#about-program-section')"><img src="./icons/question.svg" alt="Иконка О программе" class="icon" />{{ $t('home.about') }}</NuxtLink>
      <NuxtLink :to="localePath('/#ai-agents-section')"><img src="./icons/ai-agents.svg" alt="Иконка AI-агенты" class="icon" />{{ $t('home.agents') }}</NuxtLink>
      <NuxtLink :to="localePath('/news')"><img src="./icons/news.svg" alt="Иконка Новости" class="icon" />{{ $t('nav.news') }}</NuxtLink>
      <NuxtLink :to="localePath('/courses')"><img src="./icons/courses.svg" alt="Иконка Курсы" class="icon" />{{ $t('nav.courses') }}</NuxtLink>
      <NuxtLink :to="localePath('/#contacts-section')"><img src="./icons/contacts.svg" alt="Иконка Контакты" class="icon" />{{ $t('nav.contacts') }}</NuxtLink>
      <div class="language-switcher" ref="switcherRef" @click.stop>
        <button 
          @click="dropdownOpen = !dropdownOpen"
          class="lang-btn-current"
        >
          <img src="./icons/language.svg" alt="Язык" class="lang-icon" />
          <span>{{ currentLocaleName }}</span>
          <span class="dropdown-arrow" :class="{ open: dropdownOpen }">▼</span>
        </button>
        <div v-if="dropdownOpen" class="dropdown-menu">
          <button
            v-for="locale in availableLocales"
            :key="locale.code"
            @click="switchLocale(locale.code)"
            :class="{ active: currentLocale === locale.code }"
            class="dropdown-item"
          >
            {{ locale.name }}
          </button>
        </div>
      </div>
    </div>
    <div class="burger" @click="menuOpen = !menuOpen">
      <span :class="{ active: menuOpen }"></span>
      <span :class="{ active: menuOpen }"></span>
      <span :class="{ active: menuOpen }"></span>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from '#imports';

const { locale, locales, setLocale } = useI18n();
const menuOpen = ref(false);
const dropdownOpen = ref(false);
const switcherRef = ref<HTMLElement | null>(null);

const currentLocale = computed(() => locale.value);
const availableLocales = computed(() => locales.value);

const currentLocaleName = computed(() => {
  const current = availableLocales.value.find(l => l.code === locale.value);
  return current?.name || 'Русский';
});

const localePath = (path: string) => {
  if (locale.value === 'ru') return path;
  return `/${locale.value}${path}`;
};

const switchLocale = (code: string) => {
  setLocale(code);
  dropdownOpen.value = false;
  menuOpen.value = false;
};

// Закрывать dropdown при клике вне его
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (switcherRef.value && !switcherRef.value.contains(target)) {
      dropdownOpen.value = false;
    }
  };
  document.addEventListener('click', handleClickOutside);
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });
});
</script>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 60px;
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  color: white;
  z-index: 10;
  font-family: 'Work Sans', sans-serif;
}

.logo {
  width: auto;
  max-height: 50px;
}

.brand {
  font-weight: 700;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.links {
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  transition: all 0.3s ease;
}

.links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  transition: color 0.3s ease;
}
.links a .icon {
  width: 18px;
  height: 18px;
}
.links a:hover {
  color: #a5a5a5;
}

.language-switcher {
  position: relative;
  margin-left: 10px;
}

.lang-btn-current {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  font-weight: 500;
  white-space: nowrap;
}

.lang-btn-current:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

.lang-icon {
  width: 18px;
  height: 18px;
  opacity: 0.9;
}

.dropdown-arrow {
  font-size: 10px;
  transition: transform 0.3s ease;
  opacity: 0.7;
}

.dropdown-arrow.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  min-width: 150px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: white;
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  font-weight: 500;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.dropdown-item.active {
  background: rgba(2, 255, 192, 0.2);
  color: #02ffc0;
  font-weight: 600;
}
.burger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 28px;
  height: 20px;
  cursor: pointer;
}
.burger span {
  display: block;
  height: 3px;
  width: 100%;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}
.burger span.active:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.burger span.active:nth-child(2) {
  opacity: 0;
}
.burger span.active:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}
@media (max-width: 1024px) {
  .nav { padding: 20px 30px; width: 90%; }
  .links { gap: 15px; }
  .links a { font-size: 0.9rem; }
}

@media (max-width: 900px) {
  .links {
    position: fixed;
    top: 70px;
    right: 0;
    height: calc(100vh - 70px);
    background: rgba(0,0,0,0.9);
    flex-direction: column;
    gap: 30px;
    padding: 30px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }
  .links.open {
    transform: translateX(0);
  }
  .burger { display: flex; }
  
  .language-switcher {
    margin-left: 0;
    width: 100%;
  }
  
  .lang-btn-current {
    width: 100%;
    justify-content: space-between;
  }
  
  .dropdown-menu {
    position: static;
    margin-top: 8px;
    width: 100%;
    box-shadow: none;
  }
}
</style>
