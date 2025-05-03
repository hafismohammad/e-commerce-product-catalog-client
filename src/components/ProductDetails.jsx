import React, { useEffect, useState } from 'react';
import { fetchProductById } from '../services/productService';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/actions/productActions';

function ProductDetails() {
  const [product, setProduct] = useState(null);

  const navigate = useNavigate();
  const dispath = useDispatch()
  const { id } = useParams();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetchProductById(id);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductData();
  }, [id]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });
  
    if (result.isConfirmed) {
      try {
        const response = await dispath(deleteProduct(id)); 
        console.log('response',response);
        navigate('/');
        Swal.fire('Deleted!', 'Product has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error', 'Failed to delete the product.', error);
      }
    }
  };
  

  if (!product) {
    return <div className="flex items-center justify-center h-[60vh] text-lg text-gray-600">Loading product details...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-6 md:p-10 border border-gray-200">
        
        <div className="flex items-center justify-center">
          <img
            src={product.image}
            alt={product.productName}
            className="max-h-[500px] w-full object-contain rounded-lg"
          />
        </div>

        <div className="flex flex-col justify-between space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.productName}</h1>
            <p className="text-sm text-gray-500 mb-1">Category: {product.category}</p>
            <p className="text-gray-700 leading-relaxed mt-4">{product.description}</p>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-indigo-600">₹{product.price}</h2>
            <button onClick={handleDelete} className="mt-4 w-full md:w-auto bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition">
              Dtelete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
