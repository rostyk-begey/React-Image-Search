import React from 'react';
import ImageItem from '../image-item';

const Gallery = ({ images }) => (
  <section className="images">
    {Object.entries(images).map(([url, title]) => (
      <ImageItem key={url} url={url} title={title} />
    ))}
  </section>
);

export default Gallery;
