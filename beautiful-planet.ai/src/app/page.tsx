"use client"; // converting to client component to implement loader functionality

import React, { useEffect, useState } from "react";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import Metrics from "@/components/Metrics";
import Loader from "@/components/Loader";
import ProductsPage from "@/app/products/page"; // Importing products page to be shown on home

// fetching Carousel data from strapi not a promise function
async function fetchCarousel() {
  const res = await fetch("http://localhost:1337/api/home-carousels?populate=*", { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch carousel data");
  }

  const data = await res.json();
  return data.data; // Extract data array
}

// fetching Vision data from strapi it is a promise function
async function fetchVision() {
  const res = await fetch("http://localhost:1337/api/our-visions?populate=*", {
    cache: "no-store", // Ensures fresh data on each request
  });

  if (!res.ok) {
    throw new Error("Failed to fetch vision");
  }

  const data = await res.json();
  return data.data; // Strapi wraps response in a "data" array
};

export default function Home() {
  const [slides, setSlides] = useState<any[]>([]);
  const [vision, setVision] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // State to manage loader visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching both carousel and vision data simultaneously for efficiency
        const [carouselData, visionData] = await Promise.all([fetchCarousel(), fetchVision()]);
        setSlides(carouselData);
        setVision(visionData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // set it false when data is fetched
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative h-[100vh]">
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Carousel */}
          <div className="relative">
            <Carousel slides={slides} />
          </div>

          {/* Our Vision */}
          <Metrics metrics={vision} />

          {/* Products Section from app/products/page.tsx */}
          <ProductsPage />

          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
}
