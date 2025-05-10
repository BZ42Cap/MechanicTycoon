import SceneManager from "./scenes/SceneManager.js";
import BusinessSetupScene from "./scenes/BusinessSetupScene.js";
import GameScene from "./scenes/GameScene.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.sceneManager = new SceneManager(ctx);
window.sceneManager.addScene("BusinessSetupScene", new BusinessSetupScene());
window.sceneManager.addScene("GameScene", new GameScene());
window.sceneManager.start("BusinessSetupScene");

function gameLoop() {
  window.sceneManager.update();
  window.sceneManager.render();
  requestAnimationFrame(gameLoop);
}

gameLoop();
