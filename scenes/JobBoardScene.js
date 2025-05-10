export default class JobBoardScene {
  init() {
    console.log("Job Board Scene Loaded");

    this.container = document.createElement("div");
    this.container.classList.add("ui-container");

    const jobs = [
      { title: "Oil Change", level: 1 },
      { title: "Brake Inspection", level: 2 },
      { title: "Coolant Flush", level: 3 }
    ];

    this.container.innerHTML = `<h2>Available Jobs</h2>`;

    const list = document.createElement("ul");
    jobs.forEach(job => {
      const li = document.createElement("li");
      li.textContent = `${job.title} (Level ${job.level})`;
      list.appendChild(li);
    });

    const backBtn = document.createElement("button");
    backBtn.textContent = "Back";
    backBtn.onclick = () => {
      document.body.removeChild(this.container);
      window.sceneManager.loadScene("GameScene");
    };

    this.container.appendChild(list);
    this.container.appendChild(backBtn);
    document.body.appendChild(this.container);
  }

  render(ctx) {
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.fillStyle = "#00aaff";
    ctx.font = "32px sans-serif";
    ctx.fillText("Job Board", 50, 50);
  }
}
