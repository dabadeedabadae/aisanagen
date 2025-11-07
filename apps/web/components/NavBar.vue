<template>
  <nav class="nav">
    <div class="brand">My Info</div>
    <div class="links">
      <NuxtLink to="/">1</NuxtLink>
      <NuxtLink to="/tab2">2</NuxtLink>
      <NuxtLink to="/tab3">3</NuxtLink>
      <NuxtLink to="/news">Новости</NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
}
.links a {
  margin-left: 12px;
  text-decoration: none;
}
.brand { font-weight: 600; }
</style>
