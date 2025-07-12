<template>
  <div class="flex flex-col items-center bg-gray-100 p-4">
    <div class="w-full max-w-2xl bg-white rounded-lg shadow-xl flex flex-col overflow-hidden">
      <div class="bg-blue-600 text-white font-bold p-4 text-center">
        AI Chatbot Vue 3
      </div>

      <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 flex flex-col space-y-4">
        <ChatMessage
          v-for="message in messages"
          :key="message.id"
          :message="message"
        />
      </div>

      <div class="p-4 bg-gray-100 flex items-center border-t border-gray-200">
        <input
          v-model="inputText"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="Nhập tin nhắn của bạn..."
          class="flex-1 bg-gray-100 border-none rounded-lg p-2 focus:outline-none focus:ring-0"
        />
        <button @click="sendMessage" class="ml-4 bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-200">
          Gửi
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue';
import ChatMessage from './ChatMessage.vue';
import type { Message } from '../types/chat';

const messages = ref<Message[]>([]);
const inputText = ref('');
const chatContainer = ref<HTMLElement | null>(null);
let messageIdCounter = 0;

const getCurrentTimestamp = () => {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
};

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};

import axios from 'axios';

const sendMessage = async () => {
  if (inputText.value.trim() === '') return;

  // Add user message
  const userMessage: Message = {
    id: messageIdCounter++,
    text: inputText.value,
    sender: 'user',
    timestamp: getCurrentTimestamp()
  };
  messages.value.push(userMessage);
  inputText.value = '';
  scrollToBottom();

  try {
    const response = await axios.post('https://harmless-reptile-cunning.ngrok-free.app/webhook/chatbot', {
      message: userMessage.text
    });

    // Assuming the API returns a bot response in the 'output' field
    const botMessage: Message = {
      id: messageIdCounter++,
      text: response.data[0].output || 'Xin lỗi, tôi chưa hiểu câu hỏi của bạn.',
      sender: 'bot',
      timestamp: getCurrentTimestamp()
    };
    messages.value.push(botMessage);
    scrollToBottom();
  } catch (error) {
    // Handle errors
    const botMessage: Message = {
      id: messageIdCounter++,
      text: 'Đã xảy ra lỗi khi giao tiếp với chatbot.',
      sender: 'bot',
      timestamp: getCurrentTimestamp()
    };
    messages.value.push(botMessage);
    scrollToBottom();
    console.error('Error:', error);
  }
};

// Add initial bot message
onMounted(() => {
  const welcomeMessage: Message = {
    id: messageIdCounter++,
    text: 'Chào bạn! Tôi là AI Chatbot. Bạn cần gì?',
    sender: 'bot',
    timestamp: getCurrentTimestamp()
  };
  messages.value.push(welcomeMessage);
});
</script>
