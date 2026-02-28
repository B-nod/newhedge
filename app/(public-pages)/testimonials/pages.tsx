"use client";

import { motion } from "framer-motion";
import TestimonialForm from "../../../components/TestimonialForm";
import { Testimonial } from "../../../lib/entities/Testimonial";

export default function TestimonialsPage({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <div className=" min-h-screen">
      {/* Banner */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-[url('/images/banner.webp')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="relative text-center text-white z-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Testimonials</h1>
          <p className="text-gray-200">Home / Testimonials</p>
        </motion.div>
      </section>
      <div className="max-w-7xl mx-auto padding-responsive">
        <div className="space-y-16">
          {/* Testimonials Grid */}
          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: testimonial.id * 0.1 }}
                  className="p-6 rounded-lg  transition-shadow duration-300"
                >
                  <div className="mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 font-bold text-xl">
                          {testimonial.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(testimonial.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic mb-4">
                    &quot;{testimonial.message}&quot;
                  </p>
                  <div className="flex justify-start gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-xl text-yellow-500"
                      >
                        ★
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No testimonials yet. Be the first to share your experience!
              </p>
            </div>
          )}

          {/* Testimonial Form */}
          <div className="mt-16 max-w-4xl mx-auto">
            <TestimonialForm />
          </div>
        </div>
      </div>
    </div>
  );
}
