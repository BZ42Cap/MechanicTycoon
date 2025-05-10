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

    document.addEventListener("keydown", this.handleKey.bind(this));
  }

  handleKey(e) {
    const key = e.key.toLowerCase();

    if (key === "l") {
      window.sceneManager.loadScene("LedgerScene");
    }

    if (key === "p") {
      Finances.paySelf(500);
      console.log("You paid yourself $500");
    }

    if (key === "x") {
      LevelSystem.addXP(50);
    }

    if (key === "j") {
      window.sceneManager.loadScene("JobBoardScene");
    }

    if (key === "c") {
      window.sceneManager.loadScene("ScheduleScene");
    }

    if (key === "s") {
      window.sceneManager.loadScene("SettingsScene");
    }
  }

  render(ctx) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Background
    ctx.fillStyle = "#0e0e0e";
    ctx.fillRect(0, 0, width, height);

    // HUD Panel
    ctx.fillStyle = "rgba(20, 20, 20, 0.85)";
    ctx.fillRect(10, 10, width - 20, 120);

    // HUD Text
    ctx.fillStyle = "#ffffff";
    ctx.font = "18px sans-serif";

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

    // Game Title Display
    ctx.fillStyle = "lime";
    ctx.font = "48px sans-serif";
    ctx.fillText("Game Started", 100, 180);

    ctx.font = "16px sans-serif";
    ctx.fillStyle = "gray";
    ctx.fillText("P: Pay | L: Ledger | X: XP | J: Job Board | C: Calendar | S: Settings", 100, 220);

    // Scheduled Jobs Preview
    const jobs = CalendarSystem.getSchedule();
    ctx.font = "16px sans-serif";
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
