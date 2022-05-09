const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  genre: [{
    type: Schema.Types.ObjectId,
    ref: 'Genre',
  }],
});

// virtual property for book's URL
BookSchema.virtual('url').get(function() {
  return `/catalog/book/${this._id}`;
});

// first argument is the singular name of the collection
// second argument is the schema to be used in creating the model for the collection
module.exports = mongoose.model('Book', BookSchema);