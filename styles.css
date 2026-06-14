document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    const startSound = document.getElementById('start-sound');
    const form = document.querySelector('form');
    const input = document.querySelector('input[name="movie"]');
    const spinner = document.getElementById('spinner');

    // Show main screen when intro is clicked

    introScreen.addEventListener('click', () => {
        startSound.play(); // Play sound
        introScreen.classList.add('hidden'); // Hide intro
        mainContent.classList.remove('hidden'); // Show main app

    });

    // Show loading spinner on form submit if input is valid
    form.addEventListener('submit', (e) => {
        if (!input.value.trim()) {
            e.preventDefault();
            alert("Please enter a movie title.");
        } else {
            spinner.classList.remove('hidden'); // Show spinner
        }
    });
});
