import styles from './ImageGallery.module.css'

import PropTypes from "prop-types";

const ImageGallery = ({ items }) => {
    const elements = items.map(({id, webformatURL, largeImageURL, tags}) => (
    <li key={id} className={styles.item}>
            <img src={webformatURL} alt={tags} width="300" height='200'  />
</li>
    ))

 return (<ul className={styles.list}>
        {elements}
    </ul>)
}

export default ImageGallery

ImageGallery.propTypes = {
    // onClick: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }))
}