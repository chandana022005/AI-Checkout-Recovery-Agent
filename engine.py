import json
import os

class CartDecisionEngine:
    def __init__(self, data_path='data/mock_data.json'):
        self.data_path = data_path
        self.load_data()

    def load_data(self):
        with open(self.data_path, 'r') as f:
            self.data = json.load(f)
        self.rules = self.data.get('shipping_rules', {})
        self.products = self.data.get('products', [])
        self.threshold = self.rules.get('free_shipping_threshold', 1500)

    def calculate_shipping_gap(self, cart_total):
        if cart_total >= self.threshold:
            return 0
        return self.threshold - cart_total

    def get_recommendation(self, gap):
        # Find product that fits closely into the gap but doesn't exceed it too much
        # Or just find the cheapest product if the gap is very small
        suitable_products = [p for p in self.products if p['price'] >= gap]
        if not suitable_products:
            # If no product is big enough to bridge the gap, suggest the cheapest anyway
            return min(self.products, key=lambda x: x['price'])
        
        # Return the cheapest product that bridges the gap
        return min(suitable_products, key=lambda x: x['price'])

    def decide_strategy(self, cart_total, intent=None):
        min_intervention = self.rules.get('min_cart_for_intervention', 500)
        min_discount = self.rules.get('min_cart_for_discount', 2000)
        gap = self.calculate_shipping_gap(cart_total)
        
        # PROFIT-AWARE: Do not intervene for very low value carts to save AI costs
        if cart_total < min_intervention:
            return {
                "strategy": "NO_INTERVENTION",
                "message_context": "low_value",
                "gap": gap
            }

        strategy = {
            "strategy": "EXPLAIN_PRICING",
            "message_context": "general",
            "suggested_product": None,
            "gap": gap
        }

        # Intent-driven strategies (based on PDF Page 3)
        if intent == "shipping_concern" or (gap > 0 and gap <= 500):
            strategy["strategy"] = "SUGGEST_ITEMS"
            strategy["suggested_product"] = self.get_recommendation(gap)
            strategy["message_context"] = "shipping_gap"
        
        elif intent == "price_hesitation" and cart_total >= min_discount:
            strategy["strategy"] = "OFFER_DISCOUNT"
            strategy["message_context"] = "high_value_save"
            strategy["discount"] = self.data.get('discounts', [{}])[0]

        elif intent == "trust_issue":
            strategy["strategy"] = "BUILD_TRUST"
            strategy["message_context"] = "guarantee_policy"

        return strategy

if __name__ == "__main__":
    # Quick test logic
    engine = CartDecisionEngine()
    print(f"Test 1200 Cart: {engine.decide_strategy(1200, 'shipping_concern')}")
