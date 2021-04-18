const User = require('../src/user');
const assert = require('assert');

describe('Updating records...', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save().then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Mary');
        done();
      });
  }

  it('instance using set and save', (done) => {
    // this approach is ideal when we want to update several properties in multiple steps
    joe.set('name', 'Mary');
    assertName(joe.save(), done);
  });

  it('instance update', (done) => {
    assertName(joe.update({ $set: { name: 'Mary' } }), done);
  });

  it('model class can update', (done) => {
    assertName(User.updateOne({ name: 'Joe' }, { name: 'Mary' }), done);
  });

  it('model class can findOneAndUpdate', (done) => {
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Mary' }), done);
  });

  it('model can findByIdAndUpdate', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Mary' }), done);
  });

  // we use operators instead of loading data into the server
  // modifying it and saving it back
  // we should always avoid loading data into the server
  // when we want operations directly in mongo using the fields

  // xit makes the test pending
  it('inc likes by one', (done) => {
    User.updateOne({ name: 'Joe' }, { $inc: { likes: 1 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.likes === 1);
        done();
      });
  });
});
