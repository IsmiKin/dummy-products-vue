<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form, Field as VeeField } from 'vee-validate'
import { h, computed } from 'vue'

import { toast } from 'vue-sonner'
import * as z from 'zod'

import type { ProductsCategories } from '@/products/interfaces/products-categories-response'
import type { Product, ProductFormData } from '@/products/interfaces'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ProductModalProps {
  isOpen: boolean;
  categories: ProductsCategories;
  product?: Product;
}

const emit = defineEmits<{
  'update:is-open': [value: boolean]
  'create-product': [product: ProductFormData]
  'update-product': [product: ProductFormData & { id: number }]
}>()

const props = defineProps<ProductModalProps>();

const productSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(50),
  description: z.string().max(200).optional().or(z.literal('')),
  category: z.string().min(2, 'Category is required').max(50),
  brand: z.string().max(50).optional().or(z.literal('')),
  price: z.number().refine(
    val => Number.isFinite(val) && /^\d+\.\d{2}$/.test(val.toFixed(2)),
    { message: "Must have exactly 2 decimal places" }
  ),
  stock: z.number().min(0).optional().or(z.nan()),
  discount: z.number().min(0).max(100).optional().or(z.nan()),
})

const formSchema = toTypedSchema(productSchema)

const initialValues = computed(() => ({
  title: props.product?.title || '',
  description: props.product?.description || '',
  category: props.product?.category || '',
  brand: props.product?.brand || '',
  price: props.product?.price || 0,
  stock: props.product?.stock || 0,
  discount: props.product?.discountPercentage || 0,
}))

const isEditMode = computed(() => !!props.product?.id)

const onSubmit = (values: Record<string, unknown>) => {
  const validatedValues = values as z.infer<typeof productSchema>

  if (isEditMode.value && props.product?.id) {
    // Ensure ID is a number, not a string
    const productId = Number(props.product.id);
    emit('update-product', { ...validatedValues, id: productId })
    toast('Product updated successfully', {
      description: h('pre', { class: 'mt-2 w-[320px] rounded-md bg-neutral-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(validatedValues, null, 2))),
    })
  } else {
    emit('create-product', validatedValues)
    toast('You had created a new Product', {
      description: h('pre', { class: 'mt-2 w-[320px] rounded-md bg-neutral-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(validatedValues, null, 2))),
    })
  }

  emit('update:is-open', false)
}
</script>

<template>
  <Dialog :open="isOpen" @update:open="emit('update:is-open', $event)">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ isEditMode ? 'Edit Product' : 'Create a new Product' }}</DialogTitle>
        <DialogDescription>
          {{ isEditMode ? 'Update the product information.' : 'Add a new product to your inventory.' }}
        </DialogDescription>
      </DialogHeader>

      <Form v-slot="{ handleSubmit }" as="" :key="props.product?.id || 'new'" :validation-schema="formSchema"
        :initial-values="initialValues">
        <form id="dialogForm" class="space-y-6" @submit="handleSubmit($event, onSubmit)">
          <FieldGroup>
            <VeeField v-slot="{ componentField, errors }" name="title">
              <Field :data-invalid="!!errors.length">
                <FieldLabel for="title">
                  Title <span class="text-destructive">*</span>
                </FieldLabel>
                <Input id="title" type="text" placeholder="Enter product title" v-bind="componentField" />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
          </FieldGroup>
          <FieldGroup>
            <VeeField v-slot="{ componentField, errors }" name="description">
              <Field :data-invalid="!!errors.length">
                <FieldLabel for="description">
                  Description
                </FieldLabel>
                <Textarea id="description" type="text" placeholder="Enter product description"
                  v-bind="componentField" />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
          </FieldGroup>
          <div class="flex gap-4">
            <FieldGroup>
              <VeeField v-slot="{ errors, value, handleChange }" name="category">
                <Field :data-invalid="!!errors.length">
                  <FieldLabel for="category">
                    Category <span class="text-destructive">*</span>
                  </FieldLabel>
                  <Select id="category" :model-value="value" @update:model-value="handleChange">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem v-for="category in categories" :key="category.slug" :value="category.slug">
                        {{ category.name }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError v-if="errors.length" :errors="errors" />
                </Field>
              </VeeField>
            </FieldGroup>
            <FieldGroup>
              <VeeField v-slot="{ componentField, errors }" name="brand">
                <Field :data-invalid="!!errors.length">
                  <FieldLabel for="brand">
                    Brand
                  </FieldLabel>
                  <Input id="brand" type="text" placeholder="Enter product brand" v-bind="componentField" />
                  <FieldError v-if="errors.length" :errors="errors" />
                </Field>
              </VeeField>
            </FieldGroup>
          </div>
          <div class="flex gap-4">
            <FieldGroup>
              <VeeField v-slot="{ componentField, errors }" name="price">
                <Field :data-invalid="!!errors.length">
                  <FieldLabel for="price">
                    Price <span class="text-destructive">*</span>
                  </FieldLabel>
                  <Input id="price" type="number" step=".01" placeholder="Enter product price"
                    v-bind="componentField" />
                  <FieldError v-if="errors.length" :errors="errors" />
                </Field>
              </VeeField>
            </FieldGroup>
            <FieldGroup>
              <VeeField v-slot="{ componentField, errors }" name="stock">
                <Field :data-invalid="!!errors.length">
                  <FieldLabel for="stock">
                    Stock
                  </FieldLabel>
                  <Input id="stock" type="number" placeholder="Enter product stock" v-bind="componentField" />
                  <FieldError v-if="errors.length" :errors="errors" />
                </Field>
              </VeeField>
            </FieldGroup>
          </div>
          <div class="flex gap-4">
            <FieldGroup>
              <VeeField v-slot="{ componentField, errors }" name="discount">
                <Field class="w-1/2" :data-invalid="!!errors.length">
                  <FieldLabel for="discount">
                    Discount
                  </FieldLabel>
                  <Input id="discount" step=".01" type="number" placeholder="Enter product discount"
                    v-bind="componentField" />
                  <FieldError v-if="errors.length" :errors="errors" />
                </Field>
              </VeeField>
            </FieldGroup>
          </div>
        </form>
      </Form>

      <DialogFooter>
        <Button type="submit" form="dialogForm">
          {{ isEditMode ? 'Update Product' : 'Create Product' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
