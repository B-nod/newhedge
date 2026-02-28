import Section from "../../../components/Section";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-green-50 to-white">
        <div className="text-center py-20">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your Outdoor Space
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Professional landscaping services to create and maintain beautiful
            outdoor environments
          </p>
          <div className="space-x-4">
            <Link
              href="/contact"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/services"
              className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              Our Services
            </Link>
          </div>
        </div>
      </Section>

      {/* Featured Services */}
      <Section
        title="Our Services"
        description="Professional landscaping services tailored to your needs"
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
      </Section>

      {/* Call to Action */}
      <Section className="bg-green-600 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and lets bring your vision
            to life.
          </p>
          <Link
            href="/contact"
            className="bg-white text-green-700 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-medium transition-colors inline-block"
          >
            Contact Us
          </Link>
        </div>
      </Section>
    </main>
  );
}
