const User = require('../src/user');
const assert = require('assert');

describe('Deleting records...', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save().then(() => done());
  });

  it('model instance remove', (done) => {
    joe.remove().then(() =>
      User.findOne({ name: 'Joe' }).then((user) => {
        assert(user === null);
        done();
      })
    );
  });

  it('class method remove', (done) => {
    User.deleteOne({ name: 'Joe' })
      .then(() => User.findById(joe._id))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findOneAndRemove', (done) => {
    User.findOneAndDelete({ name: 'Joe' })
      .then(() => User.findOne({ _id: joe._id }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndDelete(joe._id)
      .then(() => User.findById(joe._id))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});
