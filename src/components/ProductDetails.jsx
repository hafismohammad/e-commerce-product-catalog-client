import React, { useEffect, useState } from "react";
import { fetchProductById } from "../services/productService";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { deleteProduct, updateProduct } from "../redux/actions/productActions";
import Navbar from "./Navbar";
import Loading from "./Spinner";
import formatIndianPrice from "../utils/FormatIndianPrice";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetchProductById(id);
        setProduct(response.data);
        setProductName(response.data.productName);
        setDescription(response.data.description);
        setProductPrice(response.data.price);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductData();
  }, [id]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteProduct(id));
        navigate("/");
        Swal.fire("Deleted!", "Product has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to delete the product.", "error", error);
      }
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    console.log('hit handle change');
    
    const file = e.target.files[0];
    console.log('file', file);
    
    if (file) setImage(file);
  };

  const validate = () => {
    const newErrors = {};
    if (!productName.trim()) newErrors.productName = "Product name is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    if (!productPrice || isNaN(productPrice)) newErrors.productPrice = "Valid price is required.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateSubmit = async () => {
    if (!validate()) return;

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("price", productPrice);
    if (image) formData.append("image", image);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    

    try {
      setIsLoading(true)
      await dispatch(updateProduct({ id, updateData: formData }));

      Swal.fire("Updated!", "Product updated successfully.", "success");
      navigate("/");
      setIsModalOpen(false);
    } catch (err) {
      Swal.fire("Error", "Failed to update product.", "error", err);
    } finally {
      setIsLoading(false)
    }
  };

  if (!product) {
    return (
      <Loading />
    );
  }

  return (
    <>
    {isLoading && <Loading />}
    <Navbar />
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
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {product.productName}
              </h1>
              <p className="text-sm text-gray-500 mb-1">
                Category: {product.category}
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                {product.description}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h2 className="text-2xl font-semibold text-cyan-700">
                ₹{formatIndianPrice(product.price)}
              </h2>
              <div className="mt-4 flex flex-col md:flex-row gap-4">
                <button
                  onClick={handleEdit}
                  className="w-full md:w-auto bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
                >
                  Edit Product
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full md:w-auto bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition"
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-md shadow-md h-auto w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] flex flex-col">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Product</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Section */}
        <div className="flex-1">
          <label className="block mb-1 text-sm font-medium">Product Name</label>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border px-3 py-2 rounded-md w-full sm:w-[400px]"
          />
          {errors.productName && <p className="text-red-500 text-sm">{errors.productName}</p>}

          <label className="block mt-4 mb-1 text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border px-3 py-2 rounded-md w-full sm:w-[400px] h-32 resize-none"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

          <label className="block mt-4 mb-1 text-sm font-medium">Price</label>
          <input
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="border px-3 py-2 rounded-md w-full sm:w-[400px]"
          />
          {errors.productPrice && <p className="text-red-500 text-sm">{errors.productPrice}</p>}
        </div>

        {/* Right Section for Image */}
        <div className="flex flex-col gap-4 items-center">
          <label className="block text-sm font-medium">Product Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-full sm:w-64 h-auto object-contain border rounded"
            />
          ) : (
            <img
              src={product.image}
              alt="Product"
              className="w-full sm:w-64 h-auto object-contain border rounded"
            />
          )}
        </div>
      </div>

      <div className="flex justify-end mt-6 gap-4">
        <button
          onClick={handleUpdateSubmit}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-md"
        >
          Update Product
        </button>
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
}

export default ProductDetails;
