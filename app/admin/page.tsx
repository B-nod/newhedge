"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Testimonial } from "../../lib/entities/Testimonial";

export default function AdminDashboard() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "approved" | "pending">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust as needed

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/testimonials/all");
      if (!response.ok) throw new Error("Failed to fetch testimonials");
      const data = await response.json();
      setTestimonials(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filter changes
  }, [filter]);

  const handleApprove = async (id: number) => {
    setActionLoading(id);
    try {
      const response = await fetch("/api/testimonials", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error("Failed to approve testimonial");

      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, approved: true } : t))
      );
      toast.success("Testimonial approved successfully");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to approve testimonial"
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    setActionLoading(id);
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete testimonial");

      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      toast.success("Testimonial deleted successfully");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete testimonial"
      );
    } finally {
      setActionLoading(null);
    }
  };

  const filteredTestimonials = testimonials.filter((t) =>
    filter === "all" ? true : filter === "approved" ? t.approved : !t.approved
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTestimonials = filteredTestimonials.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-red-500 bg-red-100 p-4 rounded-lg flex items-center gap-2">
          Error: {error}
          <button
            onClick={fetchTestimonials}
            className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const signOut = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* logout button */}
        <button
          onClick={() => signOut()}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600"
        >
          Logout
        </button>
        <div className="flex justify-between items-center mb-6 flex-wrap gap-y-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Testimonials Management
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("approved")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === "approved"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === "pending"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Pending
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table
            className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm"
            role="grid"
            aria-labelledby="testimonials-heading"
          >
            <caption id="testimonials-heading" className="sr-only">
              Testimonials Management Table
            </caption>
            <thead>
              <tr className="bg-gray-50">
                <th
                  scope="col"
                  className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b"
                >
                  Message
                </th>
                <th
                  scope="col"
                  className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {paginatedTestimonials.length === 0 ? (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td
                      colSpan={6}
                      className="py-4 px-4 text-center text-gray-500"
                    >
                      No testimonials found
                    </td>
                  </motion.tr>
                ) : (
                  paginatedTestimonials.map((testimonial) => (
                    <motion.tr
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`${
                        testimonial.approved ? "bg-green-50" : "bg-yellow-50"
                      } hover:bg-gray-100`}
                      role="row"
                    >
                      <td className="py-3 px-4 border-b text-gray-800">
                        #{testimonial.id}
                      </td>
                      <td className="py-3 px-4 border-b text-gray-800">
                        {testimonial.name}
                      </td>
                      <td className="py-3 px-4 border-b text-gray-600 truncate max-w-xs">
                        {testimonial.message}
                      </td>
                      <td className="py-3 px-4 border-b text-gray-800">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            testimonial.approved
                              ? "bg-green-200 text-green-800"
                              : "bg-yellow-200 text-yellow-800"
                          }`}
                        >
                          {testimonial.approved ? "Approved" : "Pending"}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b text-gray-600">
                        {new Date(testimonial.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 border-b space-x-2 text-gray-600">
                        {!testimonial.approved && (
                          <button
                            onClick={() => handleApprove(testimonial.id)}
                            disabled={actionLoading === testimonial.id}
                            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium text-white ${
                              actionLoading === testimonial.id
                                ? "bg-blue-300 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                            }`}
                            aria-label={`Approve testimonial ${testimonial.id}`}
                          >
                            {actionLoading === testimonial.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Check className="w-4 h-4" />
                            )}
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(testimonial.id)}
                          disabled={actionLoading === testimonial.id}
                          className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium text-white ${
                            actionLoading === testimonial.id
                              ? "bg-red-300 cursor-not-allowed"
                              : "bg-red-500 hover:bg-red-600"
                          }`}
                          aria-label={`Delete testimonial ${testimonial.id}`}
                        >
                          {actionLoading === testimonial.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <X className="w-4 h-4" />
                          )}
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredTestimonials.length)}{" "}
              of {filteredTestimonials.length} testimonials
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1 ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    aria-label={`Go to page ${page}`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1 ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                aria-label="Next page"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
