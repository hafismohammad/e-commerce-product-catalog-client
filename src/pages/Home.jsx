// import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AddProduct from '../components/AddProduct';

function Home() {
//   const [ setFilters] = useState({
//     category: '',
//     minPrice: 0,
//     maxPrice: 1000,
//   });

  return (
    <>
      <Navbar />
      <AddProduct />
      <div className="flex p-6">
        <Sidebar />
        <div className="p-4 flex-1">
          <h2 className="text-2xl font-semibold">Product Listings</h2>
        </div>

        
      </div>
    </>
  );
}

export default Home;
