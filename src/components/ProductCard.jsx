
function ProductCards({product}) {
    return (
      <div className="border border-gray-300 rounded-xl bg-white p-3 shadow hover:shadow-md transition">
      <img
        className="h-48 w-full object-cover rounded-lg mb-3"
        src={product.image}
        alt="product"
      />
      <div className="space-y-1">
        <p className="font-semibold text-lg">{product.productName}</p>
        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
        <h1 className="text-cyan-700 font-bold text-lg">₹{product.price}</h1>
      </div>
    </div>
    )
  }
  
  export default ProductCards