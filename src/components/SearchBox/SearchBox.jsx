import React from 'react';
import './SearchBox.css';

export const SearchBox = ({ value, onChange }) => {
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="搜尋商品... (Search products...)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search products"
        />
        {value && (
          <button 
            className="search-clear" 
            onClick={() => onChange('')}
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
};
