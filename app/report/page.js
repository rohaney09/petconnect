"use client";

import Link from "next/link";
import { useState } from "react";
import React from "react";

const page = () => {
const [form, setForm] = useState({
  type: '',
  petType: '',
  petName: '',
  location: '',
  description: '',
  contact: '',
  photo: null,
  previewUrl: ''
});


  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, photo: file, previewUrl: reader.result });
    };
    reader.readAsDataURL(file);
  }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let photoUrl = "";

    // Upload image to Cloudinary
    if (form.photo) {
      const data = new FormData();
      data.append("file", form.photo);
      data.append("upload_preset", "your_upload_preset"); // replace with your Cloudinary upload preset

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const img = await res.json();
      photoUrl = img.secure_url;
    }

    // Send form to API route
    const res = await fetch("/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, photoUrl }),
    });

    const response = await res.json();

    if (response.success) {
      alert("✅ Pet Report Submitted!");
      setForm({
        type: "",
        petName: "",
        location: "",
        description: "",
        contact: "",
        photo: null,
      });
    } else {
      alert("❌ Submission failed.");
      console.error(response);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-pink-600 mb-4 text-center">
          📝 Report a Pet
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Help the community by reporting a lost or found pet.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Status</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border text-black border-gray-300 rounded-xl px-4 py-2"
            >
              <option>-Select-</option>
              <option>Lost</option>
              <option>Found</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700">Pet Type</label>
            <select
              name="petType"
              value={form.petType || ""}
              onChange={handleChange}
              className="w-full border text-black border-gray-300 rounded-xl px-4 py-2"
            >
              <option value="">-Select Pet Type-</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Panda">Panda</option>
              <option value="Birds">Birds</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700">Pet Name</label>
            <input
              type="text"
              name="petName"
              value={form.petName}
              onChange={handleChange}
              placeholder="E.g., Tomy"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-black"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="City or area"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-black"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Color, breed, collar, etc."
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-black"
              rows="3"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Contact Info
            </label>
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="Phone or email"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-black"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Pet Photo
            </label>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-white text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200"
              // onChange={(e) => setForm({ ...form, photo: e.target.files[0] })}
               onChange={handleImageChange}
            />
            {form.previewUrl && (
  <img
    src={form.previewUrl}
    alt="Pet Preview"
    className="w-full h-48 object-cover rounded-xl mt-2"
  />
)}

          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white rounded-xl py-3 font-semibold hover:bg-pink-600 transition"
          >
            Submit Report
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-600 hover:underline cursor:pointer ">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
