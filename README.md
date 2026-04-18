<<<<<<< HEAD
# Pragya: Minimal-Intervention AI Checkout Recovery

**Team Pragya | KASPARRO Agentic Commerce Hackathon**
*Chandana S & Hitendra S | CMR Institute of Technology, Bangalore*

## The Problem
E-commerce brands lose billions due to abandoned carts. Most systems try to recover these *after* the user has already left (via emails or calls), which is often too late or too intrusive.

## The Solution: Pragya
**Pragya** is an intelligent, real-time decision engine that identifies user hesitation *during* the checkout process.
- **Minimal Intervention:** It only triggers after 20 seconds of inactivity or detected "exit intent."
- **Context-Aware:** It calculates exactly why a user might be hesitating (e.g., shipping costs) and offers specific, helpful solutions (like gap-filling products to reach free shipping).
- **Hybrid Brain:** A rule-based engine handles math and business logic, while a GPT-4o-mini layer handles natural conversation and empathy.

## Tech Stack
- **Backend:** Python / Flask
- **AI Core:** OpenAI GPT-4o-mini
- **Frontend Integration:** REST API (JSON)

## Getting Started

### 1. Prerequisites
- Python 3.8+
- OpenAI API Key

### 2. Installation
```bash
# Clone the repository (or extract files)
cd KASPARRO

# Install dependencies
pip install -r requirements.txt
```

### 3. Configuration
1. Open the `.env` file.
2. Add your OpenAI API Key:
   `OPENAI_API_KEY=your_actual_key_here`

### 4. Running the Server
```bash
python main.py
```
The server will be available at `http://localhost:5000`.

## API Documentation
### `POST /api/recover`
**Request Body:**
```json
{
 "cart_total": 1200,
 "items": ["Product A"],
 "user_message": "String (optional)",
 "event": "checkout_hesitation"
}
```

**Response:**
```json
{
 "response": "Natural language AI message",
 "strategy": "Chosen recovery strategy",
 "suggested_product": { "name": "...", "price": ... }
}
```
=======
# Pragya: Real-Time Decision Engine for Checkout Recovery
**Team Pragya | KASPARRO Agentic Commerce Hackathon**
*Chandana S & Hitendra S | CMR Institute of Technology, Bangalore*

---

## 🌟 The Problem
Abandoned carts are the biggest challenge in e-commerce. Conventional recovery methods (emails/SMS) are reactive. Pragya is a proactive, minimal-intervention agent that detects friction and makes real-time decisions to save the sale.

## 🧠 Diagnostic Thinking Engine
Pragya uses a specialized **Decision Matrix** to diagnose friction before offering solutions. This ensures a premium, non-pushy experience.

### 🔄 Multi-Scenario Intervention
Pragya is trained to handle the 4 most critical checkout bottlenecks:

| Intent | AI Strategy | Real-Time Decision |
| :--- | :--- | :--- |
| **Shipping Friction** | `suggest_addon` | Calculates the exact $18/$28 gap to unlock **FREE shipping** and suggests relevant items. |
| **Price Hesitation** | `explain_value` | Validates user concerns by explaining the premium quality and long-term value of the products. |
| **Delivery Logic** | `clarify_info` | Differentiates between **Express (1-2 days)** and **Standard (3-5 days)** delivery to remove uncertainty. |
| **Trust & Safety** | `reassure_user` | Confirms security protocols and highlights the **7-day return policy**. |

---

## 🛡️ Demo-Proof Resilience (Backup Brain)
Pragya is built for production environments. It includes a **Keyword Safety Net** that allows the agent to function even if the primary AI API reaches its quota limit. This ensures the customer always gets a helpful answer.

---

## 🛠 Tech Stack
- **Backend**: Node.js / Express (High Performance)
- **AI Core**: Google Gemini 1.5 Flash (Low-latency Reasoning)
- **Frontend**: React / Tailwind CSS / Vite (High-Fidelity UX)
- **Thresholds**: Dynamic calculation for $100 (Standard) and $110 (Express) free shipping.

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
>>>>>>> 6c7d059 (Implemented AI)
