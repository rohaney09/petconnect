import React from 'react';
import Link from 'next/link';

const page = () => {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-100 to-pink-100 py-20 px-6 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">📞 Contact Us</h1>
        <p className="text-gray-700 text-lg">We’re here to help you connect with lost pets and their owners.</p>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          {/* Info Card */}
          <div className="bg-blue-50 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">📬 Reach Us Directly</h2>
            <ul className="space-y-4 text-gray-700 text-lg">
              <li>
                📱 <span className="font-medium">Phone:</span> <a href="tel:+918889344914" className="hover:underline">+91 88893 44914</a>
              </li>
              <li>
                📧 <span className="font-medium">Email:</span> <a href="mailto:petconnect@gmail.com" className="hover:underline">petconnect@gmail.com</a>
              </li>
              <li>
                🕐 <span className="font-medium">Support Hours:</span> 9 AM – 6 PM (Mon – Sat)
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">📨 Send Us a Message</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              ></textarea>
              <button
                type="submit"
                className="bg-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

    </>
  );
};

export default page;
