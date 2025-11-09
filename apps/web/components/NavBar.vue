<template>
  <nav class="nav">
    <div class="brand">
      <img src="/uploads/logo.svg" alt="AI Sana logo" class="logo" />
    </div>
    <div class="links" :class="{ open: menuOpen }">
      <NuxtLink to="/"><img src="./icons/home.svg" alt="Иконка Главная страница" class="icon" />Главная</NuxtLink>
      <NuxtLink to="/#about-program-section"><img src="./icons/question.svg" alt="Иконка О программе" class="icon" />О программе</NuxtLink>
      <NuxtLink to="/#ai-agents-section"><img src="./icons/ai-agents.svg" alt="Иконка AI-агенты" class="icon" />AI-агенты</NuxtLink>
      <NuxtLink to="/news"><img src="./icons/news.svg" alt="Иконка Новости" class="icon" />Новости</NuxtLink>
      <NuxtLink to="/courses"><img src="./icons/courses.svg" alt="Иконка Курсы" class="icon" />Курсы</NuxtLink>
      <NuxtLink to="/#contacts-section"><img src="./icons/contacts.svg" alt="Иконка Контакты" class="icon" />Контакты</NuxtLink>
      <NuxtLink to="/"><img src="./icons/language.svg" alt="Иконка Язык" class="icon" />Язык</NuxtLink>
    </div>
    <div class="burger" @click="menuOpen = !menuOpen">
      <span :class="{ active: menuOpen }"></span>
      <span :class="{ active: menuOpen }"></span>
      <span :class="{ active: menuOpen }"></span>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const menuOpen = ref(false);
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
}
</style>
