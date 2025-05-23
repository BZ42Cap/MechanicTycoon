export default class BusinessSetupScene {
    init() {
        console.log("Business Setup Scene Initialized");

        this.container = document.createElement("div");
        this.container.classList.add("ui-container");

        this.container.innerHTML = `
            <h2>Start Your Auto Repair Business</h2>
            <label>Garage Name:</label>
            <input type="text" id="garageName" placeholder="e.g. Apex Auto Repair" />
            <label>Owner Name:</label>
            <input type="text" id="ownerName" placeholder="e.g. Jay Myers" />
            <label>Location:</label>
            <input type="text" id="location" placeholder="e.g. Charlotte, NC" />
            <br /><br />
            <button id="startGame">Start Game</button>
        `;
        document.getElementById("game-container").appendChild(this.container);

        document.getElementById("startGame").onclick = () => {
            const garageName = document.getElementById("garageName").value.trim();
            const ownerName = document.getElementById("ownerName").value.trim();
            const location = document.getElementById("location").value.trim();

            if (!garageName || !ownerName || !location) {
                alert("Please fill out all fields.");
                return;
            }

            const data = { garageName, ownerName, location };
            try {
                localStorage.setItem("businessData", JSON.stringify(data));
                window.businessData = data;
            } catch (err) {
                console.error("Failed to save business data:", err);
            }

            document.body.removeChild(this.container);
            window.sceneManager.loadScene("GameScene");
        };
    }

    render(ctx) {
        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        ctx.fillStyle = "#00aaff";
        ctx.font = "36px sans-serif";
        ctx.fillText("Mechanic Tycoon", 50, 60);
    }
}
