import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  alt = '',
  openBigImg,
}) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={alt}
        className={styles.ImageGalleryItemImg}
        onClick={() => openBigImg(largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    alt: PropTypes.string,
    openBigImg: PropTypes.func.isRequired,
  }),
};

export default ImageGalleryItem;
