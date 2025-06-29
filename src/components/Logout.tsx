"use client";

import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleCart = () => {
    router.push("/cart")
  }
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh(); // cập nhật lại layout
  };

  return (
    <>
    <button 
      onClick={handleCart}
      className="bg-blue-600 hover:bg-red-700 text-white px-4 py-2 rounded transition">
        Cart
    </button>
     <Link
        href="/orders"
        className="bg-yellow-600 hover:bg-green-700 text-white px-4 py-2 rounded transition inline-block"
      >
        Đơn hàng
      </Link>
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
    >
      Đăng xuất
    </button>
    </>
  );
}