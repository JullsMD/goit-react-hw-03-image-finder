import styles from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ fetchImages }) => {
  return (
    <button className={styles.Button} type="button" onClick={fetchImages}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  fetchImages: PropTypes.func.isRequired,
};
