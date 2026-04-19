import React, { useState } from 'react'

type CartItem = { id?: string; name?: string; price?: number; quantity?: number }

type Props = {
  cartItems: CartItem[]
  cartTotal: number
  shippingCost: number
  shippingType?: string
  amountNeededForFreeShipping?: number
  onAddProduct?: (product: { name: string; price: number }) => void
}

export default function CheckoutAssistant({ cartItems, cartTotal, shippingCost, shippingType = 'standard', amountNeededForFreeShipping, onAddProduct }: Props) {
  const [messages, setMessages] = useState<Array<{ from: 'user'|'ai'; text: string }>>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function sendToBackend(userMessage: string) {
    setLoading(true)
    setMessages(m => [...m, { from: 'user', text: userMessage }])

    const payload = {
      cart_total: cartTotal,
      items: cartItems,
      shipping_cost: shippingCost,
      shipping_type: shippingType,
      user_message: userMessage,
      event: 'user_enquiry',
      idle_time: 0,
      user_typing: false,
      search_history: [],
      amount_needed_for_free_shipping: typeof amountNeededForFreeShipping === 'number' ? amountNeededForFreeShipping : undefined
    }

    try {
      const resp = await fetch('/api/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const json = await resp.json()

      if (!resp.ok) {
        const err = (json && json.response) || 'AI failed'
        setMessages(m => [...m, { from: 'ai', text: `⚠️ ${err}` }])
        return
      }

      const aiText = json.response || 'Sorry — no answer.'
      setMessages(m => [...m, { from: 'ai', text: aiText }])

      if (json.suggested_action && json.suggested_action.type === 'add_product' && json.suggested_action.product) {
        const prod = json.suggested_action.product
        setMessages(m => [...m, { from: 'ai', text: `Suggested: ${prod.name} — ₹${prod.price}` }])
        setSuggested(prod)
      }

    } catch (err) {
      setMessages(m => [...m, { from: 'ai', text: '⚠️ Network or server error' }])
    } finally {
      setLoading(false)
    }
  }

  const [suggested, setSuggested] = useState<{ name: string; price: number } | null>(null)

  function handleSend() {
    const txt = input.trim()
    if (!txt) return
    setInput('')
    sendToBackend(txt)
  }

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, width: 320 }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Store Assistant</div>
      <div style={{ maxHeight: 220, overflow: 'auto', marginBottom: 8 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ margin: '6px 0', textAlign: m.from === 'user' ? 'right' : 'left' }}>
            <div style={{ display: 'inline-block', padding: '8px 10px', background: m.from === 'user' ? '#111827' : '#f3f4f6', color: m.from === 'user' ? 'white' : '#111827', borderRadius: 6 }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {suggested && (
        <div style={{ marginBottom: 8 }}>
          <div style={{ marginBottom: 6 }}>AI suggests adding:</div>
          <button onClick={() => onAddProduct ? onAddProduct(suggested) : null} style={{ padding: '8px 10px', borderRadius: 6 }}>
            Add {suggested.name} — ₹{suggested.price}
          </button>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleSend() }} placeholder="Message assistant..." style={{ flex: 1, padding: 8 }} />
        <button onClick={handleSend} disabled={loading} style={{ padding: '8px 10px' }}>{loading ? '...' : 'Send'}</button>
      </div>
    </div>
  )
}
