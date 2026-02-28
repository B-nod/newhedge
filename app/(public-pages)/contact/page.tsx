"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="">
      {/* Banner */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-[url('/banner/banner-bg.webp')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="relative text-center text-white z-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Contact Us</h1>
          <p className="text-gray-200">Home / Contact</p>
        </motion.div>
      </section>

      {/* Contact Info + Map */}
      <section className="py-16 px-4 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            //
          >
            <h2 className="text-3xl font-bold text-green-700 mb-8">
              Get in Touch
            </h2>
            <ul className="space-y-6">
              <li className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-full text-green-700">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Our Office
                  </h3>
                  <p className="text-gray-600">
                    12 Leesands Close, Fulwood, Preston, PR2 9AJ, England
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Company Number: 16502919
                  </p>
                </div>
              </li>

              {/* email */}
              <li className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-full text-green-700">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                  <a
                    href="mailto:Hedgetovan@gmail.com"
                    className="text-green-600 hover:underline"
                  >
                    Hedgetovan@gmail.com
                  </a>
                </div>
              </li>

              <li className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-full text-green-700">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    WhatsApp
                  </h3>
                  <a
                    href="https://wa.me/447346279113"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    +44 7346 279113
                  </a>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            //
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2356.1234567890123!2d-2.7000000000000006!3d53.800000000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b02c1f2e3e3e1%3A0x1234567890abcdef!2s12%20Leesands%20Close%2C%20Fulwood%2C%20Preston%20PR2%209AJ%2C%20UK!5e0!3m2!1sen!2suk!4v1234567890123!5m2!1sen!2suk"
              height="920"
              loading="lazy"
              className="w-full h-[620px]"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
