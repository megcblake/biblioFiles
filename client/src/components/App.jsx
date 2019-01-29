import React from 'react';
import AddBooks from './AddBooks.jsx';
import BookList from './BookList.jsx';
import ShowStats from './ShowStats.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
    this.getBooks = this.getBooks.bind(this);
    this.addBooks = this.addBooks.bind(this);
    this.changeRead = this.changeRead.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks() {
    fetch('/api/books')
      .then((getres) => {
        return getres.json();
      })
      .then((booksJson) => {
        this.setState({
          books: booksJson,
        });
      });
  }

  addBooks(title, author) {
    const data = {
      title,
      author,
    };
    fetch('/api/book', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        this.getBooks();
      });
  }

  changeRead(id, read) {
    const data = {
      id,
      read,
    };
    fetch('/api/read', {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        this.getBooks();
      });
  }

  deleteBook(id) {
    const data = {
      id,
    };
    fetch('/api/book', {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        this.getBooks();
      });
  }

  render() {
    const { books } = this.state;
    return (
      <div className="books">
        <div className="sidebar">
          <span className="side-big-title"><h1>BiblioFiles</h1></span>
          <div className="side-subtitle">Welcome back!</div>
          <AddBooks addBooks={this.addBooks} />
          <ShowStats books={books} />
        </div>
        <div className="main">
          <BookList books={books} changeRead={this.changeRead} deleteBook={this.deleteBook} />
        </div>
      </div>
    );
  }
}

export default App;
