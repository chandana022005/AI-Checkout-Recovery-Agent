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
