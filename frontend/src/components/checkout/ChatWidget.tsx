import { useState, useRef, useEffect } from "react";

interface ChatMessage {
  id: string;
  role: "ai" | "user";
  text: string;
  action?: {
    type: string;
    product?: {
      name: string;
      price: number;
    };
  } | null;
}

interface ChatWidgetProps {
  messages: ChatMessage[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSendMessage: (message: string) => void;
  onAddProduct: (product: { name: string; price: number }) => void;
  isLoading: boolean;
}

export const ChatWidget = ({
  messages,
  isOpen,
  setIsOpen,
  onSendMessage,
  onAddProduct,
  isLoading
}: ChatWidgetProps) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    onSendMessage(inputValue);
    setInputValue("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[hsl(var(--checkout-text))] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center justify-center text-white hover:bg-black transition-colors z-50"
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <div className="relative">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[hsl(var(--checkout-success))] rounded-full border-2 border-black" />
          </div>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[420px] h-[550px] max-h-[85vh] bg-white rounded-xl shadow-[0_8px_28px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden z-50 border border-[hsl(var(--checkout-divider))] animate-fade-in-up">
          <div className="bg-white border-b border-[hsl(var(--checkout-divider))] p-4 text-[hsl(var(--checkout-text))] flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[hsl(var(--checkout-text))] rounded-full flex items-center justify-center text-white shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[15px] tracking-tight">Pragya Store Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[hsl(var(--checkout-success))] rounded-full animate-pulse" />
                  <p className="text-[12px] text-[hsl(var(--checkout-text-subdued))] font-medium">Always here to help</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[hsl(var(--checkout-text-subdued))] hover:text-[hsl(var(--checkout-text))] p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#FAFAFA] scroll-box">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center px-6">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm border border-[hsl(var(--checkout-divider))] mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(var(--checkout-text-subdued))]">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <h4 className="text-[16px] font-semibold text-[hsl(var(--checkout-text))] mb-1">How can we help?</h4>
                <p className="text-[13px] text-[hsl(var(--checkout-text-subdued))] leading-relaxed">
                  Our assistant is here to help you complete your order and answer any questions.
                </p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-lg px-4 py-3 ${
                  msg.role === "user" 
                    ? "bg-[hsl(var(--checkout-text))] text-white rounded-br-sm shadow-sm" 
                    : "bg-white border border-[hsl(var(--checkout-divider))] text-[hsl(var(--checkout-text))] rounded-bl-sm shadow-sm"
                }`}>
                  <p className="text-[14px] leading-[1.5]">{msg.text}</p>
                  
                  {msg.role === "ai" && msg.action?.type === "add_product" && msg.action.product && (
                    <div className="mt-4 pt-4 border-t border-[hsl(var(--checkout-divider))]">
                      <button
                        onClick={() => onAddProduct(msg.action!.product!)}
                        className="w-full py-2.5 bg-white border border-[hsl(var(--checkout-input-border))] text-[hsl(var(--checkout-text))] text-[13px] font-medium rounded-md hover:border-[hsl(var(--checkout-text))] transition-colors shadow-sm flex items-center justify-center gap-2"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add {msg.action.product.name}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-[hsl(var(--checkout-divider))] rounded-lg rounded-bl-sm shadow-sm px-4 py-3">
                  <div className="flex gap-1.5 items-center h-4 opacity-70">
                    <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-[hsl(var(--checkout-divider))] shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Message assistant..."
                className="checkout-input flex-1"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="w-[46px] h-[46px] bg-[hsl(var(--checkout-text))] rounded-md flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black transition-colors flex-shrink-0 shadow-sm"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
