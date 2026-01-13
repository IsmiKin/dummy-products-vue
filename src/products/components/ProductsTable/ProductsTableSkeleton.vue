<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const headerHeight = 3;
const rowHeight = 5;
const columnsWidths = [80, 400, 100, 100, 100, 50];
const rowsCount = 10;

</script>

<template>
  <div>
    <div class="flex items-center justify-between py-4">
      <Skeleton class="h-8 w-[400px]" />
    </div>
    <div class="border rounded-lg">
      <Table>
        <TableHeader class="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead v-for="(width, index) in columnsWidths" :key="index">
              <Skeleton :class="`h-${headerHeight} w-[${width}px]`" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="index in rowsCount" :key="index">
            <TableCell v-for="(width, index) in columnsWidths" :key="index">
              <Skeleton :class="`h-${rowHeight} w-[${width}px] my-6`" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
