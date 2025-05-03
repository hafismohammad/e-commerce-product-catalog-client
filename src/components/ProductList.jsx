import React from "react";
import ProductCards from "./ProductCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from 'react-redux'

function ProductList() {
  const { products } = useSelector((state) => state.product);
  // console.log("products", products);

  const navigate = useNavigate();
  // const dispatch = useDispatch()

  const handleSelect = (id) => {
    console.log("iddd", id);

    navigate(`/product/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product._id}
          onClick={() => handleSelect(product._id)}
          className="cursor-pointer"
        >
          <ProductCards product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
