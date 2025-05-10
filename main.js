import { GameLoop } from './engine/GameLoop.js';
import { SceneManager } from './scenes/SceneManager.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const sceneManager = new SceneManager();
window.sceneManager = sceneManager;

sceneManager.loadScene('MainMenu');

GameLoop.start(canvas, ctx);
