/**
 * Mocha starts
 * Tell Mongoose to connect to Mongo
 * Wait
 * Mongoose connects to Mongo
 * Connection Successful? Run tests
 * Connection Failed? Show Error
 */

const mongoose = require('mongoose');

/**
 * The default promise library that mongoose uses is deprecated
 * Mongoose asks us to us our own
 * we're gonna use ES6 Promise (other options are bluebird and q)
 */

// global.Promise is a reference to the es6 implementation of promises
mongoose.Promise = global.Promise;

/**
 * We're going to wrap our connection statements with a before call
 * To ensure that mocha only starts after mongoose is connected
 * Otherwise mocha might started before it
 */

// only one time for the entire test suit
before((done) => {
  mongoose.connect('mongodb://localhost/users_test', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  mongoose.connection
    .once('open', () => done())
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

// A hook is a function that gets executed before every test is executed
// dropping a collection takes a certain amount of time
// drop accepts a callback function that it will run once it completes
/**
 * beforeEach
 * Start long running process
 * call done: all complete, run next
 * Tests continue running
 */

beforeEach((done) => {
  const { users, comments, blogPosts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogPosts.drop(() => {
        done();
      });
    });
  });
});
