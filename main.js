import SceneManager from "./scenes/SceneManager.js";
import MainMenu from "./scenes/MainMenu.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.sceneManager = new SceneManager(ctx);
window.sceneManager.addScene("MainMenu", new MainMenu());
window.sceneManager.start("MainMenu");

function gameLoop() {
  window.sceneManager.update();
  window.sceneManager.render();
  requestAnimationFrame(gameLoop);
}

gameLoop();
