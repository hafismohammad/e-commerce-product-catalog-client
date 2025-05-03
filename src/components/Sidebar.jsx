import React, { useState } from 'react';

function Sidebar({ setFilters }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMinPrice, setSelectedMinPrice] = useState('500');
  const [selectedMaxPrice, setSelectedMaxPrice] = useState('2000');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: e.target.value,
    }));
  };

  const handlePriceChange = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      minPrice: selectedMinPrice,
      maxPrice: selectedMaxPrice,
    }));
  };

  return (
    <div className="border border-gray-300 w-[350px] p-4">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      
      {/* Category Filter */}
      <div className="mb-4">
        <h3 className="font-medium">Category</h3>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="home">Home</option>
          <option value="books">Books</option>
          {/* Add more categories here */}
        </select>
      </div>
      
      {/* Price Range Filter */}
      <div className="mb-4">
        <h3 className="font-medium">Price Range</h3>
        <div className="flex justify-between">
          {/* Min Price Dropdown */}
          <div>
            <h4 className="font-medium">Min Price</h4>
            <select
              value={selectedMinPrice}
              onChange={(e) => setSelectedMinPrice(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="500">500</option>
              <option value="1000">1000</option>
              <option value="1500">1500</option>
              <option value="2000">2000</option>
            </select>
          </div>

          {/* Max Price Dropdown */}
          <div>
            <h4 className="font-medium">Max Price</h4>
            <select
              value={selectedMaxPrice}
              onChange={(e) => setSelectedMaxPrice(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="500">500</option>
              <option value="1000">1000</option>
              <option value="1500">1500</option>
              <option value="2000">2000</option>
              <option value="3000">3000</option>
              <option value="3000+">3000+</option>
            </select>
          </div>
        </div>
        <button
          onClick={handlePriceChange}
          className="mt-2 w-full p-2 bg-blue-500 text-white rounded"
        >
          Apply Price Filter
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
