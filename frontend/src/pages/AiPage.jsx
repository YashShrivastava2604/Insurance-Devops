import { useState } from "react";

export default function AiPage() {
  const [query, setQuery] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query) return;

    setLoading(true);
    setText("");
    setImage(null);

    try {
      const res = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (data.image) {
        setImage(`data:image/png;base64,${data.image}`);
      }

      setText(data.text);

    } catch (err) {
      console.error(err);
      setText("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        🤖 AI Insurance Assistant
      </h1>

      {/* Input */}
      <div className="flex gap-2 mb-6">
        <input
          className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
          placeholder="Ask anything about insurance..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Ask
        </button>
      </div>

      {/* Loader */}
      {loading && (
        <div className="animate-pulse text-gray-500">
          Generating response...
        </div>
      )}

      {/* IMAGE FIRST */}
      {image && (
        <div className="mb-6">
          <img
            src={image}
            alt="AI Visual"
            className="w-full rounded-xl shadow-lg border border-white/10"
          />
        </div>
      )}

      {/* TEXT BELOW */}
      {text && (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-3">Explanation</h2>
          <p className="whitespace-pre-line leading-relaxed text-[rgb(var(--text))]">
            {text}
          </p>
        </div>
      )}
    </div>
  );
}