import React, { Component } from 'react';
import API from './services/API';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';
import Button from './components/Button';
import { TailSpin } from 'react-loader-spinner';
import { Toaster } from 'react-hot-toast';
import css from './components/Loader/Loader.module.css';
class App extends Component {
  state = {
    page: 1,
    images: [],
    loading: false,
    error: null,
    showModal: false,
    searchQuery: '',
    selectedImg: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.fetchImages();
    }
    if (page !== 2 && prevState.page !== page) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleSelectImage = image => {
    this.setState({ selectedImg: image });
    this.toggleModal();
  };

  handleSubmit = query => {
    this.setState({ images: [], searchQuery: query, page: 1 });
  };

  fetchImages = () => {
    const { searchQuery, page } = this.state;

    this.setState({ loading: true });
    API.fetchImages({ searchQuery, page })
      .then(hits => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
        }));
      })
      .catch(error => this.setState({ error: true }))
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { images, loading, selectedImg, showModal } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <Toaster />
        {loading && (
          <TailSpin
            className={css.loader}
            height={80}
            width={80}
            color="#00BFFF"
            ariaLabel="tail-spin-loading"
            radius={1}
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            timeout={5000}
          />
        )}
        <ImageGallery images={images} onSelect={this.handleSelectImage} />
        {images.length > 0 && <Button fetchImages={this.fetchImages} />}
        {showModal && (
          <Modal onClose={this.toggleModal} largeImageURL={selectedImg} />
        )}
      </>
    );
  }
}

export default App;
