'use client'

import { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
  
      <button
        className="p-5 text-[#B88E2F]"
        onClick={handleToggleSidebar}
      >
        {isOpen ? (
          <span className="text-3xl">&times;</span> // Close icon (X)
        ) : (
          <span className="text-3xl">&#9776;</span> // Hamburger icon (☰)
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-[#B88E2F] text-white p-4 transition-all z-50 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-greatVibes ">Admin Panel</h2>
          
          <button
            className="text-white p-2"
            onClick={handleToggleSidebar}
          >
            X
          </button>
        </div>

        <ul className="font-georgia">
          <li className="mb-4">
            <Link href="/dashboard">Sale Overview</Link>
          </li>
          <li className="mb-4">
            <Link href="/product-management">Products Management</Link>
          </li>
          <li className="mb-4">
            <Link href="/delete-products">Delete Products</Link>
          </li>
          <li className="mb-4">
            <Link href="/user-order">User Order</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
