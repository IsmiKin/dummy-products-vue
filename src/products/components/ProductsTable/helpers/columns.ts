import { h } from 'vue'
import type { ColumnDef } from "@tanstack/vue-table";

import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

import DropdownAction from '@/products/components/ProductsTable/ActionsDropdown.vue'
import type { ProductBasic } from "@/products/interfaces";

import { kebabCaseToTitleCase } from '@/utils/string';

interface ComputeTableColumnsProps {
  displayProductInfoFn: (id: number) => void;
  handleEditProductFn: (id: number) => void;
  handleDeleteProductFn: (id: number) => void;
}

/**
 * Generates column definitions for the products table with integrated action handlers.
 * Creates columns for thumbnail, title, price, category, stock, and actions dropdown.
 * 
 * @param props - Configuration object containing action handler functions
 * @param props.displayProductInfoFn - Callback to display product details
 * @param props.handleEditProductFn - Callback to edit a product
 * @param props.handleDeleteProductFn - Callback to delete a product
 * @returns Array of column definitions for TanStack Table
 * 
 * @example
 * const columns = computeTableColumns({
 *   displayProductInfoFn: (id) => showInfo(id),
 *   handleEditProductFn: (id) => editProduct(id),
 *   handleDeleteProductFn: (id) => deleteProduct(id)
 * })
 */
export const computeTableColumns = ({displayProductInfoFn, handleEditProductFn, handleDeleteProductFn}: ComputeTableColumnsProps): ColumnDef<ProductBasic>[] => [
  {
    accessorKey: 'thumbnail',
    header: '',
    cell: ({row}) => {
      const product = row.original

      return h('img', {
        src: product.thumbnail || '/fallback-image.png',
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
      product,
      displayProductInfoFn,
      handleEditProductFn,
      handleDeleteProductFn
    }))
  },
  },
]
