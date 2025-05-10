import LevelSystem from "../player/LevelSystem.js";
import CalendarSystem from "../systems/CalendarSystem.js";

// Mock data
const makes = ["Toyota", "Ford", "Honda", "Chevrolet", "Nissan", "BMW", "Kia", "Subaru"];
const models = ["Camry", "F-150", "Civic", "Impala", "Altima", "X3", "Soul", "Outback"];
const firstNames = ["Alex", "Jordan", "Taylor", "Sam", "Jamie", "Morgan", "Casey", "Riley"];
const lastNames = ["Smith", "Johnson", "Davis", "Lee", "Brown", "Garcia", "Wilson", "Clark"];
const issues = [
  { description: "Squealing brakes", tier: 1 },
  { description: "Check engine light", tier: 2 },
  { description: "AC blows warm", tier: 1 },
  { description: "Stalls at idle", tier: 2 },
  { description: "Battery dies overnight", tier: 1 },
  { description: "Shakes at speed", tier: 3 },
  { description: "Transmission slipping", tier: 3 },
];

// Generate a job
function generateJob() {
  const tieredIssues = issues.filter(issue => LevelSystem.canAccessJob(issue.tier));
  if (tieredIssues.length === 0) return null;

  const issue = tieredIssues[Math.floor(Math.random() * tieredIssues.length)];
  const make = makes[Math.floor(Math.random() * makes.length)];
  const model = models[Math.floor(Math.random() * models.length)];
  const year = 2000 + Math.floor(Math.random() * 26);
  const customer = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;

  return {
    customer,
    vehicle: `${year} ${make} ${model}`,
    issue: issue.description,
    tier: issue.tier,
    duration: 1 + Math.floor(Math.random() * 4) // 1 to 4 hours
  };
}

export default class JobBoardScene {
  init() {
    console.log("Job Board Loaded");

    this.jobs = [];
    for (let i = 0; i < 5; i++) {
      const job = generateJob();
      if (job) this.jobs.push(job);
    }

    this.container = document.createElement("div");
    this.container.style.position = "absolute";
    this.container.style.top = "50px";
    this.container.style.left = "50px";
    this.container.style.width = "600px";
    this.container.style.backgroundColor = "#1a1a1a";
    this.container.style.color = "white";
    this.container.style.padding = "20px";
    this.container.style.borderRadius = "10px";
    this.container.style.fontFamily = "Arial, sans-serif";
    this.container.style.zIndex = 10;
    this.container.innerHTML = `<h2>Available Jobs</h2>`;

    this.jobs.forEach((job, index) => {
      const jobCard = document.createElement("div");
      jobCard.style.border = "1px solid #555";
      jobCard.style.marginBottom = "10px";
      jobCard.style.padding = "10px";
      jobCard.style.borderRadius = "6px";

      jobCard.innerHTML = `
        <strong>Customer:</strong> ${job.customer}<br>
        <strong>Vehicle:</strong> ${job.vehicle}<br>
        <strong>Issue:</strong> ${job.issue}<br>
        <strong>Job Tier:</strong> ${job.tier}<br>
        <strong>Estimated Time:</strong> ${job.duration} hour(s)<br><br>
      `;

      const scheduleBtn = document.createElement("button");
      scheduleBtn.innerText = "Schedule Job";
      scheduleBtn.style.padding = "6px 12px";
      scheduleBtn.style.marginRight = "10px";
      scheduleBtn.onclick = () => {
        const success = CalendarSystem.scheduleJob(job);
        if (success) {
          alert(`Scheduled job for ${job.customer}`);
          document.body.removeChild(this.container);
          window.sceneManager.loadScene("GameScene");
        } else {
          alert("No available slot for this job.");
        }
      };

      jobCard.appendChild(scheduleBtn);
      this.container.appendChild(jobCard);
    });

    const closeBtn = document.createElement("button");
    closeBtn.innerText = "Back";
    closeBtn.style.marginTop = "10px";
    closeBtn.style.padding = "6px 12px";
    closeBtn.onclick = () => {
      document.body.removeChild(this.container);
      window.sceneManager.loadScene("GameScene");
    };

    this.container.appendChild(closeBtn);
    document.body.appendChild(this.container);
  }

  render(ctx) {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.fillStyle = "white";
    ctx.font = "32px sans-serif";
    ctx.fillText("Job Board", 50, 40);
  }
}
