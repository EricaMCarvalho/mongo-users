const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      // mongoose will automatically try to apply the post schema here
      // mongoose will trigger any validation
      posts: [{ title: 'PostTitle' }],
    });

    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      });
  });

  it('can add a subdocuments to an existing record', (done) => {
    const joe = new User({ name: 'Joe', posts: [] });
    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'PostTitle' });
        // will fail without return
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      });
  });

  it('can remove subdocuments', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'PostTitle' }],
    });

    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        // call remove on the post itself
        // user still needs to be saved
        // not the same as joe.remove()
        // because posts is not a collection
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
