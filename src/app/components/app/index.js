import React, { Component } from 'react';
import { getImages } from '../../api';
import ImageItem from '../image-item';
import SearchBar from '../search-bar';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: {},
      search: '',
      page: 1,
    };
  }

  componentDidMount() {
    this.loadImagesPage();
  }

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.loadImagesPage();
    }
  }

  parseImages = data => {
    const { images } = this.state;
    return data.reduce((arr, { id, farm, secret, server, title }) => {
      const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
      arr[url] = title;
      return arr;
    }, []);
  };

  handleSearch = ({ target: { value: q } }) => {
    this.setState({ search: q, images: {} });
  };

  loadImagesPage() {
    this.loadImages()
      .then(data => this.parseImages(data))
      .then(images => this.setState({ images }))
      // eslint-disable-next-line no-console
      .catch(e => console.error(e));
  }

  loadImages = async () => {
    let images;
    let { search: q, page } = this.state;
    console.log('---', q);
    const options = {
      method: `flickr.photos.${q.length ? 'search' : 'getRecent'}`,
      page,
    };

    if (q.length) {
      options.sort = 'relevance';
      options.text = `${q}`;
      options.extras = 'description, machine_tags';
    }

    ({
      data: {
        photos: { photo: images },
      },
    } = await getImages(options));

    return images;
  };

  render() {
    const { images } = this.state;

    return (
      <div className="container">
        <h1 className="font-weight-light text-center text-lg-left mt-4 mb-0">
          Thumbnail Gallery
        </h1>

        <SearchBar handleSearch={this.handleSearch} />

        <div className="images">
          {Object.entries(images).map(([url, title]) => (
            <ImageItem key={url} url={url} title={title} />
          ))}
        </div>
      </div>
    );
  }
}
