import { useState, useEffect, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faComments, faPaperPlane, faDollar, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { faHouse, faSquare } from "@fortawesome/free-regular-svg-icons";
import Rumah from "../assets/rumah.jpg";
import { router, usePage } from '@inertiajs/react';
import ChatLayout from '@/component/ChatLayout'


function Chat() {
    const [messages, setMessages] = useState([
        {id: 1, from:"me", text: "Halo, saya mau bertanya terkait rumah ini", time: "07:30" },
        {
            id: 2,
            from: "bot",
            type: "options",
            text: "Halo, selamat datang di HomeLinkID. Silahkan pilih opsi yang Anda inginkan :",
            time: "07:30",
        }
    ])
     const [input, setInput] = useState("");
    const sendMessage = () => {
        if (!input.trim()) return;

        setMessages([...messages, { id: Date.now(), from: "me", text: input, time: "07:31" }]);
        setInput("");
    };

    
  return (
    <ChatLayout>
      <div className="min-h-screen w-full flex flex-col bg-white pt-[130px] px-20 pb-10">
        <div className="flex items-center gap-4 py-4 border-b border-gray-400 ">
            <h2 className="text-2xl font-bold">HOMELINKID</h2>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex justify-end my-4">
                <div className="bg-white px-4 py-2 rounded-xl max-w-[60%] border border-gray-400">
                    Halo saya ingin bertanya
                </div>
            </div>
            <div className="flex justify-start">
                <div className="bg-white border rounded-xl shadow-sm p-4 w-[400px]">

                <p className="mb-3 text-gray-700">
                 Halo, selamat datang di HomeLinkID. Silahkan pilih opsi yang Anda inginkan :
                </p>

                <div className="space-y-2">
                    <button className="flex items-center gap-3 w-full px-3 py-3 border rounded-lg hover:bg-gray-100">
                        <FontAwesomeIcon icon={faHome} /> Bertanya referensi rumah?
                    </button>
                    <button className="flex items-center gap-3 w-full px-3 py-3 border rounded-lg hover:bg-gray-100">
                        <FontAwesomeIcon icon={faDollar} /> Bertanya mengenai harga yang pas?
                    </button>
                    <button className="flex items-center gap-3 w-full px-3 py-3 border rounded-lg hover:bg-gray-100">
                        <FontAwesomeIcon icon={faPaperPlane} /> Chat dengan penjual
                    </button>
                </div>
                <p className="text-[12px] text-gray-400 mt-2 text-right">Dikirim oleh Asisten AI Toko</p>
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <div className="bg-white px-4 py-2 rounded-xl max-w-[60%] border border-gray-400">
                    Chat dengan penjual
                </div>
            </div>
        </div>
        <div className="flex items-center p-4  bg-white gap-3">
            <input className="flex-1 border px-4 py-3 rounded-full" placeholder="Tulis Pesan..." value={input} onChange={(e) => setInput(e.target.value)}/>
            <button className="text-xl">
                <FontAwesomeIcon icon={faPaperclip} />
            </button>
            <button className="text-xl text-[#333]" onClick={sendMessage}>
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </div>
      </div>
    </ChatLayout>
  );
}

export default Chat;
