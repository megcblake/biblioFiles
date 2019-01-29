const request = require('request');
const config = require('./../config.js');

const searchBooks = (title, author, callback) => {
  const options = {
    url: `https://www.googleapis.com/books/v1/volumes?q=intitle:"${title}"+inauthor:"${author}"&printType=books&maxResults=1&key=${config.GOOGLE_API_TOKEN}`,
    headers: {
      'User-Agent': 'request',
    },
  };
  request(options, callback);
};

const getBooksByVolume = (id, callback) => {
  const options = {
    url: `https://www.googleapis.com/books/v1/volumes/${id}?key=${config.GOOGLE_API_TOKEN}`,
    headers: {
      'User-Agent': 'request',
    },
  };
  request(options, callback);
};

module.exports = {
  searchBooks,
  getBooksByVolume,
};
