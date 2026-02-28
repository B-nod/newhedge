"use client";

import { motion } from "framer-motion";
import { ChevronUp, Facebook, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function FooterSection() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const year = new Date().getFullYear();
  // Show scroll to top button when scrolled down
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setShowScrollTop(window.scrollY > 300);
    });
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#F5F1E8]  padding-responsive px-4 sm:px-6 overflow-hidden">
      {/* Decorative Leaf Illustrations */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 sm:w-80 lg:w-96 opacity-[0.08] pointer-events-none">
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            //
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M200 350 Q150 280, 180 200 Q210 280, 200 350 M180 200 Q120 240, 80 200 Q120 160, 180 200 M180 200 Q150 120, 180 50 Q210 120, 180 200 M180 200 Q240 160, 280 200 Q240 240, 180 200"
            stroke="#2D5016"
            strokeWidth="3"
            fill="none"
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            //
            transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
            d="M180 50 Q150 80, 120 60 M180 50 Q210 80, 240 60"
            stroke="#2D5016"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 sm:w-80 lg:w-96 opacity-[0.08] pointer-events-none">
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M200 350 Q150 280, 180 200 Q210 280, 200 350 M180 200 Q120 240, 80 200 Q120 160, 180 200 M180 200 Q150 120, 180 50 Q210 120, 180 200 M180 200 Q240 160, 280 200 Q240 240, 180 200"
            stroke="#2D5016"
            strokeWidth="3"
            fill="none"
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
            d="M180 50 Q150 80, 120 60 M180 50 Q210 80, 240 60"
            stroke="#2D5016"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8 sm:mb-10"
        >
          {/* Tree Icon */}
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-green-800"
            viewBox="0 0 40 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              d="M20 5 Q15 15, 20 25 Q25 15, 20 5 M20 25 Q12 30, 8 25 M20 25 Q28 30, 32 25 M20 25 L20 55 M18 55 L22 55"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <motion.ellipse
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              cx="20"
              cy="15"
              rx="6"
              ry="10"
              fill="currentColor"
              opacity="0.3"
            />
          </svg>

          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="w-32 h-28"
          />

          {/* <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            landscaping
          </h2> */}
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-2 mb-8 sm:mb-10"
        >
          <p className="text-gray-700 text-base sm:text-lg">
            Call Us:{" "}
            <a href="tel:07346279113" className="font-semibold">
              07346 279 113
            </a>
          </p>
          <p className="text-gray-600 text-sm sm:text-base">
            12 Leesands Close, Fulwood, Preston, PR2 9AJ, England
          </p>
        </motion.div>

        {/* Social Media Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-4 sm:gap-6 mb-8 sm:mb-10"
        >
          {/* Houzz Icon */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="text-green-800 hover:text-green-700 transition-colors"
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" />
            </svg>
          </motion.a>
          {/* Pinterest Icon */}

          {/* Facebook Icon */}
          <motion.a
            href="https://www.facebook.com/p/Hedge-Gardening-And-Van-Services-61577099914404/"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="text-green-800 hover:text-green-700 transition-colors"
          >
            <Facebook className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" />
          </motion.a>

          {/* Instagram Icon */}
        </motion.div>

        {/* Copyright and Credits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-gray-600 text-xs sm:text-sm space-y-1"
        >
          <p>© {year} Hedge Gardening & Van Services. All rights reserved.</p>
          <p>
            Proudly powered by{" "}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-800 hover:text-green-700 font-medium transition-colors"
            >
              Foxbeat
            </a>
            .
          </p>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-green-800 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-colors duration-300"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6" />
      </motion.button>
      <motion.a
        initial={{ opacity: 0 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0,
        }}
        href="https://wa.me/447346279113"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-9 w-12 h-12 bg-green-800 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-colors duration-300"
        aria-label="Scroll to top"
      >
        <MessageCircleMore className="w-24 h-24 sm:w-16 h-16-12" />
      </motion.a>
    </footer>
  );
}
