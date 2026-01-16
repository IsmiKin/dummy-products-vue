<script setup lang="ts">
import { toast } from 'vue-sonner';
import { Button } from '@/components/ui/button'
import { IconDots, IconCopy, IconEye, IconEdit, IconTrash } from '@tabler/icons-vue';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

defineProps<{
  product: {
    id: number,
  }
  displayProductInfoFn: (id: number) => void,
  handleEditProductFn: (id: number) => void,
}>()

// TODO: Extract to file and add tests
function copy(id: number) {
  navigator.clipboard.writeText(id.toString());
  toast("Product ID copied to clipboard");
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
      <DropdownMenuLabel><strong>Actions</strong></DropdownMenuLabel>
      <DropdownMenuItem @click="copy(product.id)">
        <IconCopy /> Copy product ID
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="displayProductInfoFn(product.id)">
        <IconEye /> View product details
      </DropdownMenuItem>
      <DropdownMenuItem @click="handleEditProductFn(product.id)">
        <IconEdit /> Edit product
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <IconTrash /> Delete product
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
