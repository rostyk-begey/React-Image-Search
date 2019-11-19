import React from 'react';
import './styles.scss';

const SearchBar = ({ handleSearch }) => (
  <div className="search-bar">
    <input type="search" onChange={handleSearch} placeholder="Search..." />
  </div>
);

export default SearchBar;
