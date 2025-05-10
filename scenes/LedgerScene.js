import Finances from "../business/Finances.js";

export default class LedgerScene {
  init() {
    console.log("Ledger Scene Loaded");

    this.container = document.createElement("div");
    this.container.style.position = "absolute";
    this.container.style.top = "50px";
    this.container.style.left = "50px";
    this.container.style.width = "600px";
    this.container.style.maxHeight = "80vh";
    this.container.style.overflowY = "auto";
    this.container.style.background = "#1c1c1c";
    this.container.style.color = "#fff";
    this.container.style.padding = "20px";
    this.container.style.borderRadius = "8px";
    this.container.style.fontFamily = "Arial, sans-serif";
    this.container.style.zIndex = 10;

    const closeBtn = document.createElement("button");
    closeBtn.innerText = "Close Ledger";
    closeBtn.style.marginBottom = "20px";
    closeBtn.style.padding = "8px 16px";
    closeBtn.style.cursor = "pointer";
    closeBtn.onclick = () => {
      document.body.removeChild(this.container);
      window.sceneManager.loadScene("GameScene");
    };

    this.container.appendChild(closeBtn);

    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    const headerRow = `
      <tr>
        <th style="text-align:left; padding: 8px;">Date</th>
        <th style="text-align:left; padding: 8px;">Description</th>
        <th style="text-align:right; padding: 8px;">Amount</th>
      </tr>
    `;
    table.innerHTML += headerRow;

    const addRow = (entry, type) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td style="padding: 8px;">${entry.date}</td>
        <td style="padding: 8px;">${entry.description}</td>
        <td style="padding: 8px; text-align:right; color:${type === "income" ? "lime" : "tomato"};">
          ${type === "income" ? "+" : "-"}$${entry.amount.toFixed(2)}
        </td>
      `;
      table.appendChild(row);
    };

    Finances.incomeLog.forEach(entry => addRow(entry, "income"));
    Finances.expenseLog.forEach(entry => addRow(entry, "expense"));

    this.container.appendChild(table);
    document.body.appendChild(this.container);
  }

  render(ctx) {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.fillStyle = "white";
    ctx.font = "32px sans-serif";
    ctx.fillText("Transaction Ledger", 50, 40);
  }
}
