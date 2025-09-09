import React from 'react';
import Link from 'next/link';

const SERVICE_ITEMS = [
  {
    icon: '🏠',
    title: 'Houses',
    description: 'Single-family homes, townhouses, and detached properties in premium neighborhoods.',
    count: '2,400+ listings',
    href: '/search?type=house',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: '🏢',
    title: 'Apartments',
    description: 'Studio to 5-bedroom apartments across city centers and suburbs.',
    count: '4,800+ listings',
    href: '/search?type=apartment',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: '🏖️',
    title: 'Villas',
    description: 'Luxury villas with private pools, ocean views, and concierge services.',
    count: '680+ listings',
    href: '/search?type=villa',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: '🏬',
    title: 'Offices',
    description: 'Co-working spaces, private offices, and commercial units for businesses.',
    count: '1,100+ listings',
    href: '/search?type=office',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: '🏗️',
    title: 'Warehouses',
    description: 'Industrial storage units, logistics hubs, and commercial warehouses.',
    count: '320+ listings',
    href: '/search?type=warehouse',
    color: 'bg-red-50 text-red-600',
  },
  {
    icon: '🅿️',
    title: 'Parking',
    description: 'Secure monthly parking spots in garages and open-air lots near key areas.',
    count: '900+ listings',
    href: '/search?type=parking',
    color: 'bg-yellow-50 text-yellow-600',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 px-4 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full mb-4">
            Services
          </span>
          <h2 className="text-4xl font-bold text-blue-900 dark:text-white">
            Services for Maximum Efficiency
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm">
            From studio apartments to full warehouses — we have every property type covered. Find exactly what your lifestyle or business needs.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {SERVICE_ITEMS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col gap-3"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${item.color} group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">{item.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
              <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs text-gray-400">{item.count}</span>
                <span className="text-xs font-semibold text-blue-600 group-hover:underline">Browse →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* How It Works */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-blue-900 dark:text-white mb-10">
            How It Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Search & Filter', desc: 'Use our advanced search to find properties matching your budget, location, and requirements.' },
              { step: '02', title: 'Book a Viewing', desc: 'Schedule a visit or request a virtual tour directly through the platform.' },
              { step: '03', title: 'Move In', desc: 'Complete the booking online, sign the agreement, and get the keys — all in one place.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
