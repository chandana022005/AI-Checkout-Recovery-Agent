require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getAiDecision(prompt, model) {
  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.1,
      }
    });

    const responseText = result.response.text().trim();
    const firstBrace = responseText.indexOf('{');
    const lastBrace = responseText.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1) {
      const jsonStr = responseText.substring(firstBrace, lastBrace + 1);
      return JSON.parse(jsonStr);
    }
  } catch (e) {
    console.error("AI Generation or Parse failed:", e);
  }
  return null;
}

app.post('/api/recover', async (req, res) => {
  try {
    const {
      cart_total,
      items,
      shipping_cost,
      shipping_type,
      user_message,
      event,
      idle_time,
      user_typing,
      search_history
    } = req.body;

    let intervention_triggered = false;
    if (event === 'user_enquiry' || (idle_time >= 20 && !user_typing)) intervention_triggered = true;

    if (!intervention_triggered) {
      return res.json({ intervention_triggered: false });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({ intent: "error", response: "⚠️ AI Key Missing", intervention_triggered: true });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const gap = shipping_type === 'express' ? 28 : 18;
    const deliveryTime = shipping_type === 'express' ? "1-2 business days" : "3-5 business days";
    const addonName = shipping_type === 'express' ? "Premium Leather Card Holder" : "Organic Cotton Socks";

    const prompt = `
Role: Elite E-commerce Assistant (Pragya).
Context: ${shipping_type} shipping. History: ${JSON.stringify(search_history)}.
Current State: Shipping Cost $${shipping_cost}, Total $${cart_total}.

SCENARIO RULES:
1. SHIPPING_CONCERN: If msg contains "shipping" or "delivery price". 
   - If cost > 0: "You are only $${gap} away from FREE delivery! I suggest adding our ${addonName} to bridge the gap."
   - If cost == 0: "You're already eligible for FREE shipping! It will arrive in ${deliveryTime}."

2. PRICE_HESITATION: If msg contains "expensive", "price", "too much".
   - Response: "I understand. These items are crafted for premium quality and longevity. We offer a 7-day return policy for peace of mind."

3. DELIVERY_QUERY: If msg contains "time", "when", "arrive", "slow".
   - Response: "Your ${shipping_type} order will arrive in ${deliveryTime}. You'll receive real-time tracking updates."

4. TRUST_ISSUE: If msg contains "safe", "return", "secure".
   - Response: "We offer a 7-day no-questions-asked return policy and all payments are secured via SSL encryption."

5. EMPTY_MSG: "Hi there! I'm your Pragya shopping assistant. I noticed you've been reviewing your cart—is it the price, delivery, or something else? I'm here to help."

Output ONLY JSON:
{
  "intent": "string",
  "strategy": "string",
  "response": "string",
  "suggested_action": { "type": "add_product", "product": { "name": "${addonName}", "price": ${gap} } } | null
}`;

    let aiDecision = await getAiDecision(prompt, model);
    
    if (!aiDecision) {
      const msg = (user_message || "").toLowerCase();
      let response = "Hi there! I'm your Pragya assistant. I noticed you've been reviewing your cart—is it the price, delivery, or something else? I'm here to help.";
      let strategy = "diagnostic_greeting";
      let suggested_action = null;

      if (msg.includes("shipping") || msg.includes("delivery cost") || msg.includes("price") && msg.includes("shipping")) {
        if (shipping_cost > 0) {
          response = `You're just $${gap} away from FREE shipping! I recommend adding the ${addonName} to unlock free delivery in ${deliveryTime}.`;
          strategy = "suggest_addon";
          suggested_action = { type: "add_product", product: { name: addonName, price: gap } };
        } else {
          response = `Good news! You're already eligible for FREE delivery. Your order will arrive in ${deliveryTime}.`;
          strategy = "clarify_info";
        }
      } else if (msg.includes("expensive") || msg.includes("price") || msg.includes("cost")) {
        response = "I understand. Our products are crafted for premium quality and long-term value. We also offer a 7-day return policy.";
        strategy = "explain_value";
      } else if (msg.includes("time") || msg.includes("when") || msg.includes("arrive")) {
        response = `Since you chose ${shipping_type}, your order will arrive in ${deliveryTime}. We'll send tracking info as soon as it ships!`;
        strategy = "clarify_info";
      } else if (msg.includes("safe") || msg.includes("return") || msg.includes("pay")) {
        response = "Your security is our priority. We use SSL encryption for all payments and offer a 7-day no-questions-asked return policy.";
        strategy = "reassure_user";
      }

      aiDecision = { intent: "fallback", strategy, response, suggested_action };
    }

    aiDecision.intervention_triggered = true;
    return res.json(aiDecision);

  } catch (error) {
    res.status(500).json({ intent: "error", response: "⚠️ Error", intervention_triggered: true });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
