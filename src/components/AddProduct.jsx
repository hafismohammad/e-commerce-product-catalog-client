import { useState, useRef, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addNewProduct } from "../redux/actions/productActions";
import ProductSearch from "./ProductSearch";
import { toast, Toaster } from "react-hot-toast";
import Loading from "./Spinner";

function AddProduct({ searchTerm, setSearchTerm, onSearch }) {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [errorTimeout, setErrorTimeout] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      if (errorTimeout) clearTimeout(errorTimeout);

      const timeoutId = setTimeout(() => {
        setErrors({});
      }, 5000);

      setErrorTimeout(timeoutId);
    }
  }, [errors]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const validate = () => {
    const newErrors = {};
    if (!productName.trim())
      newErrors.productName = "Product name is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    else if (description.length < 10 || description.length > 100)
      newErrors.description =
        "Description must be between 10 and 100 characters.";
    if (!category.trim()) newErrors.category = "Category is required.";
    if (!productPrice.trim() || isNaN(productPrice) || productPrice <= 0) {
      newErrors.productPrice = "Valid product price is required.";
    }
    if (!imageFile) newErrors.image = "Product image is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("description", description);
        formData.append("productPrice", productPrice);
        formData.append("category", category);
        formData.append("image", imageFile);
        const response = await dispatch(addNewProduct(formData));
        if (response.meta.requestStatus === "fulfilled") {
          toast.success("Product successfully added");
          setIsLoading(false);
          setProductName("");
          setDescription("");
          setProductPrice("");
          setCategory("");
          setImageFile(null);
          setImagePreview(null);
          handleClose();
          console.log("Product saved!", response.payload);
        } else {
          toast.error("Failed to add product");
          console.error("Add product error:", response);
        }
      } catch (error) {
        toast.error("Something went wrong!");
        console.error("Error saving product:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex items-center justify-between px-6 mt-6 flex-wrap">
        <Toaster />
        <ProductSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={() => onSearch(searchTerm)}
        />
        <button
          className="bg-black text-white px-4 py-2 rounded-md ml-4 mt-4 sm:mt-0"
          onClick={() => setIsModalOpen(true)}
        >
          Add Product
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md max-w-full w-full sm:w-[600px] lg:w-[900px] h-auto sm:h-auto flex flex-col">
            <div className="flex flex-col sm:flex-row sm:gap-6 justify-between">
              <div className="flex-1">
                <div className="mb-4">
                  <label
                    htmlFor="productName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Product Name
                  </label>
                  <input
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    id="productName"
                    type="text"
                    placeholder="Enter product name"
                    className="w-full sm:w-[400px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
                  />
                  {errors.productName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.productName}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="productDescription"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Product Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="productDescription"
                    placeholder="Enter product description"
                    className="w-full sm:w-[400px] px-4 py-2 h-32 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600 resize-none"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="productPrice"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Product Price
                  </label>
                  <input
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    id="productPrice"
                    type="text"
                    placeholder="Enter product price"
                    className="w-full sm:w-[400px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
                  />
                  {errors.productPrice && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.productPrice}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="productImage"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Product Image
                  </label>
                  <input
                    id="productImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <div
                    className="h-[200px] w-full sm:w-[200px] border border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100"
                    onClick={handleImageClick}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-full w-full object-cover rounded-md"
                      />
                    ) : (
                      <>
                        <FiUpload size={24} />
                        <span className="text-xs mt-1">Click to upload</span>
                      </>
                    )}
                  </div>
                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="productCategory"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    id="productCategory"
                    className="w-full sm:w-[300px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
                  >
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="books">Books</option>
                    <option value="clothing">Clothing</option>
                    <option value="home">Home</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4 gap-4">
              <button
                onClick={handleSave}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-md"
              >
                Save
              </button>
              <button
                onClick={handleClose}
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

export default AddProduct;
