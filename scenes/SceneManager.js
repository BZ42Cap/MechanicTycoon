export class SceneManager {
  constructor() {
    this.currentScene = null;
  }

  async loadScene(name) {
    const module = await import(`./${name}.js`);
    const SceneClass = module.default;
    this.setScene(new SceneClass());
  }

  setScene(scene) {
    this.currentScene = scene;
    if (scene.init) {
      scene.init();
    }
  }

  getScene() {
    return this.currentScene;
  }
}
