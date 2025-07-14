// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Booking form handling
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(bookingForm);
            const bookingData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                guests: formData.get('guests'),
                date: formData.get('date'),
                time: formData.get('time')
            };

            try {
                const response = await fetch('/api/bookings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bookingData)
                });

                if (response.ok) {
                    alert('Reservation Confirmed! We will contact you soon to confirm your booking.');
                    bookingForm.reset();
                } else {
                    alert('There was an error processing your booking. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error processing your booking. Please try again.');
            }
        });
    }

    // Chatbot functionality
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');

    if (chatbotToggle && chatbotContainer) {
        // Toggle chatbot visibility
        chatbotToggle.addEventListener('click', function() {
            const isVisible = chatbotContainer.style.display === 'block';
            chatbotContainer.style.display = isVisible ? 'none' : 'block';
        });

        // Send message function
        async function sendMessage() {
            const message = chatbotInput.value.trim();
            if (!message) return;

            // Add user message to chat
            addMessage(message, 'user');
            chatbotInput.value = '';

            // Show typing indicator
            const typingIndicator = addMessage('Typing...', 'bot');
            
            try {
                const response = await fetch('/api/chatbot', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: message })
                });

                if (response.ok) {
                    const data = await response.json();
                    // Remove typing indicator and add bot response
                    typingIndicator.remove();
                    addMessage(data.response, 'bot');
                } else {
                    typingIndicator.remove();
                    addMessage('Sorry, I\'m having trouble connecting right now. Please try again later.', 'bot');
                }
            } catch (error) {
                console.error('Error:', error);
                typingIndicator.remove();
                addMessage('Sorry, I\'m having trouble connecting right now. Please try again later.', 'bot');
            }
        }

        // Add message to chat
        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            messageDiv.textContent = text;
            chatbotMessages.appendChild(messageDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            return messageDiv;
        }

        // Send message on button click
        if (chatbotSend) {
            chatbotSend.addEventListener('click', sendMessage);
        }

        // Send message on Enter key
        if (chatbotInput) {
            chatbotInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }

    // Set minimum date for booking form to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
}); 