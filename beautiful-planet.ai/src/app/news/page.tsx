"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import InnerNavbar from "@/components/InnerNavbar";
import Footer from "@/components/Footer";

interface NewsPost {
  id: number;
  Header: string;
  Summary: string;
  Slug: string;
  Link: string;
  Previewimage?: {
    url: string;
    formats?: { medium?: { url: string } };
  };
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("http://localhost:1337/api/news-posts?populate=*");
        const data = await res.json();
        console.log(data);

        if (!res.ok) throw new Error("Failed to fetch news");

        setNews(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading news...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div>
      <div className="max-w-6xl mx-auto p-6">
        <InnerNavbar />
        <h1 className="text-4xl font-bold text-center mb-10 text-[#0e2342] mt-4">Latest News and Updates</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {news.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
            >
              {post.Previewimage?.url ? (
                <Image
                  src={`http://localhost:1337${post.Previewimage.formats?.medium?.url || post.Previewimage.url}`}
                  alt={post.Header}
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
                <h2 className="text-2xl font-semibold text-gray-900">{post.Header}</h2>
                <p className="text-gray-600 mt-2">{post.Summary || "No summary available."}</p>
                <button
                  onClick={() => window.open(post.Link, "_blank")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-700 transition"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}