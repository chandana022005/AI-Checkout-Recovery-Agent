/**
 * Mock data configuration for the store.
 * In a real application, this data would come from a database or a Shopify API.
 */
const storeConfig = {
    shipping: {
        express: {
            cost: 28,
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
    
    profitRules: {
        minCartValueForIntervention: 50, 
        
        minIdleTimeSeconds: 20
    },

    policies: {
        returnPeriodDays: 7,
        paymentSecurity: "SSL encryption"
    }
};

module.exports = storeConfig;
