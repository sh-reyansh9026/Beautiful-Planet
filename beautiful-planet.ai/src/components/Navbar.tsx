"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

function Navbar({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 ${className}`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-1 bg-white md:backdrop-blur rounded-md mt-2">
        {/* Logo on the Left */}
       <div className="flex-shrink-0 ">
        <Link href="/" className="flex flex-wrap group relative ">
          <Image 
            src="/logo.png" 
            alt="Home" 
            width={50} 
            height={50} 
            className="transition-transform duration-300"
            priority
          />
          <div className="m-1 mt-3 text-gray-800 font-bold transition-transform duration-300">
            Beautiful Planet.AI
          </div>
        </Link>
      </div>


        {/* Desktop Navigation Links */}
        <div className="hidden md:flex flex-grow justify-center ">
          <div className="flex space-x-6 font-medium">
            <Link href="/" className="text-gray-900 hover:text-green-700 text-xl font-bold">Home</Link>
            <Link href="/about" className="text-gray-900 hover:text-green-700 text-xl font-bold">About</Link>
            <Link href="/" className="text-gray-900 hover:text-green-700 text-xl font-bold">Sustainability Services</Link>
            <Link href="/blogs" className="text-gray-900 hover:text-green-700 text-xl font-bold">Blogs & News</Link>
            <Link href="/contact" className="text-gray-900 hover:text-green-700 text-xl font-bold">Contact Us</Link>
          </div>
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          className="md:hidden text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-white/10 backdrop-blur-lg mt-2 p-4 space-y-4 rounded-lg shadow-md text-white">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-gray-900 font-bold hover:text-green-700">Home</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="text-gray-900 font-bold hover:text-green-700">About</Link>
          <Link href="/" onClick={() => setIsOpen(false)} className="text-gray-900 font-bold hover:text-green-700">Sustainability Services</Link>
          <Link href="/blogs" onClick={() => setIsOpen(false)} className="text-gray-900 font-bold hover:text-green-700">Blogs & News</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="text-gray-900 font-bold hover:text-green-700">Contact Us</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;




