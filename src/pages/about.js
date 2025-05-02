import React from 'react';
import Head from 'next/head';

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About Us - Real Estate</title>
        <meta name="description" content="Learn about our mission, vision, and team" />
      </Head>

      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-4">About Real Estate</h1>
            <p className="text-xl opacity-90">Connecting people with their perfect homes since 2020</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Mission Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To revolutionize the real estate industry by providing a transparent, user-friendly platform that connects renters and landlords. We believe everyone deserves access to quality properties at fair prices.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to make property rental simple, secure, and rewarding for both guests and hosts around the world.
              </p>
            </div>
            <div className="bg-blue-100 rounded-lg p-8 flex items-center justify-center">
              <svg className="w-32 h-32 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2.393-7.8A1 1 0 016.416 3h11.168a1 1 0 01.973.6l2.393 7.8M3 12a9 9 0 1018 0m-9 9v-6m0 0l3 3m-3-3l-3 3" />
              </svg>
            </div>
          </div>

          {/* Vision Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="bg-green-100 rounded-lg p-8 flex items-center justify-center order-last md:order-first">
              <svg className="w-32 h-32 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We envision a world where finding the perfect property is easy, secure, and accessible to everyone. A world where trust and transparency are the foundation of every transaction.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By leveraging technology and innovation, we're building a platform that empowers users and creates meaningful connections between hosts and guests globally.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Trust', description: 'Building trust through transparency and honest communication' },
                { title: 'Innovation', description: 'Constantly evolving to meet our users\' needs' },
                { title: 'Excellence', description: 'Delivering exceptional service in every interaction' },
                { title: 'Community', description: 'Creating a vibrant global community of hosts and guests' },
              ].map((value) => (
                <div key={value.title} className="bg-white rounded-lg shadow-md p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-blue-600 text-white rounded-lg p-12 mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">By The Numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-5xl font-bold mb-2">50K+</p>
                <p className="text-lg opacity-90">Active Users</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">10K+</p>
                <p className="text-lg opacity-90">Listed Properties</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">25K+</p>
                <p className="text-lg opacity-90">Successful Bookings</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">4.8★</p>
                <p className="text-lg opacity-90">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Sarah Johnson', role: 'CEO & Co-founder', image: '👩‍💼' },
                { name: 'Michael Chen', role: 'CTO & Co-founder', image: '👨‍💻' },
                { name: 'Emma Rodriguez', role: 'Head of Operations', image: '👩‍💼' },
                { name: 'James Wilson', role: 'Head of Customer Success', image: '👨‍💼' },
              ].map((member) => (
                <div key={member.name} className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="text-5xl mb-4">{member.image}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gray-100 rounded-lg p-12 text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-gray-700 mb-6 text-lg">Have questions? We'd love to hear from you</p>
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
