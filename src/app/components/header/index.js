import React from 'react';
import SearchBar from '../search-bar';

const Header = ({ handleSearch }) => (
  <header>
    <SearchBar handleSearch={handleSearch} />
  </header>
);

export default Header;
