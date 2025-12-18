import { useState, useEffect, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faComments, faPaperPlane, faDollar, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { faHouse, faSquare } from "@fortawesome/free-regular-svg-icons";
import Rumah from "../assets/rumah.jpg";
import { router, usePage } from '@inertiajs/react';
import ChatLayout from '@/component/ChatLayout'

interface Message {
  id: number;
  from: "me" | "bot";
  text: string;
  time?: string;
  type?: "options";
  options?: string[];
}

function Chat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            from: "bot",
            type: "options",
            text: "Halo, selamat datang di HomeLinkID. Silahkan pilih opsi yang Anda inginkan :",
            options: [
                "Bertanya referensi rumah?",
                "Bertanya mengenai harga yang pas?",
                "Chat dengan penjual"
            ],
        }
    ])
     const [input, setInput] = useState("");
     const [loading, setLoading] = useState(false)
    const sendMessage = async (customText?: string) => {
         const messageText = customText ?? input;
        if (!messageText.trim()) return;

        const userMessage : Message = {
            id: Date.now(),
            from: "me",
            text: messageText,
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);
        try{
            const token = document.querySelector('meta[name="csrf-token"]') ?.getAttribute("content");

            const res = await fetch("/chatbot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token ?? "",
                    "X-Requested-With": "XMLHttpRequest",
                },
                body: JSON.stringify({ message: messageText }),
            });
            const data = await res.json();
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    from: "bot",
                    text: data.reply,
                },
            ]);
        } catch(error) {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    from: "bot",
                    text: "Maaf, terjadi kesalahan. Silakan coba lagi.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };
    const handleOptionClick = (option: string) => {
  sendMessage(option);
};


    
  return (
    <ChatLayout>
      <div className="min-h-screen w-full flex flex-col bg-white pt-[130px] md:px-20 px-5 pb-10 " >
        <div className="flex items-center gap-4 py-4 border-b border-gray-400 ">
            <h2 className="text-2xl font-bold">HOMELINKID</h2>
        </div>
        <div className="flex-1 overflow-y-auto space-y-4">
  {messages.map((msg) => (
    <div
      key={msg.id}
      className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
    >
      <div className="bg-white border rounded-xl px-4 py-2 max-w-[60%] mt-10">
        <p>{msg.text}</p>

        {/* OPTIONS BUTTON */}
        {msg.type === "options" && msg.options && (
          <div className="mt-3 space-y-2">
            {msg.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOptionClick(opt)}
                className="w-full text-left border rounded-lg px-3 py-2 hover:bg-gray-100"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  ))}
</div>

        <div className="flex items-center p-4  bg-white gap-3">
            <input className="flex-1 border px-4 py-3 rounded-full" placeholder="Tulis Pesan..." value={input} onChange={(e) => setInput(e.target.value)}/>
            <button className="text-xl">
                <FontAwesomeIcon icon={faPaperclip} />
            </button>
            <button className="text-xl text-[#333] cursor-pointer" onClick={() => sendMessage(input)}>
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </div>
      </div>
    </ChatLayout>
  );
}

export default Chat;
