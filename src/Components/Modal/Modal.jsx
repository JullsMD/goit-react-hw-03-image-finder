import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

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
    return createPortal(
      <div className={styles.overlay} onClick={this.handleCloseModalByBackdrop}>
        <div className={styles.modal}>
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>,
      modalRoot,
    );
  }
}
export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
