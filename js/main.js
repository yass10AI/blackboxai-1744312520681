document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const chatContainer = document.getElementById('chat-container');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const onlineCount = document.getElementById('online-count');

    // Login form handler
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = loginForm.username.value;
            const password = loginForm.password.value;

            // Simple validation
            if (username && password) {
                alert('Login successful!'); // Placeholder for actual login logic
                window.location.href = 'play.html'; // Redirect to play area
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Signup form handler
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = signupForm.username.value;
            const email = signupForm.email.value;
            const password = signupForm.password.value;

            // Simple validation
            if (username && password) {
                alert('Sign up successful! Redirecting to play area...'); // Placeholder for actual signup logic
                window.location.href = 'play.html'; // Redirect to play area
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Chat functionality
    if (chatContainer && messageInput && sendButton) {
        // Function to add a message to the chat
        function addMessage(text, isSent = true, username = 'You') {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isSent ? 'message-sent' : 'message-received'}`;
            
            const usernameDiv = document.createElement('div');
            usernameDiv.className = isSent ? 'text-xs text-gray-300 mb-1' : 'text-xs text-gray-500 mb-1';
            usernameDiv.textContent = username;
            
            messageDiv.appendChild(usernameDiv);
            messageDiv.appendChild(document.createTextNode(text));
            
            chatContainer.appendChild(messageDiv);
            
            // Scroll to the bottom of the chat container
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        // Function to handle sending a message
        function sendMessage() {
            const messageText = messageInput.value.trim();
            if (messageText) {
                // Add the user's message to the chat
                addMessage(messageText, true);
                
                // Clear the input field
                messageInput.value = '';
                
                // Simulate a response after a short delay
                simulateResponse(messageText);
            }
        }

        // Function to simulate responses from other players
        function simulateResponse(userMessage) {
            const playerNames = ['Player1', 'Player2', 'Player3', 'GameMaster'];
            const responses = [
                "That's a great point!",
                "I agree with you.",
                "Let's focus on the game now.",
                "Anyone want to team up?",
                "Good luck everyone!",
                "Nice move!",
                "I'm having fun, how about you?",
                "Let's play another round after this.",
                "Who's winning so far?",
                "This game is awesome!"
            ];
            
            // Randomly decide if we should respond
            if (Math.random() > 0.3) {
                setTimeout(() => {
                    // Randomly select a player name and response
                    const randomPlayer = playerNames[Math.floor(Math.random() * playerNames.length)];
                    let randomResponse;
                    
                    // Sometimes respond directly to the user's message
                    if (Math.random() > 0.7 && userMessage.length > 5) {
                        if (userMessage.endsWith('?')) {
                            randomResponse = ["Yes, definitely!", "No, I don't think so.", "Maybe, let's see.", "I'm not sure about that."][Math.floor(Math.random() * 4)];
                        } else {
                            randomResponse = responses[Math.floor(Math.random() * responses.length)];
                        }
                    } else {
                        randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    }
                    
                    // Add the simulated response to the chat
                    addMessage(randomResponse, false, randomPlayer);
                    
                    // Randomly update online count
                    if (Math.random() > 0.8 && onlineCount) {
                        const currentCount = parseInt(onlineCount.textContent);
                        const newCount = Math.max(2, currentCount + (Math.random() > 0.5 ? 1 : -1));
                        onlineCount.textContent = newCount;
                    }
                }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
            }
        }

        // Event listener for send button
        sendButton.addEventListener('click', sendMessage);

        // Event listener for Enter key in the input field
        messageInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                sendMessage();
            }
        });

        // Focus the input field when the page loads
        messageInput.focus();
    }
});
