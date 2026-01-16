<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { IconDatabase, IconFilter, IconDeviceDesktop } from '@tabler/icons-vue'
</script>

<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold tracking-tight">About</h1>
      <p class="text-muted-foreground text-lg">
        A modern, comprehensive Product Management Dashboard built to demonstrate scalable frontend architecture.
      </p>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Project Overview</CardTitle>
        <CardDescription>
          What is this application?
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <p>
          This application serves as a centralized hub for managing product inventories. It provides a seamless interface for administrators to browse, create, update, and delete products efficiently. Built with performance and user experience in mind, it leverages the latest Vue ecosystem technologies to deliver a snappy, reactive experience.
        </p>
        <p>
          The goal of this project is to showcase best practices in modern web development, including strict typing with TypeScript, component-driven architecture, and robust state management.
        </p>
      </CardContent>
    </Card>

    <div class="grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader>
          <IconDatabase class="h-10 w-10 text-primary mb-2" />
          <CardTitle>CRUD Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Full control over your data. Create new products, edit existing details, and remove obsolete items with immediate visual feedback and optimistic UI updates.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <IconFilter class="h-10 w-10 text-primary mb-2" />
          <CardTitle>Advanced Filtering</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Find what you need instantly. The dashboard features powerful search capabilities and category-based filtering, backed by server-side pagination for optimal performance.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <IconDeviceDesktop class="h-10 w-10 text-primary mb-2" />
          <CardTitle>Responsive Design</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Work from anywhere. The interface is fully responsive, adapting gracefully from large desktop monitors to tablets and mobile devices without sacrificing functionality.</p>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
