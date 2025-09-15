"use client";

import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AnimatedPinDemo } from "./Location";

export default function Contactus() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  //@ts-ignore
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //@ts-ignore
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Thank you for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950  flex flex-col items-center py-12 px-4">
      {/* Header */}
      <div className="max-w-2xl text-center mb-12 ">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-300 mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-500">
          Have questions or feedback? We’d love to hear from you. Fill out the
          form below or reach us directly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 shadow-lg rounded-2xl p-8 space-y-6 md:h-[600px] "
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-500">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-500">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-500">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              placeholder="Subject"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-500">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              //@ts-ignore
              rows="4"
              className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              placeholder="Write your message..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col justify-between space-y-8">
          <div className="bg-white dark:bg-slate-900 shadow-lg rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-2">📍 Pune, India</p>
            <p className="text-gray-600 mb-2">📞 +91 9209741510</p>
            <p className="text-gray-600">✉️ support@healthai.com</p>
          </div>

          <div className="bg-white dark:bg-slate-900 shadow-lg rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4 dark:text-gray-400 text-2xl">
              <Link
                href="https://twitter.com"
                target="_blank"
                className="hover:text-sky-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="hover:text-pink-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                className="hover:text-red-500 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="hover:text-blue-700 dark:hover:text-blue-500 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <AnimatedPinDemo />
        </div>
      </div>
    </div>
  );
}
