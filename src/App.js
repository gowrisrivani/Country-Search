import React, { useState } from 'react';
import './App.css'; 
import data from './data.json'; 

//SearchBar 
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

//SearchResults 
const SearchResults = ({ country }) => {
  if (!country) return null;

  return (
    <div className="search-results">
      <h2>{country.country}</h2>
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Official Language:</strong> {Array.isArray(country.official_language) ? country.official_language.join(', ') : country.official_language}</p>
      <p><strong>Currency:</strong> {country.currency}</p>
    </div>
  );
};

//Main App
function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <div className="App">
      <h1>Country Search</h1>
      <SearchBar data={data} onSelect={setSelectedCountry} />
      <SearchResults country={selectedCountry} />
    </div>
  );
}

export default App;
