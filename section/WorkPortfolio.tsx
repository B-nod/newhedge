"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  keyPoints: string[];
  gallery: string[];
}

const projects: Project[] = [
  {
    id: "1",
    title: "Hedge Trimming & Lawn Care",
    description: "Professional care for hedges and lawns all year round.",
    location: "London",
    keyPoints: [
      "Regular & one-off hedge trimming",
      "Lawn mowing & edging",
      "Scarification & aeration",
      "Weed control & feeding",
      "Leaf clearance in autumn",
    ],

    gallery: [
      "/services/1/1.jpeg",
      "/services/1/2.jpeg",
    ],
  },
  {
    id: "2",
    title: "Landscaping",
    description: "Complete garden transformations and modern outdoor spaces.",
    location: "Manchester",
    keyPoints: [
      "Garden design & planning",
      "Patios, paths & flag laying",
      "Turfing & artificial grass",
      "Gravel, slate & wood chip areas",
      "Raised beds & sleeper walls",
    ],
    gallery: ["/services/2/land.jpeg"],
  },
  {
    id: "3",
    title: "Fence Installation, Repair & Painting",
    description: "Installation, repair and finishing of fencing and decking.",
    location: "Birmingham",
    keyPoints: [
      "New fence & gate installation",
      "Fence & deck repairs",
      "Pressure-treated timber",
      "Fence painting & staining",
      "Decking cleaning & sealing",
    ],
    gallery: ["/services/3/1.jpeg"],
  },
  {
    id: "4",
    title: "Tree Cutting",
    description: "Safe pruning and removal of small to medium garden trees.",
    location: "Leeds",
    keyPoints: [
      "Crown reduction & thinning",
      "Tree pruning & shaping",
      "Small tree felling",
      "Deadwood removal",
      "Sectional dismantling",
    ],
    gallery: [
      "/services/4/1.jpeg",
      "/services/4/2.jpeg",
      "/services/4/3.jpeg",
    ],
  },

  {
    id: "5",
    title: "Transport & Removal",
    description: "Man-with-a-van style transport and moving help.",
    location: "Bristol",
    keyPoints: [
      "Furniture & appliance moves",
      "House / flat clear-outs",
      "Garden shed / greenhouse moves",
      "Single item collection",
      "Short & long distance",
    ],
    gallery: [
      "/services/5/1.webp",
      "/services/5/2.webp",
    ],
  },
  {
    id: "6",
    title: "Power Wash & Drainage Maintenance",
    description: "Deep cleaning of outdoor surfaces and structures.",
    location: "Sheffield",
    keyPoints: [
      "Driveways & patios",
      "Decking & fencing",
      "Garden furniture & play areas",
      "Paths & block paving",
      "Moss & algae removal",
    ],
    gallery: ["/services/6/1.jpeg"],
  },
];

export default function WorksPortfolioSection() {
  return (
    <section id="gallery" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <p className="text-sm font-medium text-gray-600 mb-4 tracking-wider uppercase">
            Our Recent Works
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Expertise in Landscape Design &{" "}
            <span className="text-emerald-600">Garden Care</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
        >
          <AnimatePresence>
            {projects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                delay={idx * 0.08}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  delay: number;
}

function ProjectCard({ project, delay }: ProjectCardProps) {
  const mainImage = project.gallery[0];

  return (
    <Link href="/gallery#gallery" className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        layout
        className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300 aspect-[4/3] sm:aspect-[3/4] lg:aspect-[4/5]"
      >
        <Image
          src={mainImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
          <div className="flex items-center gap-1.5 text-white/95 text-xs sm:text-sm mb-2">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" aria-hidden />
            <span>{project.location}</span>
          </div>
          <h3 className="text-white text-xl sm:text-2xl font-bold drop-shadow-md mb-1.5">
            {project.title}
          </h3>
          <p className="text-white/90 text-sm sm:text-base line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Hover hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="px-6 py-3 bg-white/20 backdrop-blur-md text-white font-medium rounded-full text-sm sm:text-base">
            View Gallery →
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
