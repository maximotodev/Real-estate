import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const ComparePage = () => {
  const [selectedProperties, setSelectedProperties] = useState([
    {
      _id: '1',
      title: 'Downtown Apartment',
      city: 'New York',
      type: 'Apartment',
      bedrooms: 2,
      bathrooms: 1,
      pricePerNight: 150,
      amenities: ['WiFi', 'Parking', 'AC'],
      rating: 4.8,
      reviews: 24,
    },
    {
      _id: '2',
      title: 'Beach House',
      city: 'Miami',
      type: 'House',
      bedrooms: 3,
      bathrooms: 2,
      pricePerNight: 250,
      amenities: ['WiFi', 'Pool', 'AC', 'Garden'],
      rating: 4.9,
      reviews: 45,
    },
  ]);

  const removeProperty = (id) => {
    setSelectedProperties(selectedProperties.filter((p) => p._id !== id));
  };

  if (selectedProperties.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No Properties Selected</h1>
          <p className="text-gray-600 mb-6">Select properties from your wishlist to compare them</p>
          <Link href="/wishlist">
            <a className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Go to Wishlist
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Compare Properties - Real Estate</title>
        <meta name="description" content="Compare your favorite properties side by side" />
      </Head>

      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Compare Properties</h1>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left font-semibold text-gray-900 sticky left-0 bg-gray-100">Feature</th>
                  {selectedProperties.map((prop) => (
                    <th key={prop._id} className="px-6 py-4 text-center">
                      <div className="flex flex-col gap-2">
                        <p className="font-semibold text-gray-900">{prop.title}</p>
                        <button
                          onClick={() => removeProperty(prop._id)}
                          className="text-red-600 hover:text-red-700 text-sm font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-900 bg-gray-50 sticky left-0">Price/Night</td>
                  {selectedProperties.map((prop) => (
                    <td key={prop._id} className="px-6 py-4 text-center text-2xl font-bold text-blue-600">
                      ${prop.pricePerNight}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-900 bg-gray-50 sticky left-0">Type</td>
                  {selectedProperties.map((prop) => (
                    <td key={prop._id} className="px-6 py-4 text-center text-gray-700">
                      {prop.type}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-900 bg-gray-50 sticky left-0">Location</td>
                  {selectedProperties.map((prop) => (
                    <td key={prop._id} className="px-6 py-4 text-center text-gray-700">
                      {prop.city}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-900 bg-gray-50 sticky left-0">Bedrooms</td>
                  {selectedProperties.map((prop) => (
                    <td key={prop._id} className="px-6 py-4 text-center text-gray-700">
                      {prop.bedrooms}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-900 bg-gray-50 sticky left-0">Bathrooms</td>
                  {selectedProperties.map((prop) => (
                    <td key={prop._id} className="px-6 py-4 text-center text-gray-700">
                      {prop.bathrooms}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-900 bg-gray-50 sticky left-0">Rating</td>
                  {selectedProperties.map((prop) => (
                    <td key={prop._id} className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-yellow-400">★</span>
                        <span className="font-semibold text-gray-900">{prop.rating}</span>
                        <span className="text-gray-600 text-sm">({prop.reviews})</span>
                      </div>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-900 bg-gray-50 sticky left-0">Amenities</td>
                  {selectedProperties.map((prop) => (
                    <td key={prop._id} className="px-6 py-4">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {prop.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="px-6 py-4 bg-gray-50 sticky left-0"></td>
                  {selectedProperties.map((prop) => (
                    <td key={prop._id} className="px-6 py-4 text-center">
                      <Link href={`/properties/${prop._id}`}>
                        <a className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm">
                          View Details
                        </a>
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComparePage;
