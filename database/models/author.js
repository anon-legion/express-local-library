const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: {type: String, required: [true, 'First name is required'], maxLength: 100},
  family_name: {type: String, required: [true, 'Family name is required'], maxLength: 100},
  date_of_birth: {type: Date},
  date_of_death: {type: Date},
});

// virtual property of author's full name
AuthorSchema.virtual('name').get(function() {
  // returns an empty string for cases where the author does not have a family name or first name
  let fullname = '';
  if (this.first_name && this.family_name) fullname = `${this.family_name}, ${this.first_name}`;

  return fullname;
});

// virtual property of author's lifespan
AuthorSchema.virtual('lifespan').get(function() {
  let lifetime_string = '';
  if (this.date_of_birth) lifetime_string = this.date_of_birth.getYear().toString();
  lifetime_string += ' - ';
  if (this.date_of_death) lifetime_string += this.date_of_death.getYear().toString();

  return lifetime_string;
})
 
// virtual property for author's URL
AuthorSchema.virtual('url').get(function() {
  return `/catalog/author/${this._id}`;
})

// first argument is the singular name of the collection
// second argument is the schema to be used in creating the model for the collection
module.exports = mongoose.model('Author', AuthorSchema);