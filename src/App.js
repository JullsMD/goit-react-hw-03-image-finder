import React, { Component } from 'react';
import API from './Services/API';

import Searchbar from './Components/Searchbar/Searchbar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import Modal from './Components/Modal/Modal';
import Button from './Components/Button/Button';
import Loader from 'react-loader-spinner';
import { Toaster } from 'react-hot-toast';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import css from './Components/Loader/Loader.module.css';
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
          <Loader
            className={css.loader}
            type="TailSpin"
            color="#00BFFF"
            height={80}
            width={80}
            timeout={5000} //3 secs
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
