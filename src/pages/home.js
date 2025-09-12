import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import About from '../components/about';
import Deals from '../components/deals';
import Services from '../components/services';
import Review from '../components/review';
import Insta from '../components/insta';
import Form from '../components/form';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import scrollIcon from '../assets/icons/topArrowIcon.png';

const FEATURED_CITIES = [
  { name: 'New York', properties: 1240, emoji: '🗽' },
  { name: 'Los Angeles', properties: 980, emoji: '🌴' },
  { name: 'Miami', properties: 760, emoji: '🏖️' },
  { name: 'Chicago', properties: 540, emoji: '🏙️' },
  { name: 'Austin', properties: 430, emoji: '🤠' },
  { name: 'Denver', properties: 310, emoji: '🏔️' },
];

const PLATFORM_STATS = [
  { value: '50,000+', label: 'Happy Customers' },
  { value: '10,000+', label: 'Active Listings' },
  { value: '25,000+', label: 'Bookings Made' },
  { value: '4.8★', label: 'Average Rating' },
];

const HomePage = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.pageYOffset > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Constructor - Real Estate Platform</title>
        <meta name="description" content="Find your perfect property. Browse thousands of verified apartments, houses, villas, and more across the country." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Constructor - Real Estate Platform" />
        <meta property="og:description" content="Find your perfect property with Constructor." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="dark:bg-bgDark">
        <Hero
          address="225 S 1st St Brooklyn, NY 11211"
          phone="(929) 123-4567"
          email="hello@constructor.re"
        />

        {/* Platform Stats Banner */}
        <div className="bg-blue-600 py-8">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {PLATFORM_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                <p className="text-blue-200 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <About
          cardTitle1="15 years"
          cardSubText1="in business"
          cardTitle2="$1 billion"
          cardSubText2="property brokered"
          cardTitle3="10,000"
          cardSubText3="transactions"
        />

        <Services />

        {/* Browse by City */}
        <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full mb-4">
                Locations
              </span>
              <h2 className="text-4xl font-bold text-blue-900 dark:text-white">Browse by City</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Explore top rental markets across the country</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {FEATURED_CITIES.map((city) => (
                <Link
                  key={city.name}
                  href={`/search?city=${encodeURIComponent(city.name)}`}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-5 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all group"
                >
                  <div className="text-3xl mb-3">{city.emoji}</div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-blue-600 transition-colors">{city.name}</p>
                  <p className="text-gray-400 text-xs mt-1">{city.properties.toLocaleString()} listings</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Deals />

        <Review />

        {/* Trust Banner */}
        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Constructor?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
              {[
                { icon: '🔒', title: 'Verified Listings', desc: 'Every property is verified by our team before going live.' },
                { icon: '💳', title: 'Secure Payments', desc: 'Book with confidence using our encrypted payment system.' },
                { icon: '🤝', title: '24/7 Support', desc: 'Our support team is available around the clock to help you.' },
              ].map((item) => (
                <div key={item.title} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-gray-700 flex items-center justify-center text-3xl mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Insta />
        <Form />
        <Footer />

        {/* Scroll to Top */}
        {showButton && (
          <div className="fixed bottom-24 right-6 z-50">
            <button
              onClick={handleScrollToTop}
              aria-label="Scroll to top"
              className="w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-700 shadow-xl flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
