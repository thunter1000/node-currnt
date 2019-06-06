import { expect } from 'chai';
import Currnt from './currnt';
import spy from '../test/spy';

describe('Currnt should pass data to the action function', () => {
  const testData = [...Array(10).keys()];
  let action;

  before(() => {
    action = spy(() => {});
    new Currnt(action, testData).run();
  });

  it(`Action should be called ${testData.length} times (same amount as the given data)`, () => {
    expect(action).to.have.been.called.exactly(testData.length);
  });

  it('Should have been called with the data passed to it', () => {
    testData.forEach((item) => {
      expect(action).to.have.been.called.with(item);
    });
  });
});

describe('Currnt should eventually return the result of processing the data', () => {
  let action;
  const testData = [...Array(10).keys()];
  let results;
  before(async () => {
    action = i => new Promise((resolve) => { resolve(i * 2); });
    results = await new Currnt(action, testData).run();
  });

  it('Should contain the same number of values', () => {
    expect(results.length).to.be.equal(testData.length);
  });

  it('Should return the data after the action modifier has been applied', async () => {
    expect(results).to.be.eql(await Promise.all(testData.map(action)));
  });
});

describe('Currnt should batch actions', () => {
  let action;
  const testData = [...Array(10).keys()];
  const batchSize = 2;
  let waitPromise;
  let waitResolve;

  before(() => {
    waitPromise = new Promise((resolve) => { waitResolve = resolve; });

    action = spy(i => new Promise(async (resolve) => {
      if (i <= batchSize) {
        resolve(i);
      } else {
        await waitPromise;
        resolve(i);
      }
    }));

    new Currnt(action, testData)
      .batch(batchSize)
      .run();
  });

  it('The first batch is processed', async () => {
    await new Promise(r => setTimeout(r, 10));
    expect(action).to.be.called.exactly(2);
  });

  it('Followed by the second batch', async () => {
    waitResolve();
    await new Promise(r => setTimeout(r, 10));
    expect(action).to.be.called.min(batchSize + 1);
  });
});
