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
        className="fixed bottom-6 right-6 w-16 h-16 bg-black rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center text-white hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 z-50 border border-white/10"
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
        <div className="fixed bottom-28 right-6 w-[400px] h-[600px] max-h-[85vh] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden z-50 border border-[hsl(var(--checkout-divider))] animate-fade-in-up">
          <div className="bg-white border-b border-[hsl(var(--checkout-divider))] p-5 text-[hsl(var(--checkout-text))] flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h2z"></path>
                  <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v5"></path>
                  <path d="M3 12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2"></path>
                  <path d="M9 16v3a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-3"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[15px] tracking-tight">Store Assistant</h3>
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

          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#F9F9F9] scroll-box">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center px-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-[hsl(var(--checkout-divider))] mb-4">
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
                <div className={`max-w-[85%] rounded-[18px] px-4 py-3 ${
                  msg.role === "user" 
                    ? "bg-black text-white rounded-br-none shadow-md" 
                    : "bg-white border border-[hsl(var(--checkout-divider))] text-[hsl(var(--checkout-text))] rounded-bl-none shadow-sm"
                }`}>
                  <p className="text-[14px] leading-[1.5]">{msg.text}</p>
                  
                  {msg.role === "ai" && msg.action?.type === "add_product" && msg.action.product && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => onAddProduct(msg.action!.product!)}
                        className="w-full py-2.5 bg-black text-white text-[13px] font-semibold rounded-[8px] hover:bg-gray-800 transition-all shadow-sm flex items-center justify-center gap-2"
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
                <div className="bg-white border border-[hsl(var(--checkout-divider))] rounded-[18px] rounded-bl-none shadow-sm px-4 py-3">
                  <div className="flex gap-1.5 items-center h-4">
                    <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-[hsl(var(--checkout-divider))] shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Message assistant..."
                className="flex-1 h-[48px] bg-[#F5F5F5] border-none rounded-[12px] px-4 text-[14px] text-[hsl(var(--checkout-text))] placeholder:text-[hsl(var(--checkout-text-subdued))] focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="w-[48px] h-[48px] bg-black rounded-[12px] flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-800 transition-all flex-shrink-0 shadow-sm"
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
