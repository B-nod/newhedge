"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Service = {
  title: string;
  description: string;
  keyPoints: string[];
  icon: string;
};

const services: Service[] = [
  {
    title: "Hedge Trimming & Lawn Care",
    description: "Professional care for hedges and lawns all year round.",
    icon: "🌿",
    keyPoints: [
      "Regular & one-off hedge trimming",
      "Lawn mowing & edging",
      "Scarification & aeration",
      "Weed control & feeding",
      "Leaf clearance in autumn",
    ],
  },
  {
    title: "Landscaping",
    description: "Complete garden transformations and modern outdoor spaces.",
    icon: "🏡",
    keyPoints: [
      "Garden design & planning",
      "Patios, paths & flag laying",
      "Turfing & artificial grass",
      "Gravel, slate & wood chip areas",
      "Raised beds & sleeper walls",
    ],
  },
  {
    title: "Fence Work & Painting",
    description: "Installation, repair and finishing of fencing and decking.",
    icon: "🪵",
    keyPoints: [
      "New fence & gate installation",
      "Fence & deck repairs",
      "Pressure-treated timber",
      "Fence painting & staining",
      "Decking cleaning & sealing",
    ],
  },
  {
    title: "Tree Cutting",
    description: "Safe pruning and removal of small to medium garden trees.",
    icon: "🌳",
    keyPoints: [
      "Crown reduction & thinning",
      "Tree pruning & shaping",
      "Small tree felling",
      "Deadwood removal",
      "Sectional dismantling",
    ],
  },

  {
    title: "Transport & Removal",
    description: "Man-with-a-van style transport and moving help.",
    icon: "🚚",
    keyPoints: [
      "Furniture & appliance moves",
      "House / flat clear-outs",
      "Garden shed / greenhouse moves",
      "Single item collection",
      "Short & long distance",
    ],
  },
  {
    title: "Power Wash & Cleaning",
    description: "Deep cleaning of outdoor surfaces and structures.",
    icon: "💦",
    keyPoints: [
      "Driveways & patios",
      "Decking & fencing",
      "Garden furniture & play areas",
      "Paths & block paving",
      "Moss & algae removal",
    ],
  },
];

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section
      id="services"
      className="py-12 lg:py-20 mt-24  overflow-hidden bg-[#F5F1E8]"
    >
      <div className="max-w-7xl mx-auto ">
        {/* Header - Centered */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4 sm:mb-8"
          >
            <p className="text-sm font-medium text-gray-600 mb-4 tracking-wider uppercase">
              Our Services
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Expert Garden &{" "}
              <span className="text-emerald-600">Landscaping</span> Solutions
            </h2>
          </motion.div>

          <p className="mt-6 text-lg text-stone-600 leading-relaxed">
            Transform your outdoor space with our comprehensive range of
            professional services tailored to your needs.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => {
            const isExpanded = expandedIndex === index;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={service.title}
                layout
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className={`
                  relative cursor-pointer rounded-2xl border transition-all duration-300
                  ${
                    isExpanded
                      ? "md:col-span-2 bg-white  shadow-lg"
                      : "bg-white/55 border-stone-200 hover:border-emerald-600 hover:shadow-md"
                  }
                `}
              >
                <div className="p-6">
                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div
                        className={`
                        w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300
                        ${isExpanded || isHovered ? "bg-emerald-100" : "bg-white/55"}
                      `}
                      >
                        {service.icon}
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h3
                          className={`
                          font-semibold text-lg transition-colors
                          ${isExpanded ? "text-emerald-700" : "text-stone-900"}
                        `}
                        >
                          {service.title}
                        </h3>
                        <p className="text-base text-stone-500 mt-0.5">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Expand Indicator */}
                    <div
                      className={`
                      w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300
                      ${
                        isExpanded
                          ? "bg-emerald-600 text-white rotate-90"
                          : "bg-stone-300 text-stone-800  "
                      }
                    `}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Expanded Content - Key Features */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-6 border-t border-stone-100">
                          <p className="text-base font-medium text-stone-700 mb-4">
                            Key Features
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {service.keyPoints.map((point, i) => (
                              <motion.div
                                key={point}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl"
                              >
                                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                </div>
                                <span className="text-base text-stone-700">
                                  {point}
                                </span>
                              </motion.div>
                            ))}
                          </div>

                          {/* CTA Button */}
                          <Link
                            href="/gallery#gallery"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-full hover:bg-emerald-700 transition-colors text-base"
                          >
                            View our gallery
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Subtle gradient overlay on hover */}
                <div
                  className={`
                  absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300
                  bg-gradient-to-br from-emerald-50/50 to-transparent
                  ${isHovered && !isExpanded ? "opacity-100" : "opacity-0"}
                `}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
