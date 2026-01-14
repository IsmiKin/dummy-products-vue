<script setup lang="ts" generic="TData">
import { computed } from 'vue';
import { type Table } from '@tanstack/vue-table'
import { IconChevronLeft } from '@tabler/icons-vue';
import { IconChevronRight } from '@tabler/icons-vue';
import { IconChevronsLeft } from '@tabler/icons-vue';
import { IconChevronsRight } from '@tabler/icons-vue';

import { Button } from '@/components/ui/button'

import { APP_CONFIG_SETTINGS } from '@/shared/constants/appConfigSettings';

const productsDefaultLimit = APP_CONFIG_SETTINGS.PRODUCTS_LIST_DEFAULT_LIMIT;

interface TablePagination {
  table: Table<TData>
}
const props = defineProps<TablePagination>()

const firstItemVisibleCardinal = computed(() => {
  const totalCount = props.table.getRowCount();
  return totalCount === 0 ? 0 : (props.table.getState().pagination.pageIndex) * productsDefaultLimit + 1;
})
const lastItemVisibleCardinal = computed(() => {
  const totalCount = props.table.getRowCount();
  const lastItem = (props.table.getState().pagination.pageIndex + 1) * productsDefaultLimit;
  return lastItem > totalCount ? totalCount : lastItem;
});

</script>

<template>
  <div class="flex items-center justify-between px-2">
    <div class="flex-1 text-sm text-muted-foreground">
      Showing {{ firstItemVisibleCardinal }} -
      {{ lastItemVisibleCardinal }} of {{ props.table.getRowCount() }} products
    </div>
    <div class="flex items-center space-x-6 lg:space-x-8">

      <div class="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {{ props.table.getState().pagination.pageIndex + 1 }} of
        {{ props.table.getPageCount() }}
      </div>
      <div class="flex items-center space-x-2">
        <Button variant="outline" class="hidden w-8 h-8 p-0 lg:flex" :disabled="!props.table.getCanPreviousPage()"
          @click="props.table.setPageIndex(0)">
          <span class="sr-only">Go to first page</span>
          <IconChevronsLeft class="w-4 h-4" />
        </Button>
        <Button variant="outline" class="w-8 h-8 p-0" :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()">
          <span class="sr-only">Go to previous page</span>
          <IconChevronLeft class="w-4 h-4" />
        </Button>
        <Button variant="outline" class="w-8 h-8 p-0" :disabled="!table.getCanNextPage()" @click="table.nextPage()">
          <span class="sr-only">Go to next page</span>
          <IconChevronRight class="w-4 h-4" />
        </Button>
        <Button variant="outline" class="hidden w-8 h-8 p-0 lg:flex" :disabled="!table.getCanNextPage()"
          @click="table.setPageIndex(table.getPageCount() - 1)">
          <span class="sr-only">Go to last page</span>
          <IconChevronsRight class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
