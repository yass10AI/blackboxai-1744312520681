document.addEventListener('DOMContentLoaded', function() {
    // Game area elements
    const gameArea = document.querySelector('.game-area');
    const startButton = document.querySelector('.game-button.bg-green-500');
    const stopButton = document.querySelector('.game-button.bg-red-500');
    
    // Game state
    let gameActive = false;
    let score = 0;
    let targets = [];
    let gameInterval;
    
    // Initialize game
    function initGame() {
        // Clear game area
        while (gameArea.firstChild) {
            gameArea.removeChild(gameArea.firstChild);
        }
        
        // Create score display
        const scoreDisplay = document.createElement('div');
        scoreDisplay.id = 'score-display';
        scoreDisplay.className = 'absolute top-4 left-4 bg-indigo-600 text-white px-4 py-2 rounded-lg';
        scoreDisplay.textContent = `Score: ${score}`;
        gameArea.appendChild(scoreDisplay);
        
        // Create game controls
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'absolute bottom-4 left-0 right-0 flex justify-center space-x-4';
        
        const startBtn = document.createElement('button');
        startBtn.className = 'bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition';
        startBtn.textContent = 'Start Game';
        startBtn.addEventListener('click', startGame);
        
        const stopBtn = document.createElement('button');
        stopBtn.className = 'bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition';
        stopBtn.textContent = 'Stop Game';
        stopBtn.addEventListener('click', stopGame);
        
        controlsDiv.appendChild(startBtn);
        controlsDiv.appendChild(stopBtn);
        gameArea.appendChild(controlsDiv);
        
        // Add instructions
        const instructions = document.createElement('div');
        instructions.className = 'text-center';
        instructions.innerHTML = `
            <i class="fas fa-gamepad text-6xl text-indigo-400 mb-4"></i>
            <p class="text-gray-500">Click the targets as they appear!</p>
            <p class="text-gray-400 text-sm mt-2">Press Start to begin...</p>
        `;
        gameArea.appendChild(instructions);
    }
    
    // Start the game
    function startGame() {
        if (gameActive) return;
        
        gameActive = true;
        score = 0;
        targets = [];
        
        // Clear game area except score display and controls
        const scoreDisplay = document.getElementById('score-display');
        const controls = gameArea.querySelector('.absolute.bottom-4');
        
        while (gameArea.firstChild) {
            if (gameArea.firstChild !== scoreDisplay && gameArea.firstChild !== controls) {
                gameArea.removeChild(gameArea.firstChild);
            } else {
                break;
            }
        }
        
        // Update score display
        scoreDisplay.textContent = `Score: ${score}`;
        
        // Start spawning targets
        gameInterval = setInterval(spawnTarget, 1500);
        
        // Add game started message to chat
        addMessage("Game started! Good luck!", false, "GameMaster");
    }
    
    // Stop the game
    function stopGame() {
        if (!gameActive) return;
        
        gameActive = false;
        clearInterval(gameInterval);
        
        // Remove all targets
        targets.forEach(target => {
            if (target.element && target.element.parentNode === gameArea) {
                gameArea.removeChild(target.element);
            }
        });
        targets = [];
        
        // Show game over message
        const gameOver = document.createElement('div');
        gameOver.className = 'text-center';
        gameOver.innerHTML = `
            <i class="fas fa-trophy text-6xl text-yellow-500 mb-4"></i>
            <p class="text-gray-800 text-2xl font-bold">Game Over!</p>
            <p class="text-gray-600 mt-2">Your final score: ${score}</p>
            <p class="text-gray-400 text-sm mt-4">Press Start to play again...</p>
        `;
        gameArea.appendChild(gameOver);
        
        // Add game over message to chat
        addMessage(`Game over! Final score: ${score}`, false, "GameMaster");
    }
    
    // Spawn a new target
    function spawnTarget() {
        if (!gameActive) return;
        
        const target = document.createElement('div');
        const size = Math.floor(Math.random() * 30) + 30; // Random size between 30-60px
        
        target.className = 'absolute bg-red-500 rounded-full cursor-pointer transition transform hover:scale-110';
        target.style.width = `${size}px`;
        target.style.height = `${size}px`;
        
        // Random position within game area
        const maxX = gameArea.clientWidth - size;
        const maxY = gameArea.clientHeight - size;
        const posX = Math.floor(Math.random() * maxX);
        const posY = Math.floor(Math.random() * maxY);
        
        target.style.left = `${posX}px`;
        target.style.top = `${posY}px`;
        
        // Add click event
        target.addEventListener('click', function() {
            if (!gameActive) return;
            
            // Increase score
            score += Math.floor(100 / size * 10); // Smaller targets = more points
            document.getElementById('score-display').textContent = `Score: ${score}`;
            
            // Remove target
            gameArea.removeChild(target);
            targets = targets.filter(t => t.element !== target);
            
            // Add hit message to chat occasionally
            if (Math.random() > 0.7) {
                const messages = [
                    "Nice shot!",
                    "Great aim!",
                    "You're on fire!",
                    "Keep it up!",
                    "Impressive!"
                ];
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                addMessage(randomMessage, false, "Player" + Math.floor(Math.random() * 3 + 1));
            }
        });
        
        gameArea.appendChild(target);
        
        // Add to targets array
        targets.push({
            element: target,
            createdAt: Date.now()
        });
        
        // Remove target after 2 seconds
        setTimeout(() => {
            if (gameActive && target.parentNode === gameArea) {
                gameArea.removeChild(target);
                targets = targets.filter(t => t.element !== target);
            }
        }, 2000);
    }
    
    // Function to add a message to the chat
    function addMessage(text, isSent = true, username = 'You') {
        const chatContainer = document.getElementById('chat-container');
        if (!chatContainer) return;
        
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
    
    // Initialize the game when the page loads
    initGame();
    
    // Event listeners for game buttons
    if (startButton) {
        startButton.addEventListener('click', startGame);
    }
    
    if (stopButton) {
        stopButton.addEventListener('click', stopGame);
    }
    
    // Event listeners for main game buttons
    const mainStartButton = document.querySelector('.flex-1.bg-gradient-to-r.from-green-500');
    const joinMultiplayerButton = document.querySelector('.flex-1.bg-gradient-to-r.from-indigo-500');
    
    if (mainStartButton) {
        mainStartButton.addEventListener('click', startGame);
    }
    
    if (joinMultiplayerButton) {
        joinMultiplayerButton.addEventListener('click', function() {
            addMessage("Joining multiplayer game...", true);
            setTimeout(() => {
                addMessage("Welcome to the multiplayer lobby!", false, "GameMaster");
                addMessage("Hi there! Ready to play?", false, "Player1");
            }, 1000);
        });
    }
});
