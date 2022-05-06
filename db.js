const mongoose = require('mongoose');
const { dbName, pw } = require('./dbCredentials');

const url = `mongodb+srv://anonLegion:${pw}@cluster0.fqpkg.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(url, connectionParams)
  .then(() => console.log(`Connected to ${dbName} database`))
  .catch((err) => console.log(`Error connecting to ${dbName} database:\n${err}`));
