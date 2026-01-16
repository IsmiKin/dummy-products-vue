<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Button from '@/components/ui/button/Button.vue'
import { IconExternalLink } from '@tabler/icons-vue'

interface TechItem {
  name: string
  description: string
  url: string
  category: 'Core' | 'State & Data' | 'UI & Styling' | 'Forms' | 'Testing & Quality'
}

const techStack: TechItem[] = [
  // Core
  {
    name: 'Vue 3',
    description: 'The Progressive JavaScript Framework used as the core of the application, utilizing the Composition API for flexible logic reuse.',
    url: 'https://vuejs.org/',
    category: 'Core'
  },
  {
    name: 'TypeScript',
    description: 'Provides static typing to the codebase, enhancing developer experience and reducing runtime errors.',
    url: 'https://www.typescriptlang.org/',
    category: 'Core'
  },
  {
    name: 'Vite',
    description: 'Next Generation Frontend Tooling that provides a lightning-fast development server and optimized build process.',
    url: 'https://vitejs.dev/',
    category: 'Core'
  },
  {
    name: 'Vue Router',
    description: ' The official router for Vue.js, handling client-side navigation and route protection.',
    url: 'https://router.vuejs.org/',
    category: 'Core'
  },

  // State & Data
  {
    name: 'Pinia',
    description: 'The intuitive, type-safe store for Vue.js, used for managing global application state.',
    url: 'https://pinia.vuejs.org/',
    category: 'State & Data'
  },
  {
    name: 'TanStack Query',
    description: 'Handles server state management, caching, synchronization and updating, making data fetching a breeze.',
    url: 'https://tanstack.com/query/latest',
    category: 'State & Data'
  },
  {
    name: 'Axios',
    description: 'Promise based HTTP client used for making API requests to the backend services.',
    url: 'https://axios-http.com/',
    category: 'State & Data'
  },

  // UI & Styling
  {
    name: 'Tailwind CSS',
    description: 'A utility-first CSS framework that allows for rapid UI development with pre-defined classes.',
    url: 'https://tailwindcss.com/',
    category: 'UI & Styling'
  },
  {
    name: 'TanStack Table',
    description: 'A headless UI library for building powerful and performant data grids and tables.',
    url: 'https://tanstack.com/table/latest',
    category: 'UI & Styling'
  },

  // Forms
  {
    name: 'VeeValidate',
    description: 'Form validation library for Vue.js that handles complex form interactions and validation state.',
    url: 'https://vee-validate.logaretm.com/v4/',
    category: 'Forms'
  },
  {
    name: 'Zod',
    description: 'TypeScript-first schema declaration and validation library, used in conjunction with VeeValidate for strict data integrity.',
    url: 'https://zod.dev/',
    category: 'Forms'
  },

  // Testing & Quality
  {
    name: 'Playwright',
    description: 'Enables reliable end-to-end testing for modern web apps, ensuring critical user flows work as expected.',
    url: 'https://playwright.dev/',
    category: 'Testing & Quality'
  },
  {
    name: 'ESLint',
    description: 'Statically analyzes the code to quickly find problems and ensure code quality and consistency.',
    url: 'https://eslint.org/',
    category: 'Testing & Quality'
  },
  {
    name: 'Prettier',
    description: 'An opinionated code formatter that enforces a consistent style across the entire codebase.',
    url: 'https://prettier.io/',
    category: 'Testing & Quality'
  },
  {
    name: 'Husky',
    description: 'Modern native Git hooks made easy, used to enforce quality checks (linting, tests) before commits.',
    url: 'https://typicode.github.io/husky/',
    category: 'Testing & Quality'
  },
]
</script>

<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold tracking-tight">Tech Stack</h1>
      <p class="text-muted-foreground text-lg">
        The tools and libraries that power this application.
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card v-for="tech in techStack" :key="tech.name" class="flex flex-col">
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle>{{ tech.name }}</CardTitle>
            <span class="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
              {{ tech.category }}
            </span>
          </div>
        </CardHeader>
        <CardContent class="flex-1 flex flex-col gap-4">
          <CardDescription class="text-sm flex-1">
            {{ tech.description }}
          </CardDescription>
          <Button variant="outline" size="sm" as-child class="w-full mt-auto">
            <a :href="tech.url" target="_blank" rel="noopener noreferrer">
              Documentation
              <IconExternalLink class="w-4 h-4 ml-2" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
