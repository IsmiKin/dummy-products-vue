<script setup lang="ts">
import { IconDots } from '@tabler/icons-vue';
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

defineProps<{
  product: {
    id: number
  }
}>()

function copy(id: number) {
  navigator.clipboard.writeText(id.toString())
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <IconDots />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(product.id)">
        Copy product ID
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>View product</DropdownMenuItem>
      <DropdownMenuItem>View product details</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
