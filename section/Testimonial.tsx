"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Testimonial } from "../types/testimonial";

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialSection({
  testimonials,
}: TestimonialSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play functionality with useCallback to memoize the handler
  const handleNextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(handleNextSlide, 5000);
    return () => clearInterval(timer);
  }, [handleNextSlide]);

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  // Ensure testimonials is not empty to avoid errors
  if (!testimonials || testimonials.length === 0) {
    return <div>No testimonials available.</div>;
  }
  return (
    <section
      id="testimonials"
      className="grid grid-cols-1 lg:grid-cols-2 padding-responsive !pb-0 border-b-2 border-black/50"
    >
      {/* Left Side - Image and Info */}
      <div className="relative flex flex-col">
        <div className="relative h-[400px] overflow-hidden">
          <Image
            src="/testimonial/testimonial.webp"
            alt="Our clients"
            fill
            className="object-cover"
            priority // Preload the image for better performance
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-green-900/80" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 lg:p-16 text-start"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl mx-auto">
              Our clients say
            </h2>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-green-900 text-white text-start px-8 sm:px-12 lg:px-16 flex-1 flex flex-col  py-12"
        >
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
            We work with big and small.
          </h3>
          <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-xl mb-4">
            Whether you contract with us to install a drainage system or a
            full-featured landscape design and installation, you&apos;ll always
            get what you pay for.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button className="bg-green-700 mr-auto hover:bg-green-600 text-white rounded-full px-8 py-3 text-base sm:text-lg font-medium shadow-lg transition-all duration-300">
              View All Testimonials
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side - Testimonial Slider */}
      <div className="bg-[#F5F1E8] px-6 sm:px-8 lg:px-12 xl:px-16 py-6 flex flex-col justify-center items-center">
        <div className="max-w-2xl w-full">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex justify-center"
          >
            <div className="relative">
              <svg
                className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 text-green-700"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="30"
                  y="20"
                  width="45"
                  height="30"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <rect
                  x="15"
                  y="35"
                  width="45"
                  height="30"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <path d="M 20 65 L 15 72 L 25 65 Z" fill="currentColor" />
                <line
                  x1="35"
                  y1="28"
                  x2="65"
                  y2="28"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="35"
                  y1="35"
                  x2="60"
                  y2="35"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="20"
                  y1="43"
                  x2="50"
                  y2="43"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="20"
                  y1="50"
                  x2="55"
                  y2="50"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <ThumbsUp
                  className="absolute bottom-0 right-0 w-10 h-10"
                  strokeWidth={2.5}
                />
              </svg>
            </div>
          </motion.div>

          <div className="relative overflow-hidden flex items-center">
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="w-full text-center"
              >
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-900 leading-relaxed mb-8 sm:mb-10">
                  &quot;{testimonials[currentIndex].message}&quot;
                </p>
                <div className="flex justify-center gap-1 sm:gap-2 mb-4 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-2xl sm:text-3xl text-gray-900"
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                <p className="text-sm sm:text-base font-semibold text-gray-700 tracking-wider">
                  — {testimonials[currentIndex].name}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-3 sm:gap-4 my-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className="group relative"
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <motion.div
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-green-700 scale-110"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
                {index === currentIndex && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute -inset-2 border-2 border-green-700 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
