// ✅ Apply saved UI settings before anything else
const saved = localStorage.getItem("ui-settings");
if (saved) {
  const settings = JSON.parse(saved);
  const root = document.documentElement;
  if (settings.font) root.style.setProperty("--font-main", `'${settings.font}', sans-serif`);
  if (settings.background) root.style.setProperty("--color-bg", settings.background);
  if (settings.text) root.style.setProperty("--color-text", settings.text);
  if (settings.accent) root.style.setProperty("--color-accent", settings.accent);
}

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
