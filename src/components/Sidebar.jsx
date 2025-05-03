import React, { useEffect, useState } from 'react';

function Sidebar({ setFilters, onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMinPrice, setSelectedMinPrice] = useState('500');
  const [selectedMaxPrice, setSelectedMaxPrice] = useState('2000');


  useEffect(() => {
    // Trigger the filter change only when any of the filter values are updated
    onFilterChange();
  }, [selectedCategory, selectedMinPrice, selectedMaxPrice, onFilterChange]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setFilters((prevFilters) => {
      const updated = { ...prevFilters, category };
      return updated;
    });
  };

  const handlePriceChange = () => {
    setFilters((prevFilters) => {
      const updated = {
        ...prevFilters,
        minPrice: selectedMinPrice,
        maxPrice: selectedMaxPrice,
      };
      return updated;
    });
  };

  return (
    <div className="border border-gray-300 w-[350px] p-4 bg-white">
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
          className="mt-2 w-full p-2 bg-black text-white rounded"
        >
          Apply Price Filter
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
