const async = require('async');
const { body, validationResult } = require('express-validator');
const Author = require('../database/models/author');
const Book = require('../database/models/book');

// display list of all authors
exports.author_list = function (req, res) {
  Author.find()
    .sort({ family_name: 1 })
    .exec((err, list_authors) => {
      if (err) return next(err);
      res.render('author_list', { title: 'Author List', author_list: list_authors });
    })
};

// display detail page for a specific author
exports.author_detail = function (req, res, next) {
  async.parallel(
    {
      author: function (callback) {
        Author.findById(req.params.id)
          .exec(callback)
      },
      authors_books: function (callback) {
        Book.find({ 'author': req.params.id }, 'title summary')
          .exec(callback)
      },
    },
    function (err, results) {
      if (err) return next(err); // Error in API usage.
      if (results.author == null) { // No results.
        var err = new Error('Author not found');
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render('author_detail', {
        title: 'Author Detail',
        author: results.author,
        author_books: results.authors_books
      });
    }
  );
};

// display author create form on GET
exports.author_create_get = function (req, res, next) {
  res.render('author_form', { title: 'Create Author' });
};

// Handle Author create on POST.
exports.author_create_post = [
  // Validate and sanitize fields.
  body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
    .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
  body('family_name').trim().isLength({ min: 1 }).escape().withMessage('Family name must be specified.')
    .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
  body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),
  body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() });
      return;
    } else {
      // Data from form is valid.
      // Create an Author object with escaped and trimmed data.
      var author = new Author({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death
      });

      author.save(function (err) {
        if (err) return next(err);
        // Successful - redirect to new author record.
        res.redirect(author.url);
      });
    }
  }
];


// display author delete form on GET
exports.author_delete_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Author delete GET');
};

// handle author delete on POST
exports.author_delete_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Author delete POST');
};

// display author update form on GET
exports.author_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Author update GET');
}

// handle author update on POST
exports.author_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Author update POST');
}
