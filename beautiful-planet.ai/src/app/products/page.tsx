"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";

interface StrapiImage {
  url: string;
  alternativeText?: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
  };
}

interface Product {
  id: number;
  ProductImage: StrapiImage | null;
  ProductName: string;
  ProductSummary: string;
  ProductDescription: string;
  Slug: string;
}

export default function Page() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:1337/api/products?populate=*", {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-4xl font-bold text-center mb-10 text-[#0e2342] ">
          Our Services
        </h2>
        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((post) => (
              <div key={post.id}
                onClick={() => setSelectedProduct(post)}
                className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                {post.ProductImage?.url ? (
                  <Image
                    src={`http://localhost:1337${post.ProductImage.formats?.medium?.url || post.ProductImage.url}`}
                    alt={post.ProductName}
                    width={400}
                    height={250}
                    className="w-full h-60 object-cover"
                  />

                ) : (
                  <div className="bg-gray-300 w-full h-[300px] flex items-center justify-center text-gray-700">
                    No Image Available
                  </div>
                )}

                <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {post.ProductName}
                </h3>
                <p className="text-gray-600 mt-2">
                  {post.ProductSummary || "No summary available."}
                </p>
                  </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* <Footer /> */}

      {/* Modal */}
      {selectedProduct && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg relative shadow-lg h-[550px] flex flex-col">
      
      {/* Close Button */}
      <button
        className="absolute top-2 right-2 text-gray-600 text-2xl"
        onClick={() => setSelectedProduct(null)}
      >
        &times;
      </button>

      {/* Product Image (Fixed Size & Consistent) */}
      {selectedProduct.ProductImage?.url && (
        <div className="flex justify-center mb-4">
          <Image
            src={`http://localhost:1337${selectedProduct.ProductImage.formats?.medium?.url || selectedProduct.ProductImage.url}`}
            alt={selectedProduct.ProductName}
            width={500}
            height={240} // Ensure a uniform height
            className="w-full h-60 object-cover rounded-md transition-transform duration-300 transform hover:scale-105"
          />
        </div>
      )}

      {/* Scrollable Content */}
      <div className="overflow-y-auto flex-1 p-2">
        <h3 className="text-3xl font-bold text-gray-900 mt-4">
          {selectedProduct.ProductName}
        </h3>
        <p className="text-gray-700 mt-3 text-left px-4">{selectedProduct.ProductDescription}</p>
      </div>
    </div>
  </div>
)}

    </section>
  );
}
