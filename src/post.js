const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
});

// we don't create a model because we only create
// models when we want a separate collection in our database
module.exports = PostSchema;
