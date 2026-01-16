<script setup lang="ts">
import {
  IconBuildingStore,
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

import { SECTION_LINKS } from "../constants/sectionLinks";
import { APP_CONFIG_SETTINGS } from "@/shared/constants/appConfigSettings";
import { ROUTE_NAMES as GENERIC_ROUTES } from "@/router/constants/genericRoutes";

const links = SECTION_LINKS;

</script>

<template>
  <Sidebar collapsible="offcanvas">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton as-child class="data-[slot=sidebar-menu-button]:!p-1.5">
            <RouterLink :to="{ name: GENERIC_ROUTES.HOME }">
              <IconBuildingStore class="!size-5" />
              <span class="text-base font-semibold">{{ APP_CONFIG_SETTINGS.APP_TITLE }}</span>
            </RouterLink>
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
            <a :href="APP_CONFIG_SETTINGS.GITHUB_REPO_URL" target="_blank">
              <IconBrandGithub class="!size-5" />
              <p> Github Repo</p>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton as-child class="data-[slot=sidebar-menu-button]:!p-1.5">
          <a :href="APP_CONFIG_SETTINGS.AUTHOR_URL_LINK" target="_blank">
            <IconWorld class="!size-5" />
            <p>{{ APP_CONFIG_SETTINGS.AUTHOR_URL_URI }}</p>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuButton as-child class="data-[slot=sidebar-menu-button]:!p-1.5">
        <a href="#">
          <IconPackage class="!size-5" />
          <span class="text-base italic">Version {{ APP_CONFIG_SETTINGS.VERSION }}</span>
        </a>
      </SidebarMenuButton>
    </SidebarFooter>
  </Sidebar>
</template>
