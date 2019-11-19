import React from 'react';
import './styles.scss';

const ImageItem = ({ url, title }) => (
  <figure className="image-item" key={url}>
    <img className="image" src={url} alt={title} />
    <figcaption className="caption">{title}</figcaption>
  </figure>
);

export default ImageItem;
