import { h } from 'vue'
import type { ColumnDef } from "@tanstack/vue-table";

import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

import DropdownAction from '@/products/components/ProductsTable/ActionsDropdown.vue'
import type { Product } from "@/products/interfaces";

import { kebabCaseToTitleCase } from '@/utils/string';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'thumbnail',
    header: '',
    cell: ({row}) => {
      const product = row.original

      return h('img', {
        src: product.thumbnail,
        alt: product.title,
        class: 'w-16 h-16 object-cover'
      })
    }
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({row}) => row.getValue('title')
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({row}) => {
      // NOTE: We are assuming we are in Europe using euros
      return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
      }).format(row.getValue('price'));
    }
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const category = row.getValue("category") as string
      const categoryStartCase = kebabCaseToTitleCase(category);
      return h(Badge, {}, () => categoryStartCase)
    }
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: ({row}) => {
      const stock: string = row.getValue('stock');
      return h('div', { class: 'flex flex-col gap-2' }, [
        h('span', { class: 'text-sm text-center font-medium' }, stock),
        h(Progress, {
          modelValue: parseInt(stock)
        })
      ])
    }
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
