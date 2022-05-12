const mongoose = require('mongoose');
const { DateTime } = require('luxon');

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

// virtual property for formatted date of birth
AuthorSchema.virtual('date_of_birth_formatted').get(function() {
  return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
});

// virtual property for formatted date of death
AuthorSchema.virtual('date_of_death_formatted').get(function() {
  return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
});

// first argument is the singular name of the collection
// second argument is the schema to be used in creating the model for the collection
module.exports = mongoose.model('Author', AuthorSchema);