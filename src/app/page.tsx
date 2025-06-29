"use client";

import { useCart } from "@/context/CartContext";
import Hero from "../components/Hero";
import ProductList from "../components/ProductList";
import { handleDeleteAllProducts } from "./api/delete-all-product/delete-all";


export default function Home() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <Hero />
      <h2 className="w-full text-center text-2xl md:text-4xl font-semibold py-6 text-black">
        All Products
      </h2>
      <button
        className="w-full text-center text-2xl md:text-4xl font-semibold py-6 text-black hover:bg-red-100 transition-colors"
        onClick={handleDeleteAllProducts}
      >
        Delete all Products
      </button>
      <ProductList />
    </div>
  );
}
