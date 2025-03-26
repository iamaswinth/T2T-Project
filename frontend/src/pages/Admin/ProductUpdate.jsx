import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const AdminProductUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category?._id || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock || 0);

  const { data: categories = [] } = useFetchCategoriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id || ""); // Handle default category
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      setImage(res.image);
      toast.success("Image uploaded successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const result = await updateProduct({
        productId: params._id,
        formData,
      }).unwrap();

      if (result && !result.error) {
        toast.success("Product successfully updated", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });

        // Navigate only after a successful update
        setTimeout(() => navigate("/admin/allproductslist"), 2000); // slight delay for better UX
      } else {
        toast.error("Product update failed", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" is deleted`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-2 my-8">
      <div className="flex flex-col md:flex-row bg-[#1a1a1a] rounded-lg shadow-lg p-6">
        <div className="md:w-3/4 w-full p-4 bg-[#0] rounded-lg">
          <h2 className="text-2xl text-white font-semibold mb-6 text-center">
            Update / Delete Product
          </h2>

          {image && (
            <div className="text-center mb-6">
              <img
                src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
                }
                alt="product"
                className="mx-auto rounded-lg w-full md:w-[80%] h-auto"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 block w-full text-center rounded-lg cursor-pointer font-bold mb-2">
              Upload Image
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-white mb-2">
                Name
              </label>
              <input
                type="text"
                className="p-3 w-full border rounded-lg bg-[#1a1a1a] text-white focus:ring-2 focus:ring-blue-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-white mb-2">
                Price
              </label>
              <input
                type="number"
                className="p-3 w-full border rounded-lg bg-[#1a1a1a] text-white focus:ring-2 focus:ring-blue-600"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {/* Quantity */}
            <div>
              <label className="block text-white mb-2">Quantity</label>
              <input
                type="number"
                className="p-3 w-full border rounded-lg bg-[#1a1a1a] text-white focus:ring-2 focus:ring-blue-600"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block text-white mb-2">Brand</label>
              <input
                type="text"
                className="p-3 w-full border rounded-lg bg-[#1a1a1a] text-white focus:ring-2 focus:ring-blue-600"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-white mb-2">Description</label>
            <textarea
              className="p-3 w-full border rounded-lg bg-[#1a1a1a] text-white focus:ring-2 focus:ring-blue-600"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {/* Stock */}
            <div>
              <label className="block text-white mb-2">Count In Stock</label>
              <input
                type="number"
                className="p-3 w-full border rounded-lg bg-[#1a1a1a] text-white focus:ring-2 focus:ring-blue-600"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-white mb-2">Category</label>
              <select
                className="p-3 w-full border rounded-lg bg-[#1a1a1a] text-white focus:ring-2 focus:ring-blue-600"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleSubmit}
              className="py-3 px-8 bg-green-600 hover:bg-green-700 text-white rounded-lg text-lg font-semibold"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="py-3 px-8 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-lg font-semibold"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;
