export default class SettingsScene {
  init() {
    console.log("Settings Scene Loaded");

    // Create container
    this.container = document.createElement("div");
    this.container.classList.add("ui-container");

    this.container.innerHTML = `<h2>Interface Settings</h2>`;

    // Load existing values or fall back to defaults
    const current = {
      font: getComputedStyle(document.documentElement).getPropertyValue("--font-main").trim(),
      background: getComputedStyle(document.documentElement).getPropertyValue("--color-bg").trim(),
      accent: getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim(),
      text: getComputedStyle(document.documentElement).getPropertyValue("--color-text").trim()
    };

    // Font selector
    const fontLabel = document.createElement("label");
    fontLabel.innerText = "Font Family:";

    const fontSelect = document.createElement("select");
    const fonts = [
      "Segoe UI",
      "Arial",
      "Courier New",
      "Georgia",
      "Tahoma",
      "Verdana",
      "Roboto",
      "Open Sans"
    ];

    fonts.forEach(font => {
      const opt = document.createElement("option");
      opt.value = font;
      opt.textContent = font;
      if (current.font.includes(font)) opt.selected = true;
      fontSelect.appendChild(opt);
    });

    // Color inputs
    const bgInput = this.createColorInput("Background Color", current.background);
    const textInput = this.createColorInput("Text Color", current.text);
    const accentInput = this.createColorInput("Accent Color", current.accent);

    // Save button
    const saveBtn = document.createElement("button");
    saveBtn.innerText = "Save Settings";
    saveBtn.onclick = () => {
      const selectedFont = fontSelect.value;
      const bg = bgInput.querySelector("input").value;
      const txt = textInput.querySelector("input").value;
      const acc = accentInput.querySelector("input").value;

      document.documentElement.style.setProperty("--font-main", `'${selectedFont}', sans-serif`);
      document.documentElement.style.setProperty("--color-bg", bg);
      document.documentElement.style.setProperty("--color-text", txt);
      document.documentElement.style.setProperty("--color-accent", acc);

      localStorage.setItem("ui-settings", JSON.stringify({
        font: selectedFont,
        background: bg,
        text: txt,
        accent: acc
      }));

      alert("Settings saved!");
    };

    // Back button
    const backBtn = document.createElement("button");
    backBtn.innerText = "Back";
    backBtn.style.marginLeft = "10px";
    backBtn.onclick = () => {
      document.body.removeChild(this.container);
      window.sceneManager.loadScene("GameScene");
    };

    // Append all
    this.container.appendChild(fontLabel);
    this.container.appendChild(fontSelect);
    this.container.appendChild(bgInput);
    this.container.appendChild(textInput);
    this.container.appendChild(accentInput);
    this.container.appendChild(saveBtn);
    this.container.appendChild(backBtn);
    document.body.appendChild(this.container);
  }

  createColorInput(labelText, currentValue) {
    const wrapper = document.createElement("div");
    wrapper.style.margin = "12px 0";

    const label = document.createElement("label");
    label.innerText = labelText;

    const input = document.createElement("input");
    input.type = "color";
    input.value = currentValue;

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    return wrapper;
  }

  render(ctx) {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.fillStyle = "white";
    ctx.font = "32px sans-serif";
    ctx.fillText("Interface Settings", 50, 40);
  }
}
