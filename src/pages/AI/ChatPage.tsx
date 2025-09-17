import { useState } from "react";
import { Send, MessageSquare } from "lucide-react";

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
}

interface Chat {
  id: number;
  title: string;
  messages: Message[];
}

const ChatPage = () => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      title: "Exam Stress",
      messages: [
        { id: 1, sender: "ai", text: "Hello! I’m your mental health assistant. How are you feeling today?" },
        { id: 2, sender: "user", text: "I feel stressed about exams." },
        { id: 3, sender: "ai", text: "I understand. Exams can be stressful. Would you like some relaxation tips?" },
      ],
    },
    {
      id: 2,
      title: "Sleep Issues",
      messages: [
        { id: 1, sender: "user", text: "I can’t sleep well these days." },
        { id: 2, sender: "ai", text: "Sleep is important for your health. Do you want some sleep hygiene practices?" },
      ],
    },
  ]);

  const [activeChatId, setActiveChatId] = useState(1);
  const [input, setInput] = useState("");

  const activeChat = chats.find((c) => c.id === activeChatId)!;

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: activeChat.messages.length + 1,
      sender: "user",
      text: input.trim(),
    };

    const updatedChats = chats.map((chat) =>
      chat.id === activeChatId
        ? { ...chat, messages: [...chat.messages, newMessage] }
        : chat
    );

    setChats(updatedChats);
    setInput("");

    // Simulated AI reply
    setTimeout(() => {
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    id: chat.messages.length + 2,
                    sender: "ai",
                    text: "Thank you for sharing. I’m here to support you.",
                  },
                ],
              }
            : chat
        )
      );
    }, 800);
  };
  function updateChats() {
    const newChat: Chat = {
      id: chats.length + 1,
      title: "New Chat",
      messages: [],
    };
    setChats([...chats, newChat]);
    setActiveChatId(newChat.id);
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r shadow-lg">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-700">Recent Chats</h2>
        </div>
        <span onClick={updateChats} className="px-4 py-2 border border-gray-300 m-2 rounded-xl text-gray-800 text-start">New chat</span>
        <nav className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={`w-full flex items-center space-x-2 px-4 py-3 text-left hover:bg-gray-100 ${
                chat.id === activeChatId ? "bg-blue-50 border-l-4 border-blue-600" : ""
              }`}
            >
              <MessageSquare className="h-5 w-5 text-gray-500" />
              <span className="truncate">{chat.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Chat Window */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="bg-blue-600 text-white px-6 py-4 shadow">
          <h1 className="text-lg font-semibold">{activeChat.title}</h1>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeChat.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t bg-white p-4 flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
