import React from 'react';
import { FiSearch } from 'react-icons/fi'; 

function ProductSearch({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <div className="flex items-center w-full max-w-md mx-auto border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        className="flex-grow outline-none text-sm text-gray-700"
      />
      <button
        onClick={onSearch}
        className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
      >
        <FiSearch size={20} />
      </button>
    </div>
  );
}

export default ProductSearch;
