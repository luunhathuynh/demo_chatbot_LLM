<template>
  <div class="bg-gray-100 rounded-lg shadow-md p-4 h-96 flex flex-col">
    <div class="overflow-y-auto flex-grow">
      <div v-for="(msg, index) in messages" :key="index">
        <ChatMessage :content="msg.content" :role="msg.role" :timestamp="msg.timestamp" />
      </div>
    </div>
    <InputBox @send-message="sendMessage" />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import ChatMessage from './ChatMessage.vue';
import InputBox from './InputBox.vue';
import axios from 'axios';

const messages = ref([]);

const sendMessage = async (newMessage: string) => {
  const now = new Date();
  const timestamp = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

  messages.value.push({ content: newMessage, role: 'user', timestamp });

  try {
    const response = await axios.post('http://localhost:5678/webhook/chatbot', { message: newMessage });
    const aiResponse = response.data[0].output;
    const aiTimestamp = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    messages.value.push({ content: aiResponse, role: 'ai', timestamp: aiTimestamp });
  } catch (error) {
    console.error('Lỗi khi gọi API chatbot:', error);
    let aiResponse = 'Đã xảy ra lỗi khi kết nối đến chatbot.';
    if (error.response && error.response.status) {
      aiResponse = `Lỗi ${error.response.status}: Đã xảy ra lỗi khi kết nối đến chatbot.`;
    }
    const aiTimestamp = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    messages.value.push({ content: aiResponse, role: 'ai', timestamp: aiTimestamp });
  }

  // Scroll to bottom
  await nextTick();
  const chatContainer = document.querySelector('.overflow-y-auto');
  if (chatContainer) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
};
</script>
