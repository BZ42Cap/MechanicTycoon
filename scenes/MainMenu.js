import BusinessSetupScene from "./BusinessSetupScene.js";

export default class MainMenu {
  constructor() {
    this.button = {
      x: 100,
      y: 150,
      width: 250,
      height: 60,
      text: "Start Game"
    };

    window.addEventListener("click", this.handleClick.bind(this));
  }

  init() {
    console.log("Main Menu Loaded");
  }

  render(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.fillStyle = "white";
    ctx.font = "48px sans-serif";
    ctx.fillText("Auto Mechanic Simulator", 100, 100);

    ctx.fillStyle = "#007BFF";
    ctx.fillRect(this.button.x, this.button.y, this.button.width, this.button.height);

    ctx.fillStyle = "white";
    ctx.font = "24px sans-serif";
    ctx.fillText(
      this.button.text,
      this.button.x + 20,
      this.button.y + 38
    );
  }

  handleClick(event) {
    const rect = document.getElementById("gameCanvas").getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const { x: bx, y: by, width, height } = this.button;
    if (x >= bx && x <= bx + width && y >= by && y <= by + height) {
      console.log("Transitioning to Business Setup");
      window.sceneManager.setScene(new BusinessSetupScene());
    }
  }
}
