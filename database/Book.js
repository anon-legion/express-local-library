const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  author: {
    type: String,
    // type: Schema.Types.ObjectId,
    default: 'Anonymous',
  },
  isBorrowed: {
    type: Boolean,
    enum: [true, false],
    default: false,
  }
})

// first argument is the singular name of the collection
// second argument is the schema to be used in creating the model for the collection
const bookModel = mongoose.model('Book', bookSchema);

module.exports = bookModel;