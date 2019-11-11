import React from 'react';

const ImageItem = ({ url, title }) => {
  return (
    <figure className="image" key={url} title={title}>
      <img src={url} alt={title} />
    </figure>
  );
};

export default ImageItem;
