# SmartDine AI - Restaurant Website

A full-stack restaurant website featuring an AI-powered chatbot, online booking system, and modern responsive design.

## Features

- 🏠 **Landing Page** - Hero section with call-to-action buttons
- 📋 **Menu Display** - Beautiful menu with starters, main courses, and desserts
- 📅 **Online Booking** - Reservation form with validation
- 🤖 **AI Chatbot** - Restaurant assistant for customer queries
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Modern UI** - Built with TailwindCSS

## Tech Stack

- **Frontend**: HTML, TailwindCSS, JavaScript
- **Backend**: Node.js, Express
- **AI**: OpenAI GPT-3.5-turbo (mock implementation)
- **Styling**: TailwindCSS

## Project Structure

```
demo_auralix/
├── public/
│   ├── css/
│   ├── js/
│   │   └── main.js
│   └── images/
├── views/
│   └── index.html
├── server/
│   ├── index.js
│   ├── routes/
│   │   ├── booking.js
│   │   └── chatbot.js
│   ├── controllers/
│   │   ├── bookingController.js
│   │   └── chatbotController.js
│   ├── config/
│   └── models/
│       └── bookings.json
├── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd demo_auralix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Usage

### Website Features

1. **Landing Page**: View the hero section with restaurant branding
2. **Menu**: Browse the restaurant's menu items
3. **Booking**: Fill out the reservation form to book a table
4. **Chatbot**: Click the chat icon in the bottom-right corner to ask questions

### Chatbot Questions

The AI chatbot can answer questions about:
- Restaurant hours and availability
- Menu items and dietary options
- Reservation process
- Location and contact information
- Pricing and special offers
- Allergies and dietary restrictions

### API Endpoints

- `POST /api/bookings` - Create a new reservation
- `POST /api/chatbot` - Send message to AI chatbot
- `GET /api/bookings` - Get all bookings (admin)

## Development

### Running in Development Mode

```bash
npm run dev
```

This will start the server with nodemon for automatic restarts.

### Production Build

```bash
npm start
```

### File Structure Details

- **`views/index.html`**: Main website with all sections
- **`public/js/main.js`**: Frontend JavaScript for interactions
- **`server/index.js`**: Express server setup
- **`server/routes/`**: API route definitions
- **`server/controllers/`**: Business logic for API endpoints
- **`server/models/bookings.json`**: Local storage for reservations

## Customization

### Adding Menu Items

Edit the menu section in `views/index.html` to add or modify menu items.

### Modifying Chatbot Responses

Update the `getRestaurantResponse()` function in `server/controllers/chatbotController.js` to customize AI responses.

### Styling Changes

The website uses TailwindCSS. Modify the classes in `views/index.html` or add custom CSS in the `<style>` section.

## Deployment

### Local Development
- Run `npm run dev` for development with auto-reload
- Run `npm start` for production mode

### Cloud Deployment
The frontend can be deployed on:
- **Netlify**: Upload the `views/` and `public/` folders
- **Vercel**: Connect your GitHub repository
- **Heroku**: Deploy the entire project

### Environment Variables

For production, consider adding:
- `PORT`: Server port (default: 3000)
- `OPENAI_API_KEY`: For real OpenAI integration

## Features in Detail

### Booking System
- Form validation for all fields
- Date validation (no past dates)
- Email format validation
- Phone number validation
- Stores bookings in local JSON file

### Chatbot
- Restaurant-specific responses
- Handles common customer questions
- Simulates typing delay for realism
- Responsive chat interface

### Responsive Design
- Mobile-first approach
- Works on all screen sizes
- Smooth scrolling navigation
- Modern UI with hover effects

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the port in `server/index.js`
   - Or kill the process using the port

2. **Module not found errors**
   - Run `npm install` to install dependencies

3. **Chatbot not responding**
   - Check browser console for errors
   - Ensure server is running on correct port

### Debug Mode

Add `console.log()` statements in the controllers to debug API calls.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues or questions, please open an issue on the repository. 