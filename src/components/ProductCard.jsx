
function ProductCards({product}) {
    return (
      <div className="border border-gray-300 rounded-2xl bg-white p-3">
          <div  className="">
          <img className="h-48 w-full object-cover" src={product.image} alt="product-image" />
          </div>
  
          <div>
          <p>{product.productName}</p>
          <p>{product.description}</p>
          <h1>{product.price}</h1>
          </div>
      </div>
    )
  }
  
  export default ProductCards