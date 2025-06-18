"use client";

import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ProductList from "../components/ProductList";
import Link from "next/link";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <Hero />
      <h2 className="w-full text-center text-2xl md:text-4xl font-semibold py-6 text-black">
        All Products
      </h2>
      <ProductList />
    </div>
  );
}
