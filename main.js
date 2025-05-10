// ✅ Load saved UI + business settings
const uiSaved = localStorage.getItem("ui-settings");
if (uiSaved) {
  const settings = JSON.parse(uiSaved);
  const root = document.documentElement;
  if (settings.font) root.style.setProperty("--font-main", `'${settings.font}', sans-serif`);
  if (settings.background) root.style.setProperty("--color-bg", settings.background);
  if (settings.text) root.style.setProperty("--color-text", settings.text);
  if (settings.accent) root.style.setProperty("--color-accent", settings.accent);
}

const bizSaved = localStorage.getItem("business-data");
if (bizSaved) {
  window.businessData = JSON.parse(bizSaved);
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

// ✅ Start with setup if no saved business, otherwise jump to game
if (window.businessData) {
  sceneManager.start("GameScene");
} else {
  sceneManager.start("BusinessSetupScene");
}

function gameLoop() {
  sceneManager.update();
  sceneManager.render();
  requestAnimationFrame(gameLoop);
}

gameLoop();
