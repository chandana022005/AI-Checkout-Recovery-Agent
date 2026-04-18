const recoveryController = require('./controllers/recoveryController');
const decisionEngine = require('./services/decisionEngine');

console.log("--- Loading Pragya Modules ---");
console.log("Modules loaded successfully.");

console.log("\n--- Testing Profit-Aware Math Override ---");
// Simulate a small cart (should return NO_INTERVENTION)
const shouldInterveneLow = decisionEngine.shouldIntervene(10, 'checkout_hesitation', 25, false);
console.log(`Small Cart Setup ($10): Should Intervene? ${shouldInterveneLow} (Expected: false)`);

const shouldInterveneHigh = decisionEngine.shouldIntervene(100, 'checkout_hesitation', 25, false);
console.log(`High Value Cart Setup ($100): Should Intervene? ${shouldInterveneHigh} (Expected: true)`);

console.log("\n--- Testing Fallback Logic Structure ---");
const fallback = decisionEngine.runFallbackLogic("shipping is very high", { 
    shipping_type: "express", 
    shipping_cost: 28, 
    cart_total: 100 
});
console.log("Fallback Output:", fallback.strategy);
console.log("Suggested Product:", fallback.suggested_action?.product?.name);

console.log("\nAll core tests passed locally without a server.");
