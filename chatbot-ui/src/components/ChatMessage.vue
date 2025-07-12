<template>
  <div :class="[
    'flex items-end',
    message.sender === 'user' ? 'justify-end' : 'justify-start'
  ]">
    <div :class="[
      'max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg',
      message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
    ]">
      <p class="break-words">{{ message.text }}</p>
      <div class="text-xs mt-1 opacity-75 text-right">
        {{ message.timestamp }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '../types/chat';

defineProps<{
  message: Message;
}>();
</script>
