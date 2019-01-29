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
    const { changeRead, book } = this.props;
    changeRead(book._id, !book.read);
  }

  handleShowClick() {
    this.setState(state => ({
      show: !state.show,
    }));
  }

  handleDeleteClick() {
    const { deleteBook, book } = this.props;
    deleteBook(book._id);
  }

  render() {
    const { book } = this.props;
    const { show, open } = this.state;
    const desc = book.description.slice(0, 3) === '<p>'
      ? book.description.slice(3)
      : book.description;
    const text = show
      ? ReactHtmlParser(desc)
      : (
        <Truncate
          lines={18}
          dangerouslySetInnerHTML={{
            __html: desc,
          }}
        />
      );
    const flag = book.read
      ? <div className="read-flag">read</div>
      : <div />;
    const mature = book.maturityRating === 'NOT_MATURE'
      ? 'not mature'
      : 'mature';
    return (
      <div>
        <div className="bookEntry" onClick={this.onOpenModal} role="presentation">
          <img src={book.image} alt="bookimage" />
          {flag}
        </div>
        <div className="modal">
          <Modal open={open} onClose={this.onCloseModal} center>
            <div className="modal-inner">
              <div className="modal-desc">
                <div className="modal-genres">
                  {book.genres}
                </div>
                <h1>{book.title}</h1>
                <div className="modal-author">
                  by
                  {' '}
                  <span className="author-color">{book.author}</span>
                </div>
                <h2>About</h2>
                <div className="modal-about">
                  <div className="modal-item">
                    <img src="/icons/icons8-page-64.png" alt="page count" title="page count" />
                    <span className="modal-about-entries">
                      {book.pageCount}
                      {' '}
                      pages
                    </span>
                  </div>
                  <div className="modal-item">
                    <img src="/icons/icons8-add-to-favorites-64.png" alt="average rating" title="average rating" />
                    <span className="modal-about-entries">
                      {book.averageRating}
                      {' '}
                      stars
                    </span>
                  </div>
                  <div className="modal-item">
                    <img src="/icons/icons8-today-64.png" alt="publication year" title="publication year" />
                    <span className="modal-about-entries">
                      published
                      {' '}
                      {book.publishedDate.slice(0, 4)}
                    </span>
                  </div>
                  <div className="modal-item">
                    <img src="/icons/icons8-old-man-64.png" alt="maturity level" title="maturity level" />
                    <span className="modal-about-entries">{mature}</span>
                  </div>
                </div>
                <div className="modal-remove-book">
                  <button type="button" onClick={this.handleDeleteClick}>
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
                    {book.read ? 'READ' : 'TO BE READ'}
                  </div>
                </div>
                <h2>Synopsis</h2>
                <div className="modal-synopsis">
                  {text}
                  <div className="modal-read-more" onClick={this.handleShowClick}>
                    {show ? 'Read less' : 'Read more'}
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
