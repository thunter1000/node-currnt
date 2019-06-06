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
    let batchedData;
    if (this.batchSize === null) {
      batchedData = [this.data];
    } else {
      batchedData = this.data.reduce(
        (pr, c) => {
          let r = pr;
          if (pr[0].length >= this.batchSize) {
            r = [[], ...pr];
          }
          r = [[c, ...r[0]], ...r.slice(1)];
          return r;
        },
        [[]]
      );
    }

    const process = (bd) => {
      if (bd.length <= 0) return new Promise(r => r([]));

      this.runBatch(bd[0])
        .then((br) => {
          process(bd.slice(1));
        });
      return [];
    };
    process(batchedData);
  }

  runBatch(batch) {
    return Promise.all(batch.map(this.action));
  }
}
