import Image from "next/image";
import Link from "next/link";
import Section from "../components/Section";
import WhoWeAreSection from "../components/WhoAreWe";
import { Testimonial } from "../lib/entities/Testimonial";
import ServicesSection from "../section/service";
import TestimonialSection from "../section/Testimonial";
import WorksPortfolioSection from "../section/WorkPortfolio";

export const dynamic = "force-dynamic";

export default async function Home() {
  const fetchedTestimonials = await getTestimonials();
  const testimonials =
    fetchedTestimonials.length > 0
      ? fetchedTestimonials
      : [
          {
            id: 8,
            name: "Thomas Davies",
            message:
              "I couldn’t be happier with the service from Hedge Gardening & Van Services Ltd. They transformed my overgrown hedge and lawn in a single day — professional, reliable and tidy throughout. The team even helped with garden waste removal using their van, which was a huge time-saver. Exceptional work at a very fair price!",
            approved: true,
            createdAt: new Date("2025-06-13T00:00:00.000Z"),
          },
          {
            id: 7,
            name: "Jack Wilson",
            message:
              "The team were friendly, punctual and clearly know what they’re doing. From landscape design suggestions to mowing and hedge shaping, everything was done with care and precision. They left my garden looking neat and inviting, and I’ll definitely be booking them again for future seasonal maintenance.",
            approved: true,
            createdAt: new Date("2025-04-22T00:00:00.000Z"),
          },
          {
            id: 6,
            name: "David Jones",
            message:
              "I used their tree cutting service and couldn’t be happier with the results. The team was professional, efficient, and worked safely throughout. They cleared everything away afterwards, leaving the garden neat and tidy. Excellent service from start to finish — highly recommended!",
            approved: true,
            createdAt: new Date("2025-10-15T14:32:51.960Z"),
          },
          {
            id: 5,
            name: "James Robinson",
            message:
              "I’m really pleased with the work done on my shed. The transformation is incredible – it looks brand new and the finish is excellent. The team was professional, reliable, and left everything clean and tidy. I’d definitely recommend their services to anyone looking for quality workmanship and attention to detail.",
            approved: true,
            createdAt: new Date("2026-02-02T00:00:00.000Z"),
          },

          {
            id: 5,
            name: "Henry Thompson",
            message:
              "I’m extremely happy with the power washing service. The difference is unbelievable — my driveway and patio look fresh and spotless again.  I would highly recommend their service to anyone wanting to refresh their outdoor spaces.",
            approved: true,
            createdAt: new Date("2025-05-09T00:00:00.000Z"),
          },
        ];

  return (
    <main>
      {/* Hero Section */}
      <Section className="bg-[url('/banner/banner.webp')] bg-cover bg-top relative ">
        <div className="bg-black/30 p-6 rounded-xl w-full h-full absolute  inset-0" />
        <div className="text-center py-52  relative">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Hedge Gardening &amp; Van Services Ltd
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Friendly gardener with enthusiasm, professionalism &amp; proficiency
            Keeping your outdoor spaces tidy &amp; any removal needs hassle free
          </p>
          <div className="space-x-4 flex  justify-center items-center flex-wrap gap-2">
            <Link
              href="/contact"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/#services"
              className="border-2 border-green-600 text-white hover:bg-green-50 hover:text-green-600 px-8 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              Our Services
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-6">
          <Image
            src="/banner/banner-pattern.webp"
            alt="Banner"
            fill
            className="object-cover"
          />
        </div>
      </Section>

      {/* Featured Services */}
      <WhoWeAreSection />
      <ServicesSection />
      {/* <WhyChooseUsSection /> */}
      {/* <Section
        title="Our Services"
        description="Professional landscaping services tailored to your needs"
        className="bg-gray-600"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Garden Design",
              description:
                "Custom landscape designs that transform your outdoor space into a beautiful retreat.",
              icon: "🌿",
            },
            {
              title: "Lawn Care",
              description:
                "Comprehensive lawn maintenance to keep your yard healthy and vibrant all year round.",
              icon: "🌱",
            },
            {
              title: "Hardscaping",
              description:
                "Patios, walkways, and retaining walls to enhance your outdoor living space.",
              icon: "🧱",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </Section> */}

      <WorksPortfolioSection />

      <div className="text-center mt-24">
        {/* Header */}

        <p className="text-sm font-medium text-gray-600 mb-4 tracking-wider uppercase">
          Testimonials
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight max-w-4xl mx-auto px-4">
          What our clients say about{" "}
          <span className="text-emerald-600">our landscaping services</span>
        </h2>
        <TestimonialSection testimonials={testimonials} />
      </div>
      {/* <Section
        title="Testimonials"
        description="What our clients say about our landscaping services"
        className="bg-white"
      >
        <TestimonialsPage />
      </Section> */}

      {/* Call to Action */}

      {/* <InstagramFeed /> */}
    </main>
  );
}

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : (() => {
            const hostname =
              process.env.HOSTNAME && process.env.HOSTNAME !== "0.0.0.0"
                ? process.env.HOSTNAME
                : "localhost";
            return `http://${hostname}:${process.env.PORT || 3001}`;
          })());

    const response = await fetch(
      `${baseUrl}/api/testimonials/all?approved=true`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch testimonials");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}
