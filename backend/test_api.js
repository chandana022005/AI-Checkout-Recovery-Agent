const testBackend = async () => {
    console.log("🚀 Sending mock cart data to Pragya Backend...\n");
    
    try {
        const response = await fetch('http://localhost:3001/api/recover', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cart_total: 100, // Over $50 to trigger the AI
                shipping_cost: 28,
                shipping_type: "express",
                user_message: "Shipping is too expensive for me to buy this today.",
                event: "checkout_hesitation",
                idle_time: 25,
                user_typing: false
            })
        });

        const data = await response.json();
        console.log("✅ Response Received:");
        console.dir(data, { depth: null, colors: true });

    } catch (error) {
        console.error("❌ Error connecting to server:", error.message);
        console.log("\nMake sure your server is running with 'npm run start' in another terminal!");
    }
};

testBackend();
