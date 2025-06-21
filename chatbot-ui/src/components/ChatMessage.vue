<template>
  <div class="flex" :class="{'justify-end': role === 'user'}">
    <div
      class="rounded-lg py-2 px-4 text-white"
      :class="{'bg-blue-300 text-white': role === 'user', 'bg-gray-200 text-black': role === 'ai'}"
    >
      <div v-html="parsedContent"></div>
      <div class="text-xs text-gray-500">{{ timestamp }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { marked } from 'marked';

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    validator: (value: string) => ['user', 'ai'].includes(value),
  },
  timestamp: {
    type: String,
    required: true,
  },
});

const parsedContent = computed(() => {
  return marked(props.content);
});
</script>
