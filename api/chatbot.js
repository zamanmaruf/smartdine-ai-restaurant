export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    try {
        const { message } = req.body;
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message is required and must be a string' });
        }
        const userMessage = message.toLowerCase().trim();
        let response = getRestaurantResponse(userMessage);
        if (!response) {
            response = `I’m here to make your SmartDine experience exceptional! You can ask me about:\n- Our full menu, including vegan and gluten-free options\n- Today’s chef specials and happy hour deals\n- Making, changing, or canceling a reservation\n- Private events, catering, or group bookings\n- Parking, accessibility, and pet policies\n- Kids’ menu, outdoor seating, and Wi-Fi\n- Payment methods, gift cards, and more\n\nIf you have any other questions about our restaurant, services, or your visit, just ask!`;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process message' });
    }
}

// Full getRestaurantResponse logic from chatbotController.js
function getRestaurantResponse(message) {
    // (Insert the full function body from chatbotController.js here)
    // ...
    // For brevity, you can copy the full function from your controller.
    // (Omitted here for space, but will be included in the actual file)
} 