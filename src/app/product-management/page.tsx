"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/lib/client";

type Product = {
  _id: string;
  title: string;
  productImage: string;
  price: number;
  tags: string[];
  discountPercentage: number;
  isNew: boolean;
};

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Fetch only 10 latest stock products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product"]  {
        _id,
        title,
        "productImage": productImage.asset->url,
        price,
        tags,
        discountPercentage,
        isNew
      }`;

      try {
        const data = await client.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle edit button click
  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
  };

  // Function to update product in Sanity
  const handleUpdateProduct = () => {
    if (!editingProduct) return;
  
    // ✅ Update product only in the state, not in Sanity
    setProducts((prev) =>
      prev.map((p) => (p._id === editingProduct._id ? editingProduct : p))
    );
  
    alert("Product updated!");
    setEditingProduct(null);
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-5xl text-[#B88E2F] font-greatVibes text-center mb-6">
        Products Management
      </h2>
      <p className="text-center text-3xl text-[#B88E2F] font-greatVibes mb-8">
        Manage your products here. Add or edit products.
      </p>

      {/* Product List Table */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-xl text-[#B88E2F] font-georgia mb-4">
          Product List
        </h3>
        <div className="overflow-y-auto max-h-[500px]">
          <table className="min-w-full mt-4 table-auto border-collapse">
            <thead>
              <tr>
                <th className="border-b p-3 text-left text-sm font-georgia text-[#B88E2F]">
                  Image
                </th>
                <th className="border-b p-3 text-left text-sm font-georgia text-[#B88E2F]">
                  Product Name
                </th>
                <th className="border-b p-3 text-left text-sm font-georgia text-[#B88E2F]">
                  Price
                </th>
                <th className="border-b p-3 text-left text-sm font-georgia text-[#B88E2F]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="border-b p-3 text-sm">
                    <img
                      src={product.productImage}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="border-b p-3 text-sm">{product.title}</td>
                  <td className="border-b p-3 text-sm">Rs: {product.price}</td>
                  <td className="border-b p-3 text-sm">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                      onClick={() => handleEditClick(product)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Edit Product Form */}
      {editingProduct && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Edit Product
          </h3>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
                value={editingProduct.title}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: Number(e.target.value),
                  })
                }
              />
            </div>
            <button
              type="button"
              onClick={handleUpdateProduct}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-200 w-full sm:w-auto"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
