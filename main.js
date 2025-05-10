// Initialize the canvas and scene manager
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.getElementById('game-container').appendChild(canvas);

// Initialize scene manager
const sceneManager = new SceneManager(ctx);

// Start the first scene when the page loads
window.onload = () => {
    sceneManager.loadScene('BusinessSetupScene');
};
