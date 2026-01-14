<script setup lang="ts">
import { computed } from 'vue';
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const props = defineProps<{
  searchValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:search-value', value: string): void;
}>();

const model = computed({
  get: () => props.searchValue,
  set: (value) => emit('update:search-value', value),
});
</script>

<template>
  <div class="flex items-center justify-between py-4">
    <Input v-model="model" placeholder="Filter anything...(product name, description, price, etc.)" class="max-w-sm" />
    <Select value="" />
  </div>
</template>
