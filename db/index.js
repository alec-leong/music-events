require('dotenv').config();
const colors = require('colors');
const mongoose = require('mongoose');

const host = process.env.DB_HOST || '127.0.0.1';
const port = process.env.DB_PORT || 27017;
const db = process.env.DB_NAME || 'events';
const uri = `mongodb://${host}:${port}/events`;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to ${colors.green('MongoDB')}`))
  .catch(console.error);

const db = mongoose.connection;

db.on('error', (err) => console.error(err));

db.once('open', () => {
  console.log(`Using ${db.name.green} database`);
});

module.exports = db;
