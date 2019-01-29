import React from 'react';

const ShowStats = (props) => {
  const read = props.books.filter(book => book.read === true);
  const pageCount = read.reduce((accum, item) => {
    return accum + item.pageCount;
  }, 0);
  return (
    <div className="show-stats">
        here
    </div>
  );
};
