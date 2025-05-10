import CalendarSystem from "../systems/CalendarSystem.js";

export default class ScheduleScene {
  init() {
    console.log("Schedule Scene Loaded");

    this.container = document.createElement("div");
    this.container.style.position = "absolute";
    this.container.style.top = "50px";
    this.container.style.left = "50px";
    this.container.style.width = "500px";
    this.container.style.backgroundColor = "#1a1a1a";
    this.container.style.color = "white";
    this.container.style.padding = "20px";
    this.container.style.borderRadius = "10px";
    this.container.style.fontFamily = "Arial, sans-serif";
    this.container.style.zIndex = 10;

    this.container.innerHTML = `<h2>Today's Schedule</h2>`;

    const schedule = CalendarSystem.getSchedule();

    if (schedule.length === 0) {
      const noJobs = document.createElement("p");
      noJobs.textContent = "No jobs scheduled today.";
      this.container.appendChild(noJobs);
    } else {
      schedule.forEach(entry => {
        const jobBlock = document.createElement("div");
        jobBlock.style.border = "1px solid #555";
        jobBlock.style.marginBottom = "10px";
        jobBlock.style.padding = "10px";
        jobBlock.style.borderRadius = "6px";

        jobBlock.innerHTML = `
          <strong>Time:</strong> ${entry.time}<br>
          <strong>Customer:</strong> ${entry.customer}<br>
          <strong>Vehicle:</strong> ${entry.vehicle}<br>
          <strong>Issue:</strong> ${entry.issue}
        `;

        this.container.appendChild(jobBlock);
      });
    }

    const backBtn = document.createElement("button");
    backBtn.innerText = "Back to Game";
    backBtn.style.marginTop = "20px";
    backBtn.style.padding = "6px 12px";
    backBtn.onclick = () => {
      document.body.removeChild(this.container);
      window.sceneManager.loadScene("GameScene");
    };

    this.container.appendChild(backBtn);
    document.body.appendChild(this.container);
  }

  render(ctx) {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.fillStyle = "white";
    ctx.font = "32px sans-serif";
    ctx.fillText("Daily Job Calendar", 50, 40);
  }
}
