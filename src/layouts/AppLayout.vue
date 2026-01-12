<script setup lang="ts">
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

import Sidebar from '@/components/Sidebar.vue'
import SiteHeader from "@/components/SiteHeader.vue"
</script>

<template>
  <div>
    <SidebarProvider :style="{
      '--sidebar-width': 'calc(var(--spacing) * 72)',
      '--header-height': 'calc(var(--spacing) * 12)',
    }">
      <Sidebar />
      <SidebarInset>
        <main>
          <SiteHeader />
          <div class="flex flex-1 flex-col">
            <div class="@container/main flex flex-1 flex-col gap-2">
              <div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <slot />
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
