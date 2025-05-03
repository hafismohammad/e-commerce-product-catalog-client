import React, { useEffect, useState } from 'react'
import ProductCards from './ProductCard'
import { fetchProductData } from '../api/products'
import { useNavigate } from 'react-router-dom'

function ProductList() {
    let [productData, setProductData] = useState([])
    
    const navigate = useNavigate()

    useEffect(() => {
        const getProducts = async () => {
            const products = await fetchProductData();
            console.log(products);
            
            setProductData(products)
          };
        
          getProducts();
    }, [])

    const handleSelect = (id) => {
      navigate(`/product/${id}`)
    }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
       {productData.map(product => (
          <div key={product.id} onClick={() => handleSelect(product.id)} className="cursor-pointer">
          <ProductCards  key={product.id} product={product} />
        </div>
      ))}
    </div>
  )
}

export default ProductList