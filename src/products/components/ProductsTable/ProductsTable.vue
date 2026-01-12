<script setup lang="ts" generic="TData, TValue">
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { ColumnDef } from "@tanstack/vue-table";
import { useVueTable } from "@tanstack/vue-table";
import { getCoreRowModel } from "@tanstack/vue-table";

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}>()

const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
  getCoreRowModel: getCoreRowModel(),
})

console.log(table)
</script>

<template>
  <div>
    <div class="flex items-center justify-between py-4">
      <Input placeholder="Filter anything...(client name, email, status)" value="" class="max-w-sm" />
      <Select value="" />
    </div>
  </div>
</template>
