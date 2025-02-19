"use client";
import React, { useState } from "react";
import { FaLeaf, FaBalanceScale, FaChartLine, FaGlobe } from "react-icons/fa";
import Image from "next/image";

interface StrapiImage {
  url: string | null;
  alternativeText?: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
  };
}
interface Vision {
  id: number;
  VisionTitle: string;
  VisionContent: string;
  VisionIcon: StrapiImage,
  Slug: string;
}
interface VisionListProps {
  metrics: Vision[];
}

export default function Metrics({metrics}:VisionListProps){
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // const metrics = [
  //   {
  //     title: "Our Impact",
  //     description:
  //       "Our focus is on creating measurable reductions in carbon emissions by integrating AI-driven solutions that optimize energy use, streamline processes, and promote sustainable practices across industries.",
  //     icon: <FaLeaf className="text-4xl text-green-600" />,
  //   },
  //   {
  //     title: "Neutrality",
  //     description:
  //       "By 2030, we are committed to achieving net-zero emissions across all of our operations and projects. This goal will be supported by advanced tracking, carbon offset programs, and energy-efficient technologies.",
  //     icon: <FaBalanceScale className="text-4xl text-blue-600" />,
  //   },
  //   {
  //     title: "Growth",
  //     description:
  //       "We will drive long-term, sustainable growth by developing cutting-edge AI tools to optimize resource management, reduce waste, and empower organizations to make data-driven decisions for a greener future.",
  //     icon: <FaChartLine className="text-4xl text-yellow-600" />,
  //   },
  //   {
  //     title: "Key Metrics",
  //     description:
  //       "Our success will be measured by the amount of carbon saved, the energy efficiency improvements we achieve, and the number of companies we partner with to integrate sustainable AI solutions.",
  //     icon: <FaGlobe className="text-4xl text-purple-600" />,
  //   },
  // ];

  return (
    <div className="relative bg-gray-100 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#0e2342] mb-6 sm:mb-8">
          Our Vision
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`flex flex-col items-center rounded-lg shadow-lg p-6 bg-white transition-all duration-1000 hover:bg-white ${
                hoveredIndex === index
                  ? "opacity-100 max-h-[400px] overflow-hidden"
                  : "opacity-100 max-h-[150px]"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Icon */}
              {metric.VisionIcon.url ? ( // here checking if metric has VisionIcon's url
                <Image
                  src={`http://localhost:1337${metric.VisionIcon.formats?.medium?.url || metric.VisionIcon.url}`}
                  alt={metric.VisionIcon.alternativeText || "Vision Icon"}
                  width={150} // Smaller width
                  height={75} // Smaller height
                  className="w-[100px] sm:w-[150px] h-[50px] sm:h-[75px] object-contain"
                />


              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  No Image Available
                </div>
              )}
              <div>
              {/* Title */}
              <div className="text-xl text-[#0e2342] font-semibold">
                {metric.VisionTitle}
              </div>

              {/* Description (Only Shown for Hovered Item) */}
              <div
                className={`text-md text-gray-700 mt-3 text-center transition-all duration-1000 ease-in-out overflow-hidden ${
                  hoveredIndex === index
                    ? "opacity-100 max-h-[400px] mt-4 overflow-hidden"
                    : "opacity-0 max-h-0"
                }`}
              >
                {metric.VisionContent}
              </div>
              </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

