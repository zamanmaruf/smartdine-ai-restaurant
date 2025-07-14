// Note: This is a mock implementation since we don't have a real OpenAI API key
// In production, you would use the actual OpenAI API

const handleMessage = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ 
                error: 'Message is required and must be a string' 
            });
        }

        // Convert message to lowercase for easier matching
        const userMessage = message.toLowerCase().trim();

        // Restaurant-specific responses
        let response = getRestaurantResponse(userMessage);

        // If no specific response found, provide a generic helpful response
        if (!response) {
            response = `I’m here to make your SmartDine experience exceptional! You can ask me about:
- Our full menu, including vegan and gluten-free options
- Today’s chef specials and happy hour deals
- Making, changing, or canceling a reservation
- Private events, catering, or group bookings
- Parking, accessibility, and pet policies
- Kids’ menu, outdoor seating, and Wi-Fi
- Payment methods, gift cards, and more

If you have any other questions about our restaurant, services, or your visit, just ask!`;
        }

        // Simulate API delay for realistic experience
        await new Promise(resolve => setTimeout(resolve, 1000));

        res.json({ response });

    } catch (error) {
        console.error('Error handling chatbot message:', error);
        res.status(500).json({ 
            error: 'Failed to process message' 
        });
    }
};

// Restaurant-specific response logic
function getRestaurantResponse(message) {
    // Hours and availability
    if (message.includes('open') || message.includes('hours') || message.includes('time')) {
        return "We're open Monday to Friday from 11:00 AM to 10:00 PM, and Saturday to Sunday from 10:00 AM to 11:00 PM. We're closed on major holidays.";
    }

    if (message.includes('sunday') || message.includes('sundays')) {
        return "Yes, we're open on Sundays from 10:00 AM to 11:00 PM. We serve brunch from 10:00 AM to 2:00 PM and dinner from 5:00 PM onwards.";
    }

    // Menu and dietary options
    if (message.includes('vegan') || message.includes('vegetarian')) {
        return "Yes, we have several vegan and vegetarian options! Our menu includes Vegan Pasta, Caesar Salad (can be made vegan), and Mango Sorbet for dessert. We also have many dishes that can be modified to be vegan-friendly.";
    }

    if (message.includes('menu') || message.includes('food') || message.includes('dish')) {
        return "Our menu features fresh, locally-sourced ingredients. We have starters like Garlic Bread and Caesar Salad, main courses including Grilled Salmon and Vegan Pasta, and desserts like Chocolate Lava Cake and Mango Sorbet. All our dishes are prepared fresh daily.";
    }

    // Reservations and booking
    if (message.includes('reserve') || message.includes('booking') || message.includes('table') || message.includes('book')) {
        return "You can make a reservation through our website using the booking form, or call us directly. We recommend booking at least 24 hours in advance, especially for weekend dining. For large groups (6+ people), please call us directly.";
    }

    if (message.includes('group') || message.includes('party')) {
        return "We can accommodate groups of various sizes! For groups of 6 or more, we recommend calling us directly to ensure we can provide the best service. We also offer special menus for large parties.";
    }

    // Location and contact
    if (message.includes('location') || message.includes('address') || message.includes('where')) {
        return "We're located at 123 Main Street, Downtown. We have plenty of parking available, and we're easily accessible by public transportation. You can find us on Google Maps by searching 'SmartDine AI'.";
    }

    if (message.includes('phone') || message.includes('call') || message.includes('contact')) {
        return "You can reach us at (555) 123-4567. We're available to take calls during our business hours. For urgent matters outside of business hours, you can leave a message and we'll get back to you the next day.";
    }

    // Pricing
    if (message.includes('price') || message.includes('cost') || message.includes('expensive') || message.includes('cheap')) {
        return "Our prices range from $8.99 for starters to $28.99 for premium main courses. We offer great value for the quality of food and service we provide. We also have daily specials and happy hour discounts from 4-6 PM.";
    }

    // Special requests
    if (message.includes('allergy') || message.includes('gluten') || message.includes('dairy') || message.includes('nut')) {
        return "We take food allergies very seriously. Please inform our staff of any allergies when you arrive, and we'll ensure your meal is prepared safely. We can accommodate most dietary restrictions and allergies.";
    }

    if (message.includes('special') || message.includes('occasion') || message.includes('birthday') || message.includes('anniversary')) {
        return "We love celebrating special occasions! We can arrange special decorations, birthday cakes, or custom menus for your celebration. Just let us know when making your reservation, and we'll make it memorable.";
    }

    // General questions
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return "Hello! Welcome to SmartDine AI. I'm here to help you with any questions about our restaurant, menu, reservations, or anything else. How can I assist you today?";
    }

    if (message.includes('thank')) {
        return "You're very welcome! Is there anything else I can help you with regarding our restaurant?";
    }

    if (message.includes('goodbye') || message.includes('bye')) {
        return "Thank you for chatting with me! I hope I've been helpful. Have a wonderful day, and we look forward to serving you at SmartDine AI!";
    }

    // Parking
    if (message.includes('parking')) {
        return "Yes, we offer free parking for all our guests in the lot adjacent to the restaurant. There is also street parking available nearby.";
    }

    // Pet policy
    if (message.includes('pet') || message.includes('dog') || message.includes('cat')) {
        return "We welcome service animals inside the restaurant. Well-behaved pets are allowed in our outdoor seating area.";
    }

    // Kids menu
    if (message.includes('kid') || message.includes('children') || message.includes('child')) {
        return "Yes, we have a special kids menu with child-friendly portions and options. High chairs and booster seats are also available.";
    }

    // Outdoor seating
    if (message.includes('outdoor') || message.includes('patio') || message.includes('outside')) {
        return "We offer beautiful outdoor seating with a waterfront view. You can request a patio table when making your reservation.";
    }

    // Wi-Fi
    if (message.includes('wifi') || message.includes('wi-fi') || message.includes('internet')) {
        return "Yes, we offer complimentary high-speed Wi-Fi for all our guests. Please ask your server for the password.";
    }

    // Dress code
    if (message.includes('dress code') || message.includes('attire')) {
        return "Our dress code is smart casual. We want you to feel comfortable, but we kindly ask that guests avoid beachwear and sleeveless shirts.";
    }

    // Gift cards
    if (message.includes('gift card') || message.includes('voucher')) {
        return "Gift cards are available for purchase at the restaurant or online through our website. They make a perfect gift for any occasion!";
    }

    // Catering/private events
    if (message.includes('cater') || message.includes('catering') || message.includes('private event') || message.includes('party room')) {
        return "We offer catering services and private event spaces for special occasions. Please contact us for more details and to discuss your event needs.";
    }

    // Takeout/delivery
    if (message.includes('takeout') || message.includes('take out') || message.includes('delivery') || message.includes('order')) {
        return "We offer both takeout and delivery options. You can place your order online or by calling us directly.";
    }

    // Payment methods
    if (message.includes('payment') || message.includes('pay') || message.includes('credit card') || message.includes('cash')) {
        return "We accept all major credit cards, debit cards, and cash. Contactless payment options are also available.";
    }

    // Accessibility
    if (message.includes('accessibility') || message.includes('wheelchair') || message.includes('accessible')) {
        return "Our restaurant is fully wheelchair accessible, including restrooms and entrances. If you need any assistance, please let our staff know.";
    }

    // Happy hour
    if (message.includes('happy hour')) {
        return "Happy hour is every weekday from 4:00 PM to 6:00 PM, featuring discounts on drinks and select appetizers.";
    }

    // Chef's specials
    if (message.includes('special') && message.includes('chef')) {
        return "Our chef prepares daily specials using the freshest seasonal ingredients. Ask your server about today's chef's special!";
    }

    // Lost & found
    if (message.includes('lost') || message.includes('found') || message.includes('left behind')) {
        return "If you've lost or left something behind, please call us as soon as possible. We'll do our best to help you recover your item.";
    }

    // Smoking policy
    if (message.includes('smoking') || message.includes('smoke')) {
        return "Smoking is not permitted inside the restaurant or on the patio. We have a designated smoking area outside the main entrance.";
    }

    // Full menu, vegan, gluten-free options
    if (message.includes('menu') || message.includes('vegan') || message.includes('gluten-free') || message.includes('gluten free') || message.includes('vegetarian') || message.includes('food') || message.includes('dish')) {
        return "Our menu features a variety of dishes, including vegan and gluten-free options. You can enjoy Vegan Pasta, gluten-free salads, and more. Let me know if you’d like recommendations or details about any dish!";
    }

    // Chef specials, happy hour deals
    if (message.includes('chef special') || (message.includes('special') && !message.includes('occasion')) || message.includes('today’s special') || message.includes('todays special') || message.includes('happy hour') || message.includes('deal') || message.includes('discount')) {
        return "Today’s chef specials are crafted with fresh, seasonal ingredients. We also offer happy hour every weekday from 4–6 PM with discounts on drinks and select appetizers. Ask your server for today’s specials!";
    }

    // Making, changing, or canceling a reservation
    if (message.includes('reservation') || message.includes('book') || message.includes('booking') || message.includes('change reservation') || message.includes('cancel reservation') || message.includes('table')) {
        return "You can make, change, or cancel a reservation directly on our website or by calling us. If you need help, just let me know your details and I’ll assist you!";
    }

    // Private events, catering, group bookings
    if (message.includes('private event') || message.includes('event') || message.includes('party') || message.includes('group') || message.includes('catering') || message.includes('large group') || message.includes('banquet')) {
        return "We offer private event spaces and catering for groups of all sizes. Contact us to discuss your needs, and we’ll help you plan the perfect event!";
    }

    // Parking, accessibility, pet policies
    if (message.includes('parking') || message.includes('accessible') || message.includes('wheelchair') || message.includes('pet') || message.includes('dog') || message.includes('cat') || message.includes('service animal')) {
        return "We offer free parking and are fully wheelchair accessible. Service animals are welcome inside, and well-behaved pets are allowed in our outdoor seating area.";
    }

    // Kids’ menu, outdoor seating, Wi-Fi
    if (message.includes('kid') || message.includes('children') || message.includes('child') || message.includes('kids menu') || message.includes('outdoor') || message.includes('patio') || message.includes('outside') || message.includes('wifi') || message.includes('wi-fi') || message.includes('internet')) {
        return "We have a special kids’ menu, beautiful outdoor seating, and free high-speed Wi-Fi for all guests. Just ask your server for details!";
    }

    // Payment methods, gift cards
    if (message.includes('payment') || message.includes('pay') || message.includes('credit card') || message.includes('cash') || message.includes('gift card') || message.includes('voucher')) {
        return "We accept all major credit cards, debit cards, and cash. Gift cards are available for purchase at the restaurant or online.";
    }

    // If no specific match found, return null to trigger generic response
    return null;
}

module.exports = {
    handleMessage
}; 