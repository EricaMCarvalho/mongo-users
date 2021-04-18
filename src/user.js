const mongoose = require('mongoose');
const { Schema } = mongoose;
const PostSchema = require('./postSchema');

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.',
    },
    required: [true, 'Name is required.'],
  },
  posts: [PostSchema],
  likes: {
    type: Number,
    default: 0,
  },
});

// to define a virtual property, we need to use the function keyword
// ... not an arrow function
// get allows us to access joe.postCount
// ... but instead of giving a value for joe.postCount, mongoose + js run the function we define
// and return the result
// we do not need () to run it
// we couldn't use an arrow function or we would lose this
// because what gets called is joe.postCount
// an arrow function would bind the value of this to this file
UserSchema.virtual('postCount').get(function () {
  return this.posts.length;
});

// User does not represent a single user, it represents the entire collection of data
const User = mongoose.model('user', UserSchema);

module.exports = User;

// a virtual type/property/field does not get persisted to the db
// only defined on the server
// usually a derivative of other properties  postCount: {
//   type: Number,
//   default: 0,
// },
