const { GoogleGenerativeAI } = require('@google/generative-ai');
const logger = require('../utils/logger');

const genAI = process.env.GEMINI_API_KEY
    ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    : null;

/**
 * Service to handle Google Gemini API interactions.
 */
const aiService = {
    /**
     * Checks if the AI API is configured
     * @returns {boolean}
     */
    isConfigured: () => {
        return !!genAI;
    },

    /**
     * Sends a prompt to Gemini and parses the expected JSON response.
     * @param {string} prompt The detailed instructions for Pragya.
     * @returns {Promise<Object|null>} parsed JSON decision object or null if failed.
     */
    getDecision: async (prompt) => {
        if (!genAI) {
            logger.warn('AIService', 'Gemini API call attempted but key is missing.');
            return null;
        }

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

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

            logger.warn('AIService', 'Could not parse JSON from AI response.');
            return null;

        } catch (error) {
            logger.error('AIService', `Generation failed: ${error.message}`);
            return null;
        }
    }
};

module.exports = aiService;
