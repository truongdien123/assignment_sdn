"use client";

import { Product } from "@/components/ProductList";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const SearchComponent = () => {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const searchTermFromUrl = searchParams.get("searchTerm");
        if(searchTermFromUrl) {
            axios.get(`/api/search?searchTerm=${searchTermFromUrl}`).then((response) => setProducts(response.data.products)).catch((error) => console.log("Error fetching search results: ",error));
        }
    }, [searchParams])
    return (
        <div id="product" className="px-4 md:px-12 py-5 md:py-10 flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {products.map((product: Product, index) => {
                    return (
                        <Link href={`/product/${product._id}`} key={index}>
                        <Image src={product.image} alt="image" width={1000} height={1000} className="max-w-[17rem] h-72 object-cover object-center rounded-lg"/>
                        <div className="mt-4">
                            <h2 className="font-semibold text-lg text-black">{product.name}</h2>
                            <p className="font-medium text-sm mt-1 text-black">{product.price}$</p>
                        </div>
                    </Link>
                    )
                })}
            </div>
        </div>
    )
}

const SearchPage = () => {
    return <Suspense fallback={"Hello"}>
        <SearchComponent/>
    </Suspense>
}

export default SearchPage