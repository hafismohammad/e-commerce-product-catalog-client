import React from 'react'
import ProductCards from './ProductCard'
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'

function ProductList() {
  const {products} = useSelector((state) => state.product)
console.log('products', products);
    
    // const navigate = useNavigate()
    // const dispatch = useDispatch()



    // const handleSelect = (id) => {
    //   navigate(`/product/${id}`)
    // }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6 ">
       {products.map(product => (
          <div key={product.id}  className="cursor-pointer">
          <ProductCards  key={product.id} product={product} />
        </div>
      ))}
    </div>
  )
}

export default ProductList