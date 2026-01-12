<script setup lang="ts">
import { IconSun, IconMoon } from '@tabler/icons-vue'
import { useColorMode } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

enum Mode {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto',
}

const mode = useColorMode()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        <IconSun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <IconMoon
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="mode = Mode.LIGHT">
        Light
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = Mode.DARK">
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = Mode.AUTO">
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
