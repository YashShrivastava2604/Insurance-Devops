import { useState } from "react";
import ChatMessage from "./ChatMessage";
import { MessageCircle, X } from "lucide-react";
import axios from "axios";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const currentInput = input;   // capture first
    setInput("");                 // clear immediately

    const userMsg = { role: "user", text: currentInput };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await axios.post("/ai/chat", {
        query: input,
        session_id: sessionId || undefined,
      });

      const { session_id, response } = res.data;
      setSessionId(session_id);

      setMessages((prev) => [
        ...prev,
        { role: "ai", data: response },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          data: {
            type: "text",
            content: "Something went wrong. Try again.",
          },
        },
      ]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 flex items-center justify-center"
        >
          <MessageCircle />
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[50vw] max-w-[800px] h-[80vh] max-h-[700px] bg-[rgb(var(--card)/0.40)] backdrop-blur-lg rounded-2xl border border-[rgb(var(--border))] shadow-2xl flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[rgb(var(--border))]">
            <span className="font-semibold">AI Insurance Advisor</span>
            <button onClick={() => setOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i}>
                {msg.role === "user" ? (
                  <div className="text-right">
                    <span className="inline-block bg-blue-600 text-white px-3 py-2 rounded-xl text-sm">
                      {msg.text}
                    </span>
                  </div>
                ) : (
                  <ChatMessage data={msg.data} />
                )}
              </div>
            ))}

            {loading && (
              <div className="text-sm text-[rgb(var(--muted-foreground))]">
                Thinking...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-[rgb(var(--border))] flex gap-2">
            <input
              className="flex-1 px-3 py-2 rounded-lg border bg-transparent text-sm"
              placeholder="Ask about insurance..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}