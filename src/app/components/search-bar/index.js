import React from 'react';

const SearchBar = ({ handleSearch }) => (
  <div className="search-bar">
    <input type="search" onChange={handleSearch} />
  </div>
);

export default SearchBar;
