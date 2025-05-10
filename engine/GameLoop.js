export const GameLoop = {
  start(canvas, ctx) {
    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scene = window.sceneManager.getScene();
      if (scene && scene.render) {
        scene.render(ctx);
      }

      requestAnimationFrame(loop);
    }
    loop();
  }
};
