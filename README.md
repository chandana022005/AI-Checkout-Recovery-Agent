# Pragya: Real-Time Decision Engine for Checkout Recovery

> "Our system combines behavioral signals, cart intelligence, and AI reasoning to intervene only when necessary and maximize conversion."

**Team Pragya | KASPARRO Agentic Commerce Hackathon**  
*Chandana S & Hitendra S | CMR Institute of Technology, Bangalore*

---

## 🌟 The Problem
Abandoned carts are the biggest challenge in e-commerce. Conventional recovery methods (emails/SMS) are highly reactive and often completely ignored. Pragya is a proactive, minimal-intervention agent that detects friction at the exact moment of checkout and makes real-time, context-aware decisions to save the sale.

This is **NOT** a standard chatbot. It is an **AI-powered checkout conversion engine** with contextual reasoning.

## 🧠 Diagnostic Thinking Engine (Backend Logic)
Pragya uses a specialized **Decision Matrix** injected directly into Google Gemini 2.5 Flash to diagnose friction before ever offering solutions. The AI is fed real-time contextual data:
- Cart Total & Threshold Deltas (`amount_needed` for free shipping)
- Current Cart Items
- User Search History
- Multi-turn Chat History (Continuity)

### 🔄 Multi-Scenario Intervention
Pragya handles the 4 most critical checkout bottlenecks with sophisticated reasoning:

| Intent | AI Strategy | Real-Time Decision Logic |
| :--- | :--- | :--- |
| **Shipping Friction** | `suggest_addon` | Dynamically calculates the gap to free shipping. Suggests highly relevant add-ons (e.g., Coasters for Mugs) ONLY if the user is close to the threshold (≤ ₹300). |
| **Price Hesitation** | `explain_value` | Validates user concerns by explaining the premium quality and long-term value, adopting a confident, high-end brand tone. |
| **Delivery Logic** | `clarify_info` | Differentiates between Express and Standard delivery policies based on the user's active checkout selection. |
| **Trust & Safety** | `reassure_user` | Confirms security protocols and highlights the 7-day return policy without defaulting to it unnecessarily. |
| **Idle User** | `no_intervention` | Detects idle behavior. If the user doesn't explicitly need help, the AI returns a `no_intervention` strategy to remain invisible and non-pushy. |

## 🏗️ Architecture & UX Design

### The Backend Brain
- **Node.js / Express**: High-performance orchestration layer.
- **Strict JSON Enforcement**: The prompt mandates a strict JSON schema. The backend includes an advanced salvage parser to rescue truncated responses (e.g., due to MAX_TOKENS limits), ensuring the server never crashes.
- **Explainable AI**: The output schema includes a `confidence` score (0-1) and a `reasoning` field, allowing evaluators to see exactly *why* the AI chose its intervention strategy.

### The Shopify-Premium Frontend
- **React / Tailwind CSS**: High-Fidelity UX matching modern, premium e-commerce standards.
- **Glassmorphism & Minimalism**: The chat UI utilizes clean borders, subtle shadows, and native input styling that perfectly mirrors the native checkout form, completely eliminating the "third-party widget" feel.
- **Seamless Add-ons**: Suggested products appear directly in the chat with a 1-click "Add" button, instantly updating the cart state and recalculating shipping costs.

---

## 🚀 Getting Started

### 1. Installation
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configuration
Create a `.env` file in the `backend` directory:
```env
GEMINI_API_KEY=your_key_here
PORT=3001
```

### 3. Running
**Backend**: `cd backend && node server.js`  
**Frontend**: `cd frontend && npm run dev`

---
**Pragya** - *The Wisdom of Agentic Commerce.*
