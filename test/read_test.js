/** FINDING RECORDS
 * Find user with a name of 'Joe'
 * Find a particular user with this given id
 */

const assert = require('assert');
const User = require('../src/user');

describe('Reading records', () => {
  let joe;

  beforeEach((done) => {
    // we declare joe outside so it exists out of this block
    joe = new User({ name: 'Joe' });
    joe.save().then(() => done());
  });

  it('finds users with name of joe', (done) => {
    User.find({ name: 'Joe' }).then((users) => {
      // _id is an ObjectId
      assert.deepStrictEqual(users[0]._id, joe._id);
      // alternative
      assert(users[0]._id.toString() === joe._id.toString());
      assert(users[0].name === joe.name);
      done();
    });
  });

  it('finds user with id of joe', (done) => {
    User.findOne({ _id: joe._id }).then((user) => {
      assert(user.name === 'Joe');
      done();
    });
  });
});
 