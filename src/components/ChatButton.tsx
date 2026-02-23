import { MessageCircle } from 'lucide-react';

export function ChatButton() {
  return (
    <button className="chat-button" aria-label="Open chat">
      <MessageCircle size={24} />
      <span className="chat-label">Ask</span>
    </button>
  );
}