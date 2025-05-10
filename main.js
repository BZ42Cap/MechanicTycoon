import SceneManager from "./scenes/SceneManager.js";
import BusinessSetupScene from "./scenes/BusinessSetupScene.js";
import GameScene from "./scenes/GameScene.js";
import LedgerScene from "./scenes/LedgerScene.js";
import JobBoardScene from "./scenes/JobBoardScene.js";
import ScheduleScene from "./scenes/ScheduleScene.js";
import SettingsScene from "./scenes/SettingsScene.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const sceneManager = new SceneManager(ctx);
window.sceneManager = sceneManager;

// Register all scenes BEFORE starting
sceneManager.addScene("BusinessSetupScene", new BusinessSetupScene());
sceneManager.addScene("GameScene", new GameScene());
sceneManager.addScene("LedgerScene", new LedgerScene());
sceneManager.addScene("JobBoardScene", new JobBoardScene());
sceneManager.addScene("ScheduleScene", new ScheduleScene());
sceneManager.addScene("SettingsScene", new SettingsScene());

sceneManager.start("BusinessSetupScene");

function gameLoop() {
  sceneManager.update();
  sceneManager.render();
  requestAnimationFrame(gameLoop);
}

gameLoop();
