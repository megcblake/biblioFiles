import React from 'react';
import PropTypes from 'prop-types';

const ShowStats = ({ books }) => {
  const read = books.filter(book => book.read === true);
  const pageCount = read.reduce((accum, item) => accum + item.pageCount, 0);
  const commonGenres = [];
  read.forEach((book) => {
    commonGenres.push(book.genres.split(' / '));
  });
  const cg = commonGenres.flat();
  const genreCache = {};
  cg.forEach((genre) => {
    if (!genreCache[genre]) {
      genreCache[genre] = 1;
    } else {
      genreCache[genre] += 1;
    }
  });
  const genreKeys = Object.keys(genreCache);
  const genreVals = Object.values(genreCache);
  const genreResult = [];
  genreKeys.forEach((key, i) => genreResult.push([key, genreVals[i]]));
  const gen = books.length ? (genreResult[0][0]) : 'None';
  return (
    <div className="show-stats">
      <div className="stats-title">Statistics</div>
      <div className="stats-items">
        <div className="stats-item">
          <img src="/icons/icons8-book-stack-64.png" alt="read count" title="read count" />
          <span className="stats-entries">
            {read.length}
            {' '}
            books
          </span>
        </div>
        <div className="stats-item">
          <img src="/icons/icons8-bookmark-page-64.png" alt="page count" title="page count" />
          <span className="stats-entries">
            {pageCount}
            {' '}
            pages
          </span>
        </div>
        <div className="stats-item">
          <img src="/icons/icons8-book-shelf-64.png" alt="common genre" title="common genre" />
          <span className="stats-entries">{gen}</span>
        </div>
      </div>
    </div>
  );
};

ShowStats.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
};

export default ShowStats;
