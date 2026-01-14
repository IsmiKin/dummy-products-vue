<script setup lang="ts" generic="TData, TValue">
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useVueTable, getCoreRowModel, getPaginationRowModel, type ColumnDef } from "@tanstack/vue-table";

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

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}>()

const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
})

const { goToPage } = useProducts({ autoload: false });

const loadPage = (page: number) => {
  table.setPageIndex(page);
  goToPage(page);
}


</script>

<template>
  <div>
    <!-- TODO: Move outside ? -->
    <div class="flex items-center justify-between py-4">
      <Input placeholder="Filter anything...(client name, email, status)" value="" class="max-w-sm" />
      <Select value="" />
    </div>
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
          <template v-if="table.getCoreRowModel().rows?.length">
            <TableRow v-for="row in table.getCoreRowModel().rows" :key="row.id">
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
    <TablePagination :table="table" @goToPage="loadPage" />
  </div>
</template>
