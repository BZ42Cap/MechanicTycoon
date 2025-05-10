import SceneManager from "./scenes/SceneManager.js";
import BusinessSetupScene from "./scenes/BusinessSetupScene.js";
import GameScene from "./scenes/GameScene.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create and expose scene manager
const sceneManager = new SceneManager(ctx);
window.sceneManager = sceneManager;

// Register scenes before starting
sceneManager.addScene("BusinessSetupScene", new BusinessSetupScene());
sceneManager.addScene("GameScene", new GameScene());

// Start with business setup
sceneManager.start("BusinessSetupScene");

// Game loop
function gameLoop() {
  sceneManager.update();
  sceneManager.render();
  requestAnimationFrame(gameLoop);
}

gameLoop();
