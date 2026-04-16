from flask import Flask, request, jsonify
from flask_cors import CORS
from engine import CartDecisionEngine
from agent import RecoveryAgent

app = Flask(__name__)
CORS(app)  # Enable CORS for Hitendra's frontend

# Initialize our components
engine = CartDecisionEngine()
agent = RecoveryAgent()

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "Pragya Backend is running", "version": "1.0.0"})

@app.route('/api/recover', methods=['POST'])
def recover_cart():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Step 1: Extract data (as per PDF schema)
        cart_total = data.get('cart_total', 0)
        items = data.get('items', [])
        shipping_cost = data.get('shipping_cost', 0)
        user_message = data.get('user_message', '')
        event_type = data.get('event', 'checkout_hesitation')

        # Step 2: Intent Analysis (AI Layer)
        intent = agent.classify_intent(user_message, event_type)

        # Step 3: Decision Engine (Rule Layer)
        strategy_data = engine.decide_strategy(cart_total, intent)

        # Step 4: Final Response Generation (AI Layer)
        # PROFIT-AWARE: If engine says NO_INTERVENTION, skip AI and return early
        if strategy_data.get("strategy") == "NO_INTERVENTION":
            return jsonify({
                "intent": intent,
                "strategy": "NO_INTERVENTION",
                "response": None,
                "status": "ignored_low_value"
            })

        ai_response = agent.generate_recovery_response(data, strategy_data)

        # Return the final payload
        return jsonify({
            "intent": intent,
            "strategy": strategy_data.get("strategy"),
            "response": ai_response,
            "suggested_product": strategy_data.get("suggested_product"),
            "shipping_gap": strategy_data.get("gap")
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
