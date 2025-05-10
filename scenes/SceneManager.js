class SceneManager {
  constructor(ctx) {
    this.ctx = ctx;
    this.scenes = {};
    this.current = null;
  }

  addScene(name, scene) {
    this.scenes[name] = scene;
  }

  start(name) {
    this.current = this.scenes[name];
    if (this.current?.init) {
      this.current.init();
    }
  }

  update() {
    // Optional update logic
  }

  render() {
    if (this.current?.render) {
      this.current.render(this.ctx);
    }
  }

  loadScene(name) {
    if (this.scenes[name]) {
      this.start(name);
    }
  }
}

export default SceneManager;
