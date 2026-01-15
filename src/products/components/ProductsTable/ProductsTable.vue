<script setup lang="ts" generic="TData, TValue">
import { useVueTable, getCoreRowModel, type ColumnDef } from "@tanstack/vue-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FlexRender } from "@tanstack/vue-table";

import { useProducts } from '@/products/composables/useProducts';

import TablePagination from '@/components/TablePagination/TablePagination.vue';

import { APP_CONFIG_SETTINGS } from '@/shared/constants/appConfigSettings';

const productsDefaultLimit = APP_CONFIG_SETTINGS.PRODUCTS_LIST_DEFAULT_LIMIT;

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}>()

const { goToPage, total, currentPage } = useProducts({ autoload: false });

const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
  getCoreRowModel: getCoreRowModel(),
  manualPagination: true,
  get rowCount() { return total.value },
  state: {
    get pagination() {
      return {
        pageIndex: currentPage.value - 1,
        pageSize: productsDefaultLimit,
      }
    },
  },
  onPaginationChange: (updaterOrValue) => {
    const paginationState = {
      pageIndex: currentPage.value - 1,
      pageSize: productsDefaultLimit,
    }
    const next = typeof updaterOrValue === 'function'
      ? updaterOrValue(paginationState)
      : updaterOrValue

    if (next.pageIndex !== paginationState.pageIndex) {
      goToPage(next.pageIndex + 1);
    }
  },
})
</script>

<template>
  <div>
    <div class="overflow-hidden rounded-lg border mb-4">
      <Table>
        <TableHeader class="bg-muted sticky top-0 z-10">
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                :props="header.getContext()" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
    <TablePagination :table="table" />
  </div>
</template>
