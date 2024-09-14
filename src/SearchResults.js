import React from 'react';

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

export default SearchResults;
