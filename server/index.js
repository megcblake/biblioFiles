const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const helpers = require('./../helpers/getBooks.js');
const db = require('../database/index');

const app = express();
const port = 3000;

app.use(bodyParser());

app.use(morgan('tiny'));

app.use('/', express.static(path.join(__dirname, './../client/dist')));

app.get('/api/books', (req, res) => {
  db.getBooks((err, response) => {
    if (err) {
      throw err;
    } else {
      res.send(response);
    }
  });
});

app.post('/api/book', (req, res) => {
  const title = req.body.title.split(' ').join('+');
  const author = req.body.author.split(' ').join('+');
  helpers.searchBooks(title, author, (error, response) => {
    if (error) {
      throw error;
    } else {
      const info = response.body;
      const specs = JSON.parse(info);
      const book = specs.items[0];
      const id = book.id;
      helpers.getBooksByVolume(id, (err, resp) => {
        if (err) {
          throw err;
        } else {
        //   res.send(resp.body);
          const rData = resp.body;
          const data = JSON.parse(rData);
          const volume = {
            _id: data.id,
            title: data.volumeInfo.title,
            author: data.volumeInfo.authors[0],
            publishedDate: data.volumeInfo.publishedDate,
            description: data.volumeInfo.description,
            pageCount: data.volumeInfo.pageCount,
            genres: data.volumeInfo.categories[0],
            averageRating: data.volumeInfo.averageRating,
            maturityRating: data.volumeInfo.maturityRating,
            image: data.volumeInfo.imageLinks.medium,
            read: false,
          };
          db.inputBooks(volume, (dberr, dbres) => {
            if (dberr) {
              throw dberr;
            } else {
              res.status(200).end();
            }
          });
        }
      });
    }
  });
});

app.patch('/api/read', (req, res) => {
  const id = req.body.id;
  const status = req.body.read;
  db.changeStatus(id, status, (err) => {
    if (err) {
      throw err;
    } else {
      res.status(200).end();
    }
  });
});

app.delete('/api/book', (req, res) => {
  const id = req.body.id;
  db.removeBook(id, (err) => {
    if (err) {
      throw err;
    } else {
      res.status(200).end();
    }
  });
});

app.listen(port, () => console.log(`listening on port ${port}!`));
