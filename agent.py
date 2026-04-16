import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class RecoveryAgent:
    def __init__(self, model="gpt-4o-mini"):
        self.model = model

    def classify_intent(self, user_message, event_type):
        if not user_message:
            return "missing_information"

        prompt = f"""
        Analyze the following user message from a shopping checkout page. 
        Categorize the intention into exactly one of these categories:
        - price_hesitation: User thinks the items are too expensive.
        - shipping_concern: User is unhappy with shipping costs or delivery time.
        - trust_issue: User is worried about security, returns, or authenticity.
        - missing_information: General confusion or inactivity.

        User Message: "{user_message}"
        Event Type: "{event_type}"

        Return ONLY the category name.
        """

        response = client.chat.completions.create(
            model=self.model,
            messages=[{"role": "system", "content": "You are a concise intent classifier."},
                      {"role": "user", "content": prompt}],
            temperature=0
        )
        return response.choices[0].message.content.strip().lower()

    def generate_recovery_response(self, cart_data, strategy_data):
        strategy = strategy_data.get("strategy")
        gap = strategy_data.get("gap", 0)
        product = strategy_data.get("suggested_product")
        
        prompt = f"""
        You are 'Pragya', an empathetic and minimal-intervention shopping assistant.
        Your goal is to help the user complete their checkout by solving their specific concern.
        
        CONTEXT:
        - Cart Total: {cart_data.get('cart_total')}
        - Items: {cart_data.get('items')}
        - Detected Strategy: {strategy}
        - Shipping Gap: {gap} INR
        - Suggested Product: {product['name'] if product else 'None'} at {product['price'] if product else 0} INR
        
        INSTRUCTIONS:
        - Keep the message short (1-2 sentences).
        - Be helpful, not pushy.
        - If strategy is SUGGEST_ITEMS, mention how the suggested product helps bridge the free shipping gap.
        - If strategy is OFFER_DISCOUNT, mention the savings.
        - If strategy is BUILD_TRUST, mention easy returns or secure checkout.
        
        Generate the response message:
        """

        response = client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )
        return response.choices[0].message.content.strip()
