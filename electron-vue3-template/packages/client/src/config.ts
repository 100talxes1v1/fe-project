export class GlobalConfig {
  private static _instance: GlobalConfig;

  static get instance() {
    if (!this._instance) {
      this._instance = new GlobalConfig();
    }
    return this._instance;
  }

  private constructor() {}

  public developmentMode = false;
}
