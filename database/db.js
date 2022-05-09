const mongoose = require('mongoose');
const { dbName, pw } = require('./dbCredentials');

const mongoDB = `mongodb+srv://anonLegion:${pw}@cluster0.fqpkg.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(mongoDB, connectionParams)
  .then(() => console.log(`Connected to ${dbName} database`));
  // .catch((err) => console.log(`Error connecting to ${dbName} database:\n${err}`));

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;