import { expect } from 'chai';

describe('This is a test', () => {
  it('should pass', () => {
    expect('foo').to.be.a('string');
  });
  it('should fail', () => {
    expect('foo').to.be.equal('bar');
  });
});
