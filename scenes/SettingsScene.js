export default class SettingsScene {
  init() {
    console.log("Settings Scene Loaded");

    this.container = document.createElement("div");
    this.container.classList.add("ui-container");

    this.container.innerHTML = `
      <h2>Settings</h2>
      <label for="font">Font:</label>
      <select id="font">
        <option value="Segoe UI">Segoe UI</option>
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
      </select>

      <label for="background">Background Color:</label>
      <input type="color" id="background" />

      <label for="text">Text Color:</label>
      <input type="color" id="text" />

      <label for="accent">Accent Color:</label>
      <input type="color" id="accent" />

      <br /><br />
      <button id="saveSettings">Save Settings</button>
      <button id="backToGame">Back</button>
      <button id="editBusiness">Edit Business Info</button>
    `;

    document.body.appendChild(this.container);

    const font = document.getElementById("font");
    const background = document.getElementById("background");
    const text = document.getElementById("text");
    const accent = document.getElementById("accent");

    // Load current values from localStorage
    const saved = localStorage.getItem("ui-settings");
    if (saved) {
      const settings = JSON.parse(saved);
      if (settings.font) font.value = settings.font;
      if (settings.background) background.value = settings.background;
      if (settings.text) text.value = settings.text;
      if (settings.accent) accent.value = settings.accent;
    }

    document.getElementById("saveSettings").onclick = () => {
      const settings = {
        font: font.value,
        background: background.value,
        text: text.value,
        accent: accent.value
      };
      localStorage.setItem("ui-settings", JSON.stringify(settings));
      alert("Settings saved. Reload to apply.");
    };

    document.getElementById("backToGame").onclick = () => {
      document.body.removeChild(this.container);
      window.sceneManager.loadScene("GameScene");
    };

    document.getElementById("editBusiness").onclick = () => {
      localStorage.removeItem("businessData");
      window.businessData = null;
      document.body.removeChild(this.container);
      window.sceneManager.loadScene("BusinessSetupScene");
    };
  }

  render(ctx) {
    ctx.fillStyle = "#101010";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.fillStyle = "#00aaff";
    ctx.font = "36px sans-serif";
    ctx.fillText("Settings", 50, 50);
  }
}
