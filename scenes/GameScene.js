export default class GameScene {
    init() {
        console.log("Game Scene Initialized");
        // Initialize game elements here
    }

    render(ctx) {
        ctx.fillStyle = "#333";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.fillStyle = "#FFF";
        ctx.font = "36px sans-serif";
        ctx.fillText("Welcome to the Game!", 50, 60);
    }
}
