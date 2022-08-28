import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  alt = '',
  openBigImg,
}) => {
  return (
    <li className={s.imageGalleryItem}>
      <img
        src={webformatURL}
        alt={alt}
        className={s.imageGalleryItemImg}
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
