<script setup lang="ts">
import Sidebar from '@/components/SideBar.vue'
</script>

<template>
  <div>
    <nav>
      <Sidebar />
    </nav>
    <main>
      <slot />
    </main>
  </div>
</template>
