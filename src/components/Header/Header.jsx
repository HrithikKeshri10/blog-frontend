"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [auth, setAuth] = useState({ isLoggedIn: false, userEmail: "" });

  useEffect(() => {
    const checkAuth = () => {
      setAuth({
        isLoggedIn: !!localStorage.getItem("token"),
        userEmail: localStorage.getItem("userEmail") || "",
      });
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("loginSuccess", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("loginSuccess", checkAuth);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3200/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        localStorage.clear();
        setAuth({ isLoggedIn: false, userEmail: "" });
        router.push("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-white shadow-md w-full">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Blog Platform
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>

            {auth.isLoggedIn ? (
              <>
                <span className="text-gray-600">Welcome, {auth.userEmail}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
