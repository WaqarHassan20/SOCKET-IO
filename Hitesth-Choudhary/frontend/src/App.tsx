import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000")

function App() {

  const username = nanoid(5)
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ message: string, username: string }[]>([]);

  const sendChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    socket.emit("chat", { message,username })
    setMessage("")
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      console.log(payload);
      setChat(prevChat => [...prevChat, payload])
    })

    return () => {
      socket.off("chat");
      socket.disconnect();
    };
  }, [])

  return (
    
  <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-neutral-900 to-black flex flex-col">
      {/* Slim Header */}
      <header className="sticky top-0 z-20 w-full bg-gradient-to-r from-zinc-950 via-neutral-900 to-black/90 backdrop-blur-md shadow border-b-2 border-zinc-800 flex items-center justify-between px-8 h-16">
        <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-neutral-300 to-zinc-400 tracking-widest uppercase">Chatty App</span>
        <nav className="flex gap-6">
          <a href="#" className="text-zinc-300 font-semibold hover:text-white transition">Home</a>
          <a href="#" className="text-zinc-300 font-semibold hover:text-white transition">Features</a>
          <a href="#" className="text-zinc-300 font-semibold hover:text-white transition">About</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="backdrop-blur-lg bg-gradient-to-br from-zinc-900/80 via-neutral-900/80 to-black/80 shadow-xl rounded-xl p-8 max-w-md w-full flex flex-col items-center border border-zinc-700">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-neutral-300 to-zinc-400 mb-4 drop-shadow">Chat Room</h2>
         <div className="space-y-3">
        
          {chat.map((payload, index) => (
            <div
              key={index}
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg p-1 shadow hover:shadow-lg transition duration-200 flex gap-2"
            >
              <p className="text-blue-400 font-semibold">👤 {payload.username}</p>
              <p className="text-gray-200 mt-1 break-words">💬 {payload.message}</p>
            </div>
          ))}
          </div>

          <form onSubmit={sendChat} className="flex w-full mt-4 gap-2">
            <input
              type="text"
              name="chat"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 bg-black/70 text-zinc-100 placeholder-zinc-400 shadow-inner backdrop-blur"
            />
            <button
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-zinc-700 via-neutral-700 to-black text-white font-semibold shadow hover:scale-105 transition-transform hover:from-zinc-500 hover:to-black backdrop-blur cursor-pointer hover:border-1 hover:border-zinc-300"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </main>

      {/* Slim Footer */}
      <footer className="sticky bottom-0 z-20 w-full bg-gradient-to-r from-zinc-950 via-neutral-900 to-black/90 backdrop-blur-md shadow border-t-2 border-zinc-800 flex items-center justify-between px-8 h-14 mt-6">
        <div className="flex gap-6">
          <a href="#" className="text-zinc-300 hover:text-white">Docs</a>
          <a href="#" className="text-zinc-300 hover:text-white">API</a>
          <a href="#" className="text-zinc-300 hover:text-white">Support</a>
        </div>
        <div className="text-zinc-400 text-sm font-semibold text-center">
          &copy; 2025 Chatty App. Made with <span className="text-zinc-200">♥</span> by <a href="https://vitejs.dev" className="underline hover:text-white">Vite</a> &amp; <a href="https://react.dev" className="underline hover:text-white">React</a>
        </div>
      </footer>
    </div>
  );
}

export default App;