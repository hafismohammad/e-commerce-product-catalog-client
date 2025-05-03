import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AddProduct from "../components/AddProduct";
import ProductList from "../components/ProductList";
import { fetchAllProducts } from "../redux/actions/productActions";
import { useDispatch } from "react-redux";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(
      fetchAllProducts({
        ...filters,
        search: searchTerm,
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <AddProduct
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />

      <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6">
        <div className="md:w-1/4 w-full">
          <Sidebar setFilters={setFilters} onFilterChange={handleSearch} />
        </div>
        <div className="md:w-3/4 w-full">
          <ProductList />
        </div>
      </div>
    </div>
  );
}

export default Home;
