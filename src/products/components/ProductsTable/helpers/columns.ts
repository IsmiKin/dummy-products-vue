import { h } from 'vue'
import type { ColumnDef } from "@tanstack/vue-table";

import DropdownAction from '@/products/components/ProductsTable/ActionsDropdown.vue'

import type { Product } from "@/products/interfaces";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({row}) => row.getValue('title')
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({row}) => row.getValue('price')
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({row}) => row.getValue('category')
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: ({row}) => row.getValue('stock')
  },
    {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original

      return h('div', { class: 'relative' }, h(DropdownAction, {
        product
      }))
    },
  },
]
