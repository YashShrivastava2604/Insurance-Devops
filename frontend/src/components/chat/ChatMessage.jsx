import PlanCardMini from "./PlanCardMini";

export default function ChatMessage({ data }) {
  if (!data) return null;

  const { type, content } = data;

  return (
    <div className="text-left space-y-2">
      
      {/* TEXT */}
      {type === "text" && (
        <div className="bg-[rgb(var(--card))] px-3 py-2 rounded-xl text-sm">
          {content}
        </div>
      )}

      {/* MULTI (text + cards + image) */}
      {type === "multi" && (
        <>
          {content.text && (
            <div className="bg-[rgb(var(--card))] px-3 py-2 rounded-xl text-sm">
              {content.text}
            </div>
          )}

          {/* {!content.image && (
            <div className="w-full h-[180px] bg-gray-200 animate-pulse rounded-xl" />
          )}
          {content.image && (
            <div className="w-full mt-2">
              <img
                src={content.image}
                alt="AI visual"
                className="w-full h-[180px] object-cover rounded-xl border border-[rgb(var(--border))]"
              />
            </div>
          )} */}

          {content.cards && (
            <div className="space-y-2">
              {content.cards.map((card, i) => (
                <PlanCardMini key={i} plan={card} />
              ))}
            </div>
          )}
        </>
      )}

      {/* CARDS ONLY */}
      {type === "cards" && (
        <div className="space-y-2">
          {content.map((card, i) => (
            <PlanCardMini key={i} plan={card} />
          ))}
        </div>
      )}
    </div>
  );
}