const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  imprint: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
    default: 'Available'
  },
  due_back: {
    type: Date,
    default: Date.now
  },
});

// virtual property for book instance's URL
BookInstanceSchema.virtual('url').get(function() {
  return `/catalog/bookinstance/${this._id}`;
})

// virtual property for formatted date of due back 
BookInstanceSchema.virtual('due_back_formatted').get(function() {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('BookInstance', BookInstanceSchema);