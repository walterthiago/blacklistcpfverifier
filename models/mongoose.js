const mongoose = require('mongoose');

const mongoHost = process.env['MONGO_HOST'];
const mongoPort = process.env['MONGO_PORT'];
const mongoDatabase = process.env['MONGO_DATABASE'];
const mongoUser = process.env['MONGO_USERNAME'];
const mongoPassword = process.env['MONGO_PASSWORD'];

const mongoUri = `mongodb://${mongoHost}:${mongoPort}/${mongoDatabase}`;

const mongoOpts = {
  user: mongoUser,
  pass: mongoPassword
};

console.log(`trying to connect at ${mongoUri} with credentials ${mongoOpts} ...`)

mongoose.connect(mongoUri, mongoOpts);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongo connected successfully')
});

module.exports = exports = mongoose;