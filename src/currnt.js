/**
 * @template T,S
 */
export default class Currnt {
  /**
   * @param {(data: T) => Promise<S>} action The function which processes the data
   * @param {T[]} data The data passed to the action function.
   */
  constructor(action, data) {
    this.action = action;
    this.data = data;
  }

  /**
   * @returns {Promise<S[]>}
   */
  run() {
    return Promise.all(this.data.map(this.action));
  }
}
