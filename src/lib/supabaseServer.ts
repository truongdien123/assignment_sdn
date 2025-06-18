// lib/supabaseServer.ts
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const supabaseServer = () => {
  return createServerComponentClient({
    cookies, // ✅ Không cần tự define get/set/remove
  });
};