/**
 * Mock data configuration for the store.
 * In a real application, this data would come from a database or a Shopify API.
 */
const storeConfig = {
    // Shipping rules
    shipping: {
        express: {
            cost: 28, // Cost that needs to be covered to get free express shipping
            time: "1-2 business days",
            addonProduct: {
                name: "Premium Leather Card Holder",
                price: 28
            }
        },
        standard: {
            cost: 18,
            time: "3-5 business days",
            addonProduct: {
                name: "Organic Cotton Socks",
                price: 18
            }
        }
    },
    
    // Profit-Aware Logic Configuration
    profitRules: {
        // Minimum cart value required to trigger an AI AI intervention (saves cost)
        minCartValueForIntervention: 50, 
        
        // Idle time required (in seconds) to consider intervention
        minIdleTimeSeconds: 20
    },

    // Return policy details for TRUST intents
    policies: {
        returnPeriodDays: 7,
        paymentSecurity: "SSL encryption"
    }
};

module.exports = storeConfig;
