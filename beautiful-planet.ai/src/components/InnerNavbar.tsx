"use client";

import React, { useState } from "react";
import Link from "next/link";

function InnerNavbar() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <nav className="flex justify-center items-center mt-10">
      <div className="flex bg-gray-100 mt-4 mb-4 px-8 py-3 shadow-2xl">
        <Link
          href="/blogs"
          className={`px-6 py-2 text-lg font-semibold transition-all rounded-full ${
            active === "blogs" ? "bg-green-600 text-white" : "text-gray-900 hover:text-green-700"
          }`}
          onClick={() => setActive("blogs")}
        >
          Blogs
        </Link>
        <span className="mx-4 text-gray-500">|</span>
        <Link
          href="/news"
          className={`px-6 py-2 text-lg font-semibold transition-all rounded-full ${
            active === "news" ? "bg-green-600 text-white" : "text-gray-900 hover:text-green-700"
          }`}
          onClick={() => setActive("news")}
        >
          News
        </Link>
      </div>
    </nav>
  );
}

export default InnerNavbar;
