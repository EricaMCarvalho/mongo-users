const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined });
    // we would use the async version of validate if we needed to reach out to the database
    // or do any ohter async operation
    // like checking something in the database
    // e.g. comparing users in a database
    // but here validateSync makes sense because we want to act instantly on what's returned
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name is required.');
  });

  it('requires name to be longer than 2 characters', () => {
    const user = new User({ name: 'Al' });
    // the function won't do any async request
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name must be longer than 2 characters.');
  });

  it('disallows invalid records from being saved', (done) => {
    const user = new User({ name: 'Al' });
    user.save().catch((validationResult) => {
      const { message } = validationResult.errors.name;
      assert(message === 'Name must be longer than 2 characters.');
      done();
    });
  });
});
