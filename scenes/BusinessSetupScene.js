export default class BusinessSetupScene {
  constructor() {
    this.form = {
      garageName: '',
      ownerName: '',
      location: '',
      submitted: false
    };

    this.setupUI();
  }

  setupUI() {
    // Create form elements
    this.container = document.createElement('div');
    this.container.style.position = 'absolute';
    this.container.style.top = '100px';
    this.container.style.left = '100px';
    this.container.style.backgroundColor = '#222';
    this.container.style.padding = '20px';
    this.container.style.borderRadius = '10px';
    this.container.style.color = '#fff';

    this.container.innerHTML = `
      <h2>Register Your Garage</h2>
      <label>Garage Name:<br><input id="garageName" /></label><br><br>
      <label>Owner Name:<br><input id="ownerName" /></label><br><br>
      <label>Location:<br><input id="location" /></label><br><br>
      <button id="submitBtn">Start Business</button>
    `;

    document.body.appendChild(this.container);

    document.getElementById('submitBtn').addEventListener('click', () => {
      this.form.garageName = document.getElementById('garageName').value;
      this.form.ownerName = document.getElementById('ownerName').value;
      this.form.location = document.getElementById('location').value;
      this.form.submitted = true;

      console.log("Business Registered:", this.form);

      // Clean up and start game
      document.body.removeChild(this.container);
      window.businessData = {
        ...this.form,
        budget: 10000
      };
      window.sceneManager.loadScene('GameScene');
    });
  }

  init() {
    console.log("Business Setup Scene Loaded");
  }

  render(ctx) {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  }
}
