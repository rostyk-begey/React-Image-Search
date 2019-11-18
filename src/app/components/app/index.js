import React, { Component } from 'react';
import axios from 'axios';
import { getImages } from '../../api';
import Header from '../header';
import Gallery from '../gallery';
import { scrollService } from '../../services/scroll-service';

export class App extends Component {
  state = {
    images: {},
    search: '',
    page: 1,
    isLoading: false,
  };

  componentDidMount() {
    this.loadImages();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;

    if (prevState.search !== search || prevState.page !== page) {
      this.loadImages();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  parseImageUrl = ({ id, farm, secret, server }) => {
    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
  };

  parseImages = data => {
    const { images } = this.state;

    return data.reduce((arr, image) => {
      const url = this.parseImageUrl(image);
      arr[url] = image.title;
      return arr;
    }, images);
  };

  handleSearch = ({ target: { value: q } }) => {
    this.setState({ search: q, images: {} });
  };

  handleScroll = () => {
    const { isLoading } = this.state;

    if (!isLoading && scrollService.getScrollPercent() >= 80) {
      this.setState(prevState => ({
        page: prevState.page + 1,
      }));
    }
  };

  loadImages = () => {
    const { search, page } = this.state;

    if (typeof this._source !== typeof undefined) {
      this._source.cancel('Operation canceled due to new request.');
    }

    this._source = axios.CancelToken.source();

    this.setState({ isLoading: true });

    getImages(search, page, this._source.token)
      .then(({ data: { photos: { photo: images } } }) => {
        this.setState({ isLoading: false });
        return images;
      })
      .then(images => this.parseImages(images))
      .then(images => this.setState({ images }))
      // eslint-disable-next-line no-console
      .catch(e => console.error(e));
  };

  render() {
    const { images } = this.state;

    return (
      <div className="container">
        <Header handleSearch={this.handleSearch} />

        <Gallery images={images} />
      </div>
    );
  }
}
