import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AddProduct from '../components/AddProduct';
import ProductList from '../components/ProductList';
import { fetchAllProducts } from '../redux/actions/productActions';
import { useDispatch } from 'react-redux';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: ''
  });



  const dispatch = useDispatch();
  
  const handleSearch = () => {
    dispatch(fetchAllProducts({
      ...filters,
      search: searchTerm
    }));
  };

  return (
    <div className=''>
      <Navbar />

      <AddProduct 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />

      <div className="flex p-6">
        <Sidebar setFilters={setFilters} onFilterChange={handleSearch} />
        <div className="p-4 flex-1">
          <ProductList />
        </div>
      </div>
      </div>
  );
}

export default Home;
