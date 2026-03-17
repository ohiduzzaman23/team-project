"use client";

import { useState, useEffect } from "react";

type Message = {
  user: string;
  bot: string;
};

export default function Chatbot() {
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<Message[]>([]);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  // Load chat from localStorage
  useEffect(() => {
    const savedChat = localStorage.getItem("chatHistory");
    if (savedChat) {
      setChat(JSON.parse(savedChat));
    }
  }, []);

  // Save chat
  const saveChat = (newChat: Message[]) => {
    setChat(newChat);
    localStorage.setItem("chatHistory", JSON.stringify(newChat));
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const msg = message.toLowerCase();

    let botReply = "Thanks for your message! How can I help you today?";

    if (msg.includes("hello") || msg.includes("hi")) {
      botReply = "Hello! Welcome to our online marketplace.";
    } else if (msg.includes("product")) {
      botReply = "You can explore many products on our Products page.";
    } else if (msg.includes("price")) {
      botReply = "Product prices are listed on each product page.";
    } else if (msg.includes("delivery")) {
      botReply = "We provide fast delivery across the country.";
    } else if (msg.includes("payment")) {
      botReply = "You can pay using card, mobile banking, or cash on delivery.";
    }

    const newChat = [...chat, { user: message, bot: botReply }];

    saveChat(newChat);

    setMessage("");
  };

  const clearChat = () => {
    setChat([]);
    localStorage.removeItem("chatHistory");
  };

  // Close chatbot
  const closeChat = () => {
    setIsMinimized(true);
    clearChat();
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Icon when minimized */}
      {isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg text-xl flex items-center justify-center"
        >
          💬
        </button>
      )}

      {/* Chatbox */}
      {!isMinimized && (
        <div className="w-72 bg-white shadow-lg rounded-lg border border-gray-300 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-2 flex justify-between items-center">
            <span>Chatbot</span>

            <div className="flex gap-2">
              {/* Minimize */}
              <button
                onClick={() => setIsMinimized(true)}
                className="font-bold"
              >
                —
              </button>

              {/* Close */}
              <button onClick={closeChat} className="font-bold">
                ✕
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="h-60 overflow-y-auto p-2 text-sm">
            {chat.map((c, i) => (
              <div key={i} className="mb-2">
                <p>
                  <b>You:</b> {c.user}
                </p>
                <p>
                  <b>Bot:</b> {c.bot}
                </p>
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            className="p-2 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <input
              className="border border-gray-300 flex-1 p-1 rounded min-w-0"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type message..."
            />

            <button
              type="submit"
              className="bg-blue-500 text-white px-3 rounded"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
