import { expect } from 'chai';
import Currnt from './currnt';
import spy from '../test/spy';

describe('Currnt should pass data to the action function', () => {
  const testData = [1, 2, 3];
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
