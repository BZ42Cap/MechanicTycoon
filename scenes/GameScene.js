export default class GameScene {
  init() {
    console.log("Game Scene Loaded");

    this.message = "Mechanic Tycoon is running!";
  }

  handleKey(e) {
    // Future keybinds go here
  }

  render(ctx) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Background
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, width, height);

    // Text
    ctx.fillStyle = "#00aaff";
    ctx.font = "36px Arial";
    ctx.fillText(this.message, 100, 200);

    ctx.fillStyle = "#ffffff";
    ctx.font = "18px Arial";
    ctx.fillText("If you can see this, the game is working!", 100, 240);
  }
}
