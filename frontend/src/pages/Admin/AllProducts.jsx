import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div className="text-gray-700 text-center mt-10">Loading...</div>;
  }

  if (isError) {
    return <div className="text-red-500 text-center mt-10">Error loading products</div>;
  }

  return (
    <div className="container mx-auto px-4 md:px-20">
      <h2 className="text-3xl font-semibold text-black text-center my-6">
        All Products ({products.length})
      </h2>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/admin/product/update/${product._id}`}
                className="block bg-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto rounded-t-lg"
                />
                <div className="p-4">
                  <h5 className="text-lg font-semibold text-black mb-2">
                    {product?.name}
                  </h5>
                  <p className="text-gray-500 text-sm mb-2">
                    {moment(product.createdAt).format("MMMM Do YYYY")}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    {product?.description?.substring(0, 80)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/admin/product/update/${product._id}`}
                      className="px-4 py-2 bg-gray-700 text-white text-sm font-medium rounded-lg hover:bg-black transition"
                    >
                      Update Product
                    </Link>
                    <p className="text-gray-800 font-semibold">$ {product?.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/4 p-4">

        </div>
      </div>
    </div>
  );
};

export default AllProducts;
