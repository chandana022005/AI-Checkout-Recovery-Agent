# 📜 Pragya: Decision Log

This document outlines the key architectural, design, and strategic decisions made during the development of Pragya for the KASPARRO Agentic Commerce Hackathon.

---

## 1. AI Model Selection: Google Gemini 2.5 Flash
- **Decision**: We chose **Gemini 2.5 Flash** as our primary reasoning engine.
- **Rationale**: Real-time checkout recovery requires extremely low latency. While Pro models offer deeper reasoning, Flash provides the perfect balance of speed and "agentic" capabilities needed to process cart context and respond within milliseconds.
- **Impact**: Near-instantaneous response times (sub-1 second), which is critical for preventing user drop-off.

## 2. Decision Logic: Decoupled Logic (Backend Orchestration)
- **Decision**: We implemented a dedicated Node.js/Express backend to act as a "Controller" between the Frontend and the AI.
- **Rationale**: Directly calling the AI from the frontend is insecure and lacks robust error handling. The backend allows us to:
    - Inject strict store policies (shipping/returns).
    - Aggregate multi-source context (cart, search history, user behavior).
    - Sanitize and "salvage" AI responses.
- **Impact**: Highly stable performance and centralized business logic.

## 3. UI Strategy: "Native-First" Minimalist Design
- **Decision**: We avoided traditional "floating chat bubbles" in favor of a minimalist, glassmorphic widget that mimics the native Shopify checkout aesthetic.
- **Rationale**: Trust is paramount during checkout. Traditional chatbots can feel like third-party "bloatware." A native-looking UI reduces friction and increases user confidence.
- **Impact**: Higher engagement rates as the tool feels like an integral part of the store.

## 4. Intervention Strategy: Event-Driven vs. Constant Chat
- **Decision**: The AI only intervenes based on specific triggers:
    - **Idle Time**: >20 seconds of inactivity.
    - **Threshold Proximity**: User is within ₹300 of the free shipping limit.
    - **User Query**: Explicit help requests.
- **Rationale**: Constant "AI chatter" is annoying. Pragya follows a "Helpful but Invisible" philosophy.
- **Impact**: Reduces "pop-up fatigue" and ensures interventions are perceived as high-value.

## 5. Feature Addition: Voice-to-Text (Accessibility)
- **Decision**: Integrated the **Web Speech API** for voice input.
- **Rationale**: Many checkout abandons happen on mobile where typing is cumbersome. Voice input allows users to quickly ask questions ("When will this arrive?") without fumbling with a keyboard.
- **Impact**: Improved accessibility and a smoother mobile UX.

## 6. Technical Resilience: The "Salvage Parser"
- **Decision**: Developed a custom regex-based parser to fix truncated JSON from the AI.
- **Rationale**: Large language models occasionally fail to close JSON braces or truncate text due to token limits.
- **Impact**: Prevents "JSON Parse Error" crashes and ensures the assistant stays online even during edge-case AI outputs.

---
**Team Pragya**  
*Chandana S & Hitendra S*
