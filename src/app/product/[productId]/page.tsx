"use client";

import ProductList from "@/components/ProductList";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabaseClient";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";


interface Product {
  image: string;
  _id: string;
  name: string;
  price: number;
  description: string;
}

const ProductPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const params = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product>();

  const handleDelete = async () => {
    const response = await axios.delete(`/api/product/${params.productId}`);

    toast.success(response.data.message);
    router.push("/");
  };

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  useEffect(() => {
    axios
      .get(`/api/product/${params.productId}`)
      .then((response) => setProduct(response.data.product));
  }, [params.productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-4 md:px-12 bg-[#F8F9FA] text-black">
      <p className="cursor-pointer py-3" onClick={() => router.back()}>
        &larr; Back
      </p>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center md:space-x-10">
        <Image
          src={product.image}
          alt="img"
          width={1000}
          height={1000}
          className="max-w-full md:max-w-xl md:min-w-[30rem] min-h-[28rem] max-h-[28rem] object-cover object-center basis-1/2"
        />

        <div className="basis-1/2 py-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl">{product.name}</h2>

            {user && (
              <div className="text-2xl font-bold -mt-2 relative">
                <span
                  onClick={() => setOpen(!open)}
                  className="cursor-pointer tracking-widest"
                >
                  ...
                </span>

                {open && (
                  <div className="absolute bg-white shadow-md pb-2 px-5 text-base font-normal right-0 top-10">
                    <Link href={`/product/${product._id}/update`}>
                      <p className="mb-2 pb-2 border-b border-gray-300">
                        Update
                      </p>
                    </Link>
                    <p
                      className="text-red-500 cursor-pointer"
                      onClick={handleDelete}
                    >
                      Delete
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <h3 className="text-3xl font-semibold mt-3">${product.price}</h3>

          <p className="font-semibold mt-10 text-lg">Description</p>
          <p className="mt-1">{product.description}</p>
          <button
            onClick={() =>
                         addToCart({
                          productId: product._id,
                          name: product.name,
                          price: product.price,
                          quantity: 1,
                          imageUrl: product.image || '/placeholder.png',
                      })}
            className="bg-blue-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
          >
            Add to cart
          </button>
        </div>
      </div>

      <h2 className="w-full text-2xl font-semibold pt-20">
        You might also like
      </h2>
      <ProductList />
    </div>
  );
};

export default ProductPage;
