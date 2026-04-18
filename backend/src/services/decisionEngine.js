const storeConfig = require('../data/storeConfig');
const logger = require('../utils/logger');

/**
 * Service to handle business logic, Profit-Aware checks, and rule-based fallbacks.
 */
const decisionEngine = {
    /**
     * Profit-Aware Check: Determines if we should even intervene.
     * @param {number} cartTotal 
     * @param {string} event 
     * @param {number} idleTime 
     * @param {boolean} userTyping 
     * @returns {boolean} True if intervention is authorized.
     */
    shouldIntervene: (cartTotal, event, idleTime, userTyping) => {
        // 1. Event trigger
        let triggered = false;
        if (event === 'user_enquiry' || (idleTime >= storeConfig.profitRules.minIdleTimeSeconds && !userTyping)) {
            triggered = true;
        }
        
        if (!triggered) return false;

        // 2. Profit-Aware Bypass (Ignore low value carts)
        if (cartTotal < storeConfig.profitRules.minCartValueForIntervention) {
            logger.info('DecisionEngine', `Skipping intervention. Cart value ($${cartTotal}) below minimum threshold.`);
            return false;
        }

        return true;
    },

    /**
     * Gets the shipping context based on the user's selected shipping type.
     * @param {string} shippingType 'express' or 'standard'
     * @returns {Object} { gap, deliveryTime, addonName }
     */
    getShippingContext: (shippingType) => {
        const rules = storeConfig.shipping[shippingType] || storeConfig.shipping.standard;
        return {
            gap: rules.cost,
            deliveryTime: rules.time,
            addonName: rules.addonProduct.name
        };
    },

    /**
     * Generates a structural prompt for the AI based on context.
     * @param {Object} context contains cart_total, shipping_cost, shipping_type, search_history
     * @returns {string} The constructed prompt
     */
    buildPrompt: (context) => {
        const ctx = decisionEngine.getShippingContext(context.shipping_type);
        
        return `
Role: Elite E-commerce Assistant (Pragya).
Context: ${context.shipping_type || 'standard'} shipping. History: ${JSON.stringify(context.search_history || [])}.
Current State: Shipping Cost $${context.shipping_cost}, Total $${context.cart_total}.

SCENARIO RULES:
1. SHIPPING_CONCERN: If msg contains "shipping" or "delivery price". 
   - If cost > 0: "You are only $${ctx.gap} away from FREE delivery! I suggest adding our ${ctx.addonName} to bridge the gap."
   - If cost == 0: "You're already eligible for FREE shipping! It will arrive in ${ctx.deliveryTime}."

2. PRICE_HESITATION: If msg contains "expensive", "price", "too much".
   - Response: "I understand. These items are crafted for premium quality and longevity. We offer a ${storeConfig.policies.returnPeriodDays}-day return policy for peace of mind."

3. DELIVERY_QUERY: If msg contains "time", "when", "arrive", "slow".
   - Response: "Your order will arrive in ${ctx.deliveryTime}. You'll receive real-time tracking updates."

4. TRUST_ISSUE: If msg contains "safe", "return", "secure".
   - Response: "We offer a ${storeConfig.policies.returnPeriodDays}-day no-questions-asked return policy and all payments are secured via ${storeConfig.policies.paymentSecurity}."

5. EMPTY_MSG: "Hi there! I'm your Pragya shopping assistant. I noticed you've been reviewing your cart—is it the price, delivery, or something else? I'm here to help."

Output ONLY JSON:
{
  "intent": "string",
  "strategy": "string",
  "response": "string",
  "suggested_action": { "type": "add_product", "product": { "name": "${ctx.addonName}", "price": ${ctx.gap} } } | null
}`;
    },

    /**
     * Fallback rules engine if AI fails or times out.
     * @param {string} userMessage 
     * @param {Object} context 
     * @returns {Object} Intent decision object
     */
    runFallbackLogic: (userMessage, context) => {
        const msg = (userMessage || "").toLowerCase();
        const ctx = decisionEngine.getShippingContext(context.shipping_type);
        
        let response = "Hi there! I'm your Pragya assistant. I noticed you've been reviewing your cart—is it the price, delivery, or something else? I'm here to help.";
        let strategy = "diagnostic_greeting";
        let suggested_action = null;

        if (msg.includes("shipping") || msg.includes("delivery cost") || (msg.includes("price") && msg.includes("shipping"))) {
            if (context.shipping_cost > 0) {
                response = `You're just $${ctx.gap} away from FREE shipping! I recommend adding the ${ctx.addonName} to unlock free delivery in ${ctx.deliveryTime}.`;
                strategy = "suggest_addon";
                suggested_action = { type: "add_product", product: { name: ctx.addonName, price: ctx.gap } };
            } else {
                response = `Good news! You're already eligible for FREE delivery. Your order will arrive in ${ctx.deliveryTime}.`;
                strategy = "clarify_info";
            }
        } else if (msg.includes("expensive") || msg.includes("price") || msg.includes("cost")) {
            response = `I understand. Our products are crafted for premium quality and long-term value. We also offer a ${storeConfig.policies.returnPeriodDays}-day return policy.`;
            strategy = "explain_value";
        } else if (msg.includes("time") || msg.includes("when") || msg.includes("arrive")) {
            response = `Since you chose ${context.shipping_type || 'standard'}, your order will arrive in ${ctx.deliveryTime}. We'll send tracking info as soon as it ships!`;
            strategy = "clarify_info";
        } else if (msg.includes("safe") || msg.includes("return") || msg.includes("pay")) {
            response = `Your security is our priority. We use ${storeConfig.policies.paymentSecurity} and offer a ${storeConfig.policies.returnPeriodDays}-day return policy.`;
            strategy = "reassure_user";
        }

        return { intent: "fallback_rule", strategy, response, suggested_action };
    }
};

module.exports = decisionEngine;
