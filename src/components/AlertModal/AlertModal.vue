<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { IconAlertCircle } from '@tabler/icons-vue'

defineProps<{
  open: boolean,
  customMessage: string,
  typeAction: 'destructive' | 'default',
  submitFn: () => void,
}>()
defineEmits<{
  (e: 'update:open', value: boolean): void
}>()
</script>

<template>
  <AlertDialog :open="open">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle class="flex items-center gap-2">
          <IconAlertCircle />
          Are you absolutely sure?
        </AlertDialogTitle>
        <AlertDialogDescription>
          <p class="my-6">This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.</p>

          <Alert :variant="typeAction">
            <IconAlertCircle />
            <AlertTitle>Destructive action warning.</AlertTitle>
            <AlertDescription>
              <p>{{ customMessage }}</p>
            </AlertDescription>
          </Alert>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter class="mt-4">
        <AlertDialogCancel @click="$emit('update:open', false)">Cancel</AlertDialogCancel>
        <AlertDialogAction @click="submitFn">Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
