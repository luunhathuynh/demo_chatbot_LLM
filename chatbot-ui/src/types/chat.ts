export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export interface ChatState {
  messages: Message[];
  inputText: string;
}
