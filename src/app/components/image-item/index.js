import React from 'react';

const ImageItem = ({ url, title }) => (
  <figure className="image" key={url} title={title}>
    <img src={url} alt={title} />
  </figure>
);

export default ImageItem;
