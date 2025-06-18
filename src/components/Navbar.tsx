// src/components/Navbar.tsx
import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import LogoutButton from "./Logout";

export default async function Navbar() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  return (
    <nav className="mb-8 flex justify-between items-center px-4 py-3 bg-white shadow-md rounded-lg">
      <div className="text-lg font-bold text-blue-600">
        <Link href="/">Watches</Link>
      </div>

      <div className="space-x-4">
        {user ? (
          <>
            <Link
              href="/add-product"
              className="text-gray-700 hover:text-blue-600 font-medium transition text-lg bg-green-500 px-4 py-2 rounded"
            >
              Create Product
            </Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition p-10"
            >
              Đăng nhập
            </Link>
            <Link
              href="/register"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded transition"
            >
              Đăng ký
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}