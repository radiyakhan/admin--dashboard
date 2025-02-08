"use client";

import { useEffect, useState } from "react";
import Chart from "@/components/Chart";
import { client } from "../../lib/client";

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  // Fetch only 10 latest stock products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product"] | order(_createdAt desc) [0...10] {
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

  const salesData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales Overview",
        data: [300, 700, 400, 600, 800, 900, 1000],
        backgroundColor: ["#FFF3E3"],
        borderColor: ["#B0B0B0"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-5xl text-[#B88E2F] font-greatVibes mb-6">Dashboard</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Chart Section */}
        <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-3xl font-greatVibes text-[#B88E2F] mb-4">
            Sales Overview
          </h3>
          <div className="relative w-full h-[300px] md:h-[400px]">
            <Chart data={salesData} />
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-3xl font-greatVibes text-[#B88E2F] mb-4">
            My Stocks (Latest 10 Products)
          </h3>
          {products.length > 0 ? (
            <ul className="space-y-4">
              {products.map((product) => (
                <li key={product._id} className="flex justify-between items-center border-b pb-2">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.productImage}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-lg shadow-md"
                    />
                    <div>
                      <span className="text-lg font-medium">{product.title}</span>
                      <p className="text-sm text-gray-500">
                        {product.isNew ? "🆕 New" : "🔥 Popular"} | {product.discountPercentage}% Off
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-lg text-[#B88E2F]">Rs. {product.price}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Loading stock data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
