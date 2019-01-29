import React from 'react';
import PropTypes from 'prop-types';

class AddBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    const { title, author } = this.state;
    const { addBooks } = this.props;
    addBooks(title, author);
    this.setState({
      title: '',
    });
    this.setState({
      author: '',
    });
    event.preventDefault();
  }


  render() {
    const { title, author } = this.state;
    return (
      <div className="search-books">
        <span className="search-title">Search</span>
        <div className="search-params">
          <form>
            <input type="text" placeholder="book title" name="title" value={title} onChange={this.handleChange} />
            <input type="text" placeholder="book author" name="author" value={author} onChange={this.handleChange} />
            <button className="submitButton" type="submit" onClick={this.handleSubmit} />
          </form>
        </div>
      </div>
    );
  }
}

AddBooks.propTypes = {
  addBooks: PropTypes.func.isRequired,
};

export default AddBooks;
