import Finances from "../business/Finances.js";
import LevelSystem from "../player/LevelSystem.js";
import CalendarSystem from "../systems/CalendarSystem.js";
import TimeSystem from "../systems/TimeSystem.js";
import ExpenseSystem from "../systems/ExpenseSystem.js";
import InvoiceSystem from "../systems/InvoiceSystem.js";

export default class GameScene {
  init() {
    console.log("Game Scene Loaded");

    this.business = window.businessData || {
      garageName: "Unnamed",
      ownerName: "Unknown",
      location: "Unknown"
    };

    Finances.init();
    LevelSystem.init();
    CalendarSystem.init();
    TimeSystem.init();
    ExpenseSystem.init();
    InvoiceSystem.init();

    window.finances = Finances;

    if (!this._keyBound) {
      document.addEventListener("keydown", this.handleKey.bind(this));
      this._keyBound = true;
    }
  }

  handleKey(e) {
    const key = e.key.toLowerCase();
    console.log(`Key pressed: ${key}`);

    switch (key) {
      case "p":
        Finances.paySelf(500);
        console.log("You paid yourself $500");
        break;
      case "l":
        window.sceneManager.loadScene("LedgerScene");
        break;
      case "x":
        LevelSystem.addXP(50);
        break;
      case "j":
        window.sceneManager.loadScene("JobBoardScene");
        break;
      case "c":
        window.sceneManager.loadScene("ScheduleScene");
        break;
      case "s":
        window.sceneManager.loadScene("SettingsScene");
        break;
    }
  }

  render(ctx) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // ✅ Use CSS variable for background color
    const bgColor = getComputedStyle(document.documentElement).getPropertyValue("--color-bg") || "#0e0e0e";
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // HUD panel
    ctx.fillStyle = "rgba(20, 20, 20, 0.85)";
    ctx.fillRect(10, 10, width - 20, 120);

    ctx.fillStyle = "#ffffff";
    ctx.font = "18px var(--font-main)";

    ctx.fillText(
      `${this.business.garageName} | Owner: ${this.business.ownerName} | Location: ${this.business.location}`,
      30,
      35
    );

    ctx.fillText(
      `Budget: $${Finances.balance.toLocaleString()} | Profit: $${Finances.profit.toLocaleString()}`,
      30,
      60
    );

    ctx.fillText(
      `Level: ${LevelSystem.level} | XP: ${LevelSystem.xp}/${LevelSystem.xpToNext}`,
      30,
      85
    );

    ctx.fillText(
      `Time: ${TimeSystem.getDayTimeLabel()}`,
      30,
      110
    );

    ctx.fillStyle = "lime";
    ctx.font = "48px var(--font-main)";
    ctx.fillText("Game Started", 100, 180);

    ctx.font = "16px var(--font-main)";
    ctx.fillStyle = "gray";
    ctx.fillText("P: Pay | L: Ledger | X: XP | J: Job Board | C: Calendar | S: Settings", 100, 220);

    // Scheduled jobs
    const jobs = CalendarSystem.getSchedule();
    ctx.font = "16px var(--font-main)";
    ctx.fillStyle = "#aaa";

    jobs.forEach((entry, i) => {
      ctx.fillText(
        `${entry.time} - ${entry.customer} (${entry.vehicle})`,
        100,
        260 + i * 20
      );
    });
  }
}
