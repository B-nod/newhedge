import { Testimonial } from "../../../lib/entities/Testimonial";
import TestimonialsPage from "./pages";

// dynamic fetch
export const dynamic = "force-dynamic";

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
      `${baseUrl}/api/testimonials/all?approved=true`
      // {
      //   next: { revalidate: 3600 }, // Revalidate every hour
      // }
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

const Index = async () => {
  const fetchedTestimonials = await getTestimonials();
  const testimonials =
    fetchedTestimonials.length > 0
      ? fetchedTestimonials
      : [
    {
      id: 9,
      name: "Thomas Davies",
      message:
        "I couldn't be happier with the service from Hedge Gardening & Van Services Ltd. They transformed my overgrown hedge and lawn in a single day — professional, reliable and tidy throughout. The team even helped with garden waste removal using their van, which was a huge time-saver. Exceptional work at a very fair price!",
      approved: true,
      createdAt: new Date("2025-06-13"),
    },
    {
      id: 8,
      name: "Jack Wilson",
      message:
        "The team were friendly, punctual and clearly know what they're doing. From landscape design suggestions to mowing and hedge shaping, everything was done with care and precision. They left my garden looking neat and inviting, and I'll definitely be booking them again for future seasonal maintenance.",
      approved: true,
      createdAt: new Date("2025-04-22"),
    },
    {
      id: 7,
      name: "David Jones",
      message:
        "I used their tree cutting service and couldn't be happier with the results. The team was professional, efficient, and worked safely throughout. They cleared everything away afterwards, leaving the garden neat and tidy. Excellent service from start to finish — highly recommended!",
      approved: true,
      createdAt: new Date("2025-10-03"),
    },
    {
      id: 6,
      name: "James Robinson",
      message:
        "I'm really pleased with the work done on my shed. The transformation is incredible – it looks brand new and the finish is excellent. The team was professional, reliable, and left everything clean and tidy. I'd definitely recommend their services to anyone looking for quality workmanship and attention to detail.",
      approved: true,
      createdAt: new Date("2026-02-02"),
    },
    {
      id: 5,
      name: "Henry Thompson",
      message:
        "I'm extremely happy with the power washing service. The difference is unbelievable — my driveway and patio look fresh and spotless again. I would highly recommend their service to anyone wanting to refresh their outdoor spaces.",
      approved: true,
      createdAt: new Date("2025-05-09"),
    },
  ];

  return (
    <div>
      <TestimonialsPage testimonials={testimonials} />
    </div>
  );
};

export default Index;
