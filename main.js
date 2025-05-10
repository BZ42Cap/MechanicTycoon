// ✅ Load saved UI settings
const savedSettings = localStorage.getItem("ui-settings");
if (savedSettings) {
  const settings = JSON.parse(savedSettings);
  const root = document.documentElement;
  if (settings.font) root.style.setProperty("--font-main", `'${settings.font}', sans-serif`);
  if (settings.background) root.style.setProperty("--color-bg", settings.background);
  if (settings.text) root.style.setProperty("--color-text", settings.text);
  if (settings.accent) root.style.setProperty("--color-accent", settings.accent);
}

// ✅ Load saved business info
const savedBusiness = localStorage.getItem("businessData");
if (savedBusiness) {
  try {
    window.businessData = JSON.parse(savedBusiness);
  } catch (e) {
    console.error("Invalid business data in storage", e);
    window.businessData = null;
  }
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

// ✅ Register all scenes
sceneManager.addScene("BusinessSetupScene", new BusinessSetupScene());
sceneManager.addScene("GameScene", new GameScene());
sceneManager.addScene("LedgerScene", new LedgerScene());
sceneManager.addScene("JobBoardScene", new JobBoardScene());
sceneManager.addScene("ScheduleScene", new ScheduleScene());
sceneManager.addScene("SettingsScene", new SettingsScene());

// ✅ Start correct scene based on saved business info
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
