import React from 'react';

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
    this.props.addBooks(this.state.title, this.state.author);
    this.setState({
      title: '',
    });
    this.setState({
      author: '',
    });
    event.preventDefault();
  }


  render() {
    return (
      <div className="search-books">
        <span className="search-title">Search</span>
        <div className="search-params">
          <form>
                <input type="text" placeholder="book title" name="title" value={this.state.title} onChange={this.handleChange} />
                <input type="text" placeholder="book author" name="author" value={this.state.author} onChange={this.handleChange} />
            <button className="submitButton" onClick={this.handleSubmit}></button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddBooks;
