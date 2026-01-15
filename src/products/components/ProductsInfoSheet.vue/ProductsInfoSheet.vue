<script setup lang="ts">
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import Badge from '@/components/ui/badge/Badge.vue';

import Button from '@/components/ui/button/Button.vue'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
interface Props {
  isOpen: boolean
}

const emit = defineEmits(['update:isOpen']);

const props = defineProps<Props>();

</script>

<template>
  <div>
    <Sheet :open="props.isOpen" @update:open="emit('update:isOpen', $event)">
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <h2 class="text-xl font-semibold">Product Details</h2>
          </SheetTitle>
          <SheetDescription>
            <div class="flex items-center justify-between border-b border-zinc-800 p-6">
              <div class="flex gap-4">
                <img
                  src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="iPhone 15 Pro Max" class="w-32 h-32 rounded-lg object-cover bg-zinc-800" />
                <div class="flex-1">
                  <h3 class="text-2xl font-semibold text-balance leading-tight">iPhone 15 Pro Max</h3>
                  <Badge class="mt-2">
                    smartphones
                  </Badge>
                  <div class="flex flex-col gap-2 mt-3">
                    <div class="flex">
                      <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                        viewBox="0 0 24 24" fill="currentColor" class="text-yellow-500">
                        <polygon
                          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                    <span class="text-sm text-zinc-400">4.69 (140 reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
        <div class="grid flex-1 auto-rows-min gap-6 px-4">
          <!-- Product Info Grid -->
          <div class="grid grid-cols-2 gap-4">
            <Card class="text-center">
              <CardHeader>
                <CardTitle>
                  <div class="text-lg font-bold uppercase tracking-wide">Price</div>
                </CardTitle>
                <CardDescription>
                  <div class="text-lg font-medium mt-1">$1,499.00</div>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader class="text-center">
                <CardTitle>
                  <div class="text-lg font-bold uppercase tracking-wide">Stock</div>
                </CardTitle>
                <CardDescription>
                  <div class="text-lg font-medium mt-1">94 units</div>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card class="text-center">
              <CardHeader>
                <CardTitle>
                  <div class="text-lg font-bold uppercase tracking-wide">Brand</div>
                </CardTitle>
                <CardDescription>
                  <div class="text-lg font-medium mt-1">Apple</div>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card class="text-center">
              <CardHeader>
                <CardTitle>
                  <div class="text-lg font-bold uppercase tracking-wide">Discount</div>
                </CardTitle>
                <CardDescription>
                  <div class="text-lg font-medium mt-1">8.5%</div>
                </CardDescription>
              </CardHeader>
            </Card>
            <div c>
              <h4 class="text-sm font-medium text-zinc-400 uppercase tracking-wide">Description</h4>
              <p class="text-sm text-zinc-300 leading-relaxed text-pretty">
                The iPhone 15 Pro Max features a titanium design with a textured matte glass back.
                It's powered by the A17 Pro chip for incredible performance and efficiency.
                The advanced camera system includes a 48MP Main camera, 12MP Ultra Wide, and 5x Telephoto.
                Experience the Dynamic Island, always-on display, and all-day battery life.
              </p>
            </div>
          </div>
        </div>
        <SheetFooter class="flex justify-end gap-2">
          <SheetClose as-child>
            <Button variant="outline" @click="emit('update:isOpen', false)">
              Close
            </Button>
          </SheetClose>
          <Button type="submit" @click="emit('update:isOpen', false)">
            Edit
          </Button>
          <SheetClose as-child>
            <Button variant="outline">
              Delete
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
</template>
