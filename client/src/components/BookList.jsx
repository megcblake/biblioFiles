import React from 'react';
import BookEntry from './BookEntry.jsx';

const BookList = (props) => {
  const bookList = props.books.map(book => (
    <BookEntry key={book._id} book={book} changeRead={props.changeRead} deleteBook={props.deleteBook} />
  ));

  return (
    <div className="bookList">
      {bookList}
    </div>
  );
};

export default BookList;
