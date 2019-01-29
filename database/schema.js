const mongoose = require('mongoose');

const BiblioSchema = new mongoose.Schema({
  _id: String,
  title: String,
  author: String,
  publishedDate: String,
  description: String,
  pageCount: Number,
  genres: String,
  averageRating: Number,
  maturityRating: String,
  image: String,
  read: Boolean,
});

const Biblio = mongoose.model('Biblio', BiblioSchema);

module.exports.Biblio = Biblio;
