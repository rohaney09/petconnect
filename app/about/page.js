import React from 'react';
import Link from 'next/link';

const Page = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-100 to-blue-100 py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">🐾 About PetConnect</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          PetConnect is a heartfelt initiative to reunite lost pets with their families. We believe in the power of community, compassion, and technology to bring tails back home.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold text-pink-600 mb-4">🎯 Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our mission is simple — to create a reliable platform where people can quickly report and find missing or found pets. Every pet deserves to feel safe, loved, and home.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-blue-600 mb-4">🌟 Our Vision</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              We envision a world where no pet is ever truly lost. With the help of technology and a caring community, PetConnect strives to make pet recovery fast, easy, and successful.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 px-6 bg-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">🐶 Who We Are</h2>
          <p className="text-gray-700 text-lg mb-4">
            We are a passionate team of animal lovers, tech enthusiasts, and community advocates.
          </p>
          <p className="text-gray-700 text-lg">
            Whether it&rsquo;s building intuitive features or spreading awareness, we&rsquo;re committed to making a difference in the lives of pets and their humans.
          </p>
        </div>
      </section>
    </>
  );
};

export default Page;
