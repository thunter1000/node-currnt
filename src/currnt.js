/* eslint-disable comma-dangle */
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
    this.batchSize = null;
  }

  /**
   * @param {number} size
   */
  batch(size) {
    this.batchSize = size;
    return this;
  }

  /**
   * @returns {Promise<S[]>}
   */
  async run() {
    // Start initial promises.
    const toProcess = this.data.slice(0);

    const next = () => {
      if (toProcess.length <= 0) {
        return; // all done
      }
      const c = toProcess.shift();
      this.action(c).then(next);
    };

    for (let i = 0; i < (this.batchSize || this.data.length); i += 1) {
      next();
    }

    return [];
  }

  runBatch(batch) {
    return Promise.all(batch.map(this.action));
  }
}
