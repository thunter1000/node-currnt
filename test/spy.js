const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);

const { spy } = chai;

export default spy;
