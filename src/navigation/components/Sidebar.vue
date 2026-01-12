<script setup lang="ts">
import {
  IconDatabase,
  IconBuildingStore,
  IconTools,
  IconInfoCircle,
  IconWorld,
  IconPackage,
  IconBrandGithub,
} from "@tabler/icons-vue"

import NavSection from "./NavSection.vue"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const links = {
  products: {
    title: "Products",
    items: [
      {
        name: "Products  Library",
        url: "#",
        icon: IconDatabase,
      },
    ],
  },
  about: {
    title: "Documentation",
    items: [
      {
        name: "About",
        url: "#",
        icon: IconInfoCircle,
      },
      {
        name: "Tech stack",
        url: "#",
        icon: IconTools,
      },
    ],
  },

}
</script>

<template>
  <!-- TODO: Move magic strings to env vars -->
  <Sidebar collapsible="offcanvas">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton as-child class="data-[slot=sidebar-menu-button]:!p-1.5">
            <a href="#">
              <IconBuildingStore class="!size-5" />
              <span class="text-base font-semibold">Dummy Products</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <NavSection v-for="link in links" :key="link.title" :title="link.title" :items="link.items" />
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton as-child class="data-[slot=sidebar-menu-button]:!p-1.5">
            <a href="#">
              <IconBrandGithub class="!size-5" />
              <a href="https://ismikin.dev" target="_blank"> Github Repo (change link)</a>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuButton as-child class="data-[slot=sidebar-menu-button]:!p-1.5">
          <a href="#">
            <IconPackage class="!size-5" />
            <span class="text-base italic">Version 0.2.0</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton as-child class="data-[slot=sidebar-menu-button]:!p-1.5">
          <a href="#">
            <IconWorld class="!size-5" />
            <a href="https://ismikin.dev" target="_blank"> ismikin.dev</a>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarFooter>
  </Sidebar>
</template>
