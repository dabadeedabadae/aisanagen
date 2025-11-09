<template>
  <div>
    <NavBar />
    <main class="container">
      <NuxtPage />
    </main>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: 'AI Sana Kozybayev University',
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap'
    }
  ]
})
</script>
<style>

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: 'Work Sans', sans-serif;
  font-weight: 400; /* Regular */
}
.container {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 0px;
}

</style>