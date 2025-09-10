import React from "react";
import { useAuthStore } from "@/store/useAuthStore";

const Navbar = () => {
  const { signup } = useAuthStore();
  const handleSignup = async () => {
    try {
      await signup();
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };
  return (
    <nav className="w-full fixed top-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto px-16 py-6 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Timmy<span className="text-indigo-500">Vision</span>
        </h1>

        {/* Right Side */}
        <div>
          <button
            onClick={handleSignup}
            className="px-5 py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
