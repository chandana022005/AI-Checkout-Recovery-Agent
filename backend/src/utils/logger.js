/**
 * Basic structured logger for production environments.
 * In a larger application, consider using libraries like Winston or Pino.
 */
const logger = {
    /**
     * @param {string} context 
     * @param {string|Object} message 
     */
    info: (context, message) => {
        console.log(`[INFO] [${new Date().toISOString()}] [${context}]`, message);
    },
    
    /**
     * @param {string} context 
     * @param {string|Object} message 
     */
    warn: (context, message) => {
        console.warn(`[WARN] [${new Date().toISOString()}] [${context}]`, message);
    },
    
    /**
     * @param {string} context 
     * @param {string|Error|Object} error 
     */
    error: (context, error) => {
        console.error(`[ERROR] [${new Date().toISOString()}] [${context}]`, error);
    }
};

module.exports = logger;
