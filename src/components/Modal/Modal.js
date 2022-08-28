import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

class Modal extends Component {
  handleCloseModalByBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  handleCloseModalByEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseModalByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseModalByEsc);
  }

  render() {
    return (
      <div className={s.overlay} onClick={this.handleCloseModalByBackdrop}>
        <div className={s.modal}>
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}
export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
