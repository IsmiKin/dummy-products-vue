<script setup lang="ts">
import { IconEdit, IconTrash } from '@tabler/icons-vue';
import type { Product } from '@/products/interfaces';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';


import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue'

import { kebabCaseToTitleCase } from '@/utils/string';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  isOpen: boolean
  product?: Product
}

const emit = defineEmits(['update:isOpen', 'edit-product']);

defineProps<Props>();

const handleEditProduct = (id: number) => {
  emit('update:isOpen', false);
  emit('edit-product', id);
}

</script>

<template>
  <div>
    <Sheet v-if="product" :open="isOpen" @update:open="emit('update:isOpen', $event)">
      <SheetContent class="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            <h2 class="text-xl font-semibold">Product Details</h2>
          </SheetTitle>
          <SheetDescription>
            <div class="flex items-center justify-between border-b border-zinc-800 p-6">
              <div class="flex gap-4">
                <img :src="product?.thumbnail" :alt="product?.title"
                  class="w-32 h-32 rounded-lg object-cover bg-zinc-800" />
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-balance leading-tight">{{ product?.title }}</h3>
                  <Badge class="mt-4">
                    {{ kebabCaseToTitleCase(product?.category) }}
                  </Badge>
                  <p class="mt-2 text-sm text-muted-foreground">SKU: {{ product?.sku }}</p>
                  <div class="flex flex-col gap-2 mt-2">
                    <div class="flex">
                      <div>
                        <p class="text-xs text-muted-foreground">Rating</p>
                      </div>
                      <svg v-for="i in product.rating.toFixed(1)" :key="i" xmlns="http://www.w3.org/2000/svg" width="14"
                        height="14" viewBox="0 0 24 24" fill="currentColor" class="text-yellow-500">
                        <polygon
                          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                    <span class="text-sm text-zinc-400">{{ product?.rating.toFixed(1) }} ({{ product?.reviews.length }}
                      reviews)</span>
                  </div>
                </div>
                <div class="flex flex-col gap-2">
                  <Button class="justify-start" variant="outline" @click="handleEditProduct(product?.id)">
                    <IconEdit />
                    Edit
                  </Button>
                  <Button class="justify-start" variant="destructive">
                    <IconTrash />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
        <div class="grid flex-1 auto-rows-min gap-6 px-4">
          <div>
            <h4 class="font-bold uppercase tracking-wide mb-2">Description</h4>
            <p class="text-sm leading-relaxed text-pretty">
              {{ product?.description }}
            </p>
          </div>
          <div class="grid grid-cols-4 gap-4">
            <img v-for="image in product?.images" :key="image" :src="image" :alt="product?.title"
              class="w-full h-full object-cover" />
          </div>

          <!-- Product Info Grid -->
          <div class="grid grid-cols-2 gap-4">
            <Card class="text-center">
              <CardHeader>
                <CardTitle>
                  <div class="text-lg font-bold uppercase tracking-wide">Price</div>
                </CardTitle>
                <CardDescription>
                  <div class="text-lg font-medium mt-1">${{ product?.price }}</div>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader class="text-center">
                <CardTitle>
                  <div class="text-lg font-bold uppercase tracking-wide">Stock</div>
                </CardTitle>
                <CardDescription>
                  <div class="text-lg font-medium mt-1">{{ product?.stock }} units</div>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card class="text-center">
              <CardHeader>
                <CardTitle>
                  <div class="text-lg font-bold uppercase tracking-wide">Brand</div>
                </CardTitle>
                <CardDescription>
                  <div class="text-lg font-medium mt-1">{{ product?.brand }}</div>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card class="text-center">
              <CardHeader>
                <CardTitle>
                  <div class="text-lg font-bold uppercase tracking-wide">Discount</div>
                </CardTitle>
                <CardDescription>
                  <div class="text-lg font-medium mt-1">{{ product?.discountPercentage }}%</div>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
        <SheetFooter>
          <p class="text-sm text-muted-foreground">Created at: {{ new
            Date(product?.meta.createdAt).toLocaleString().split(",")[0] }}</p>
          <p class="mt-2 text-sm text-muted-foreground">Updated at: {{ new
            Date(product?.meta.updatedAt).toLocaleString().split(",")[0] }}</p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
</template>
