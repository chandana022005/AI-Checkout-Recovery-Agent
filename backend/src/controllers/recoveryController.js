const aiService = require('../services/aiService');
const decisionEngine = require('../services/decisionEngine');
const logger = require('../utils/logger');

const recoveryController = {
    /**
     * Handles the POST /api/recover route
     */
    processRecovery: async (req, res) => {
        try {
            // 1. Destructure and set defaults
            const {
                cart_total = 0,
                items = [],
                shipping_cost = 0,
                shipping_type = 'standard',
                user_message = '',
                event = 'checkout_hesitation',
                idle_time = 0,
                user_typing = false,
                search_history = []
            } = req.body;

            const context = { cart_total, items, shipping_cost, shipping_type, search_history };

            // 2. Profit-Aware Decision: Should we intervene?
            if (!decisionEngine.shouldIntervene(cart_total, event, idle_time, user_typing)) {
                return res.json({ intervention_triggered: false });
            }

            // 3. System Health Check
            if (!aiService.isConfigured()) {
                logger.error('RecoveryController', 'API Keys missing.');
                return res.json({ intent: "error", response: "⚠️ AI Key Missing", intervention_triggered: true });
            }

            // 4. Build Prompt
            const prompt = decisionEngine.buildPrompt(context);
            
            // 5. Query AI
            logger.info('RecoveryController', 'Querying Gemini for decision...');
            let aiDecision = await aiService.getDecision(prompt);

            // 6. Fail-Safe / Fallback Logic
            if (!aiDecision) {
                logger.warn('RecoveryController', 'Falling back to rule-based logic.');
                aiDecision = decisionEngine.runFallbackLogic(user_message, context);
            }

            // 7. Return Result
            logger.info('RecoveryController', `Returning decision: Strategy=${aiDecision.strategy}`);
            aiDecision.intervention_triggered = true;
            return res.json(aiDecision);

        } catch (error) {
            logger.error('RecoveryController', error);
            res.status(500).json({ intent: "error", response: "⚠️ Internal Error", intervention_triggered: true });
        }
    }
};

module.exports = recoveryController;
