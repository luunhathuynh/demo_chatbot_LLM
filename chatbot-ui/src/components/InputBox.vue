<template>
  <div class="flex items-center">
    <input
      type="text"
      placeholder="Nhập tin nhắn của bạn..."
      v-model="message"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      @keyup.enter="sendMessage"
    />
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
      @click="sendMessage"
    >
      Gửi
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const message = ref('');

const emit = defineEmits(['send-message']);

const sendMessage = () => {
  if (message.value.trim() !== '') {
    emit('send-message', message.value);
    message.value = '';
  }
};
</script>
