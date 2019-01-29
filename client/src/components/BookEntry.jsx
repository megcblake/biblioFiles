import React from 'react';
import Modal from 'react-responsive-modal';
import ReactHtmlParser from 'react-html-parser';
import Truncate from 'react-truncate-html';

class BookEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      show: false,
    };
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleShowClick = this.handleShowClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  onOpenModal() {
    this.setState({ open: true });
  }

  onCloseModal() {
    this.setState({ open: false }, () => {
      this.setState({ show: false });
    });
  }

  handleChangeStatus() {
    this.props.changeRead(this.props.book._id, !this.props.book.read);
  }

  handleShowClick() {
    this.setState(state => ({
      show: !state.show,
    }));
  }

  handleDeleteClick() {
    this.props.deleteBook(this.props.book._id);
  }

  render() {
    const desc = this.props.book.description.slice(0, 3) === '<p>'
      ? this.props.book.description.slice(3)
      : this.props.book.description;
    const text = this.state.show
      ? ReactHtmlParser(desc)
      : (
        <Truncate
          lines={18}
          dangerouslySetInnerHTML={{
            __html: desc,
          }}
        />
      );
    const flag = this.props.book.read
      ? <div className="read-flag">read</div>
      : <div />;
    const mature = this.props.book.maturityRating === 'NOT_MATURE'
      ? 'not mature'
      : 'mature';
    return (
      <div>
        <div className="bookEntry" onClick={this.onOpenModal} role="presentation">
          <img src={this.props.book.image} alt="bookimage" />
          {flag}
        </div>
        <div className="modal">
          <Modal open={this.state.open} onClose={this.onCloseModal} center>
            <div className="modal-inner">
              <div className="modal-desc">
                <div className="modal-genres">
                  {this.props.book.genres}
                </div>
                <h1>{this.props.book.title}</h1>
                <div className="modal-author">
                  by
                  {' '}
                  <span className="author-color">{this.props.book.author}</span>
                </div>
                <h2>About</h2>
                <div className="modal-about">
                  <div className="modal-item">
                    <img src="/icons/icons8-page-64.png" title="page count" />
                    <span className="modal-about-entries">{this.props.book.pageCount} pages</span>
                  </div>
                  <div className="modal-item">
                    <img src="/icons/icons8-add-to-favorites-64.png" title="average rating" />
                    <span className="modal-about-entries">{this.props.book.averageRating} stars</span>
                  </div>
                  <div className="modal-item">
                    <img src="/icons/icons8-today-64.png" title="publication year" />
                    <span className="modal-about-entries">published {this.props.book.publishedDate.slice(0, 4)}</span>
                  </div>
                  <div className="modal-item">
                    <img src="/icons/icons8-old-man-64.png" title="maturity level" />
                    <span className="modal-about-entries">{mature}</span>
                  </div>
                </div>
                <div className="modal-remove-book">
                  <button onClick={this.handleDeleteClick}>
                    Delete
                  </button>
                </div>
              </div>
              <div className="modal-summary">
                <div className="modal-read">
                  <label className="switch">
                    <input type="checkbox" onClick={this.handleChangeStatus} />
                    <span className="slider round" />
                  </label>
                  <div className="modal-read-status">
                    {this.props.book.read ? 'READ' : 'TO BE READ'}
                  </div>
                </div>
                <h2>Synopsis</h2>
                <div className="modal-synopsis">
                  {text}
                  <div className="modal-read-more" onClick={this.handleShowClick}>
                    {this.state.show ? 'Read less' : 'Read more'}
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default BookEntry;
