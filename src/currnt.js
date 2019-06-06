export default class Currnt {
  /**
   * @param {Function} action The function which processes the data
   * @param {[]} data The data passed to the action function.
   */
  constructor(action, data) {
    this.action = action;
    this.data = data;
  }

  run() {
    this.data.map(item => this.action(item));
  }
}
