'use client';
import React, { useEffect, useState } from 'react';
import { client } from '@/lib/client';

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

  // ✅ Fetch Products from Sanity
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

  // ✅ Delete Product from Sanity
  const handleDeleteProduct = (id: string) => {
    const confirmDelete = confirm("Are you sure you want to remove this product from the list?");
    if (!confirmDelete) return;
  
    // ✅ Just filter out the product from state (does not affect Sanity)
    setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-5xl text-[#B88E2F] font-greatVibes text-center mb-6">Delete Products</h2>
      
      {/* Product List Table */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-xl text-[#B88E2F] font-georgia mb-4">Product List</h3>
        <div className="overflow-x-auto max-h-96 overflow-y-auto"> 
          <table className="min-w-full mt-4 table-auto border-collapse">
            <thead>
              <tr>
                <th className="border-b p-3 text-left text-sm font-georgia text-[#B88E2F]">Image</th>
                <th className="border-b p-3 text-left text-sm font-georgia text-[#B88E2F]">Product Name</th>
                <th className="border-b p-3 text-left text-sm font-georgia text-[#B88E2F]">Price</th>
                <th className="border-b p-3 text-left text-sm font-georgia text-[#B88E2F]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="border-b p-3 text-sm">
                    <img src={product.productImage} alt={product.title} className="w-16 h-16 object-cover rounded-lg" />
                  </td>
                  <td className="border-b p-3 text-sm">{product.title}</td>
                  <td className="border-b p-3 text-sm">Rs: {product.price}</td>
                  <td className="border-b p-3 text-sm">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
