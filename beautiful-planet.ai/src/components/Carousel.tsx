"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface StrapiImage {
  url: string | null;
  alternativeText?: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
  };
}

interface Slide {
  id: number;
  Title: string;
  Summary: string;
  Carousel: StrapiImage;
  Slug: string;
}

// here defining that props are of type array which contains entries as of Slide as defined above
interface CarouselProps {
  slides: Slide[];
}

export default function Carousel({ slides }: CarouselProps) { // here accepting props as array passed from page.tsx file
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false); // state to control transitions
  const carouselRef = useRef<HTMLDivElement>(null);

  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];
  // slides[slides.length - 1] → The last slide is added at the beginning.
  // ...slides → All slides are added in the middle.
  // slides[0] -> first slide is added at the end

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
  };

   // useEffect(() => {
  //   let interval: NodeJS.Timeout; // NodeJS.Timeout is a type used in Typescript to ensure that it returns time

  //   if (slides && slides.length > 0) {
  //     interval = setInterval(nextSlide, 5000); // ensures that nextSlide function runs after every 5 sec.
  //   }

  //   return () => clearInterval(interval);
  // }, [slides]); // stops when slides array changes or component unmounts

  // for smooth changing of slides 
  useEffect(() => {
    const timeout = setTimeout(() => {
      // slides numbering
      if (currentSlide === extendedSlides.length - 1) {
        setCurrentSlide(1);
      } else if (currentSlide === 0) {
        setCurrentSlide(extendedSlides.length - 2);
      }
      setIsTransitioning(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [currentSlide, extendedSlides.length]);

  return (
    <div className="relative overflow-hidden w-full h-[500px] sm:h-[600px]">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        ref={carouselRef}
      >
        {/* display of data by traversing to all the slides */}
        {extendedSlides.map((slide, index) => (
          <div key={index} className="min-w-full flex-shrink-0 relative">
            {slide.Carousel.url ? ( // here checking if slide has Carousel's url
              <Image
                src={`http://localhost:1337${slide.Carousel.formats?.medium?.url || slide.Carousel.url}`}
                alt={slide.Carousel.alternativeText || "Carousel Image"}
                width={500}
                height={300}
                className="w-full h-[500px] sm:h-[600px] object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                No Image Available
              </div>
            )}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4 bg-black bg-opacity-40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1 }}
                  className="text-white"
                >
                  <h1 className="text-3xl sm:text-5xl font-bold drop-shadow-2xl">
                    {slide.Title}
                  </h1>
                  <p className="mt-2 sm:mt-4 text-sm sm:text-lg drop-shadow-2xl">
                    {slide.Summary}
                  </p>
                  <button className="mt-4 sm:mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-full text-sm sm:text-lg font-semibold">
                    GET STARTED
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute left-3 sm:left-5 right-3 sm:right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <button onClick={prevSlide} className="btn btn-circle text-xl sm:text-2xl">
          ❮
        </button>
        <button onClick={nextSlide} className="btn btn-circle text-xl sm:text-2xl">
          ❯
        </button>
      </div>

      {/* Circular button types at bottom of carousel */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
              currentSlide === index + 1 ? "bg-white" : "bg-gray-400"
            } transition`}
          />
        ))}
      </div>
    </div>
  );
}