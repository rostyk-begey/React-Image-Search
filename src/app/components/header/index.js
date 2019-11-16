import React from 'react';
import SearchBar from '../search-bar';

const Header = ({ handleSearch }) => (
  <header>
    <h1>Thumbnail Gallery</h1>

    <SearchBar handleSearch={handleSearch} />
  </header>
);

export default Header;
