import React, { useState } from 'react';

const SearchBar = ({ data, onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 0) {
      const filteredSuggestions = data.filter(item =>
        item.country.toLowerCase().includes(value.toLowerCase()) ||
        item.capital.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (item) => {
    setQuery(item.country || item.capital);
    setSuggestions([]);
    onSelect(item);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search by country or capital"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((item, index) => (
            <li key={index} onClick={() => handleSelect(item)}>
              {item.country} - {item.capital}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
