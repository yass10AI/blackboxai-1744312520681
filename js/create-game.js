document.addEventListener('DOMContentLoaded', function() {
    const createGameForm = document.getElementById('createGameForm'); // Game creation form

    // Game creation form handler
    if (createGameForm) {
        createGameForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const gameTitle = createGameForm.querySelector('input[name="gameTitle"]').value;
            const gameDescription = createGameForm.querySelector('textarea[name="gameDescription"]').value;
            const gameGenre = createGameForm.querySelector('select[name="gameGenre"]').value;
            const difficultyLevel = createGameForm.querySelector('input[name="difficulty"]:checked').value;
            const maxPlayers = createGameForm.querySelector('input[name="maxPlayers"]').value;
            const visibility = createGameForm.querySelector('input[name="visibility"]:checked').value;

            // Simple validation
            if (gameTitle && gameDescription) {
                alert(`Game "${gameTitle}" created successfully!`); // Placeholder for actual game creation logic
                // Logic to save the game can be added here
                window.location.href = 'play.html'; // Redirect to play area
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
});
