const assert = require('assert');
const User = require('../src/user');

/**
 * Mocha starts
 * Empty database
 * test1
 * Empty database
 * test2
 * Empty database
 */

describe('Creating records', () => {
  it('saves a user', (done) => {
    const joe = new User({ name: 'Joe' });
    assert(joe.isNew);
    joe.save().then(() => {
      // isNew property
      assert(!joe.isNew);
      done();
    });
    // we just check robomongo to make sure it was saved
  });
});
 