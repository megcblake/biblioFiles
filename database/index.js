const mongoose = require('mongoose');
const { Biblio } = require('./schema.js');

mongoose.connect('mongodb://localhost/bibliodb');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Mongo successfully connected');
});

const getBooks = (callback) => {
  Biblio.find({}, callback);
};

const inputBooks = (book, callback) => {
  Biblio.create(book, callback);
};

const changeStatus = (id, status, callback) => {
  Biblio.findByIdAndUpdate(id, { read: status }, callback);
};

const removeBook = (id, callback) => {
  Biblio.findOneAndDelete({ _id: id }, callback);
};

module.exports = {
  getBooks,
  inputBooks,
  changeStatus,
  removeBook,
};
