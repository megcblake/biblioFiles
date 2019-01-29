import React from 'react';
import PropTypes from 'prop-types';
import BookEntry from './BookEntry.jsx';

const BookList = (props) => {
  const { books, changeRead, deleteBook } = props;
  const bookList = books.map(book => (
    <BookEntry key={book._id} book={book} changeRead={changeRead} deleteBook={deleteBook} />
  ));

  return (
    <div className="bookList">
      {bookList}
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
  changeRead: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,
};

export default BookList;
