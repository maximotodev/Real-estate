import Image from 'next/image';
import React, { useState } from 'react';
import userImg from '../assets/images/user1.png';
import userImg1 from '../assets/images/user2.png';
import userImg2 from '../assets/images/user3.png';

const REVIEWS = [
  {
    id: 1,
    name: 'Herbert Lindsey',
    location: 'New York, USA',
    rating: 5,
    date: 'March 2024',
    text: 'Thank you very much for the house found. This is an ideal option for our family — great location, fair price, and the team were real professionals who guided us every step of the way.',
    image: userImg,
    property: 'Downtown Apartment',
  },
  {
    id: 2,
    name: 'Noah Russell',
    location: 'Los Angeles, USA',
    rating: 5,
    date: 'February 2024',
    text: 'Found our dream home in less than two weeks. The search filters are incredibly detailed, and the booking process was seamless. Highly recommend to anyone looking for premium rentals.',
    image: userImg1,
    property: 'Ocean View Villa',
  },
  {
    id: 3,
    name: 'Nellie Griffith',
    location: 'Chicago, USA',
    rating: 4,
    date: 'January 2024',
    text: 'Very impressed with the quality of listings and how responsive the landlords are. The platform made comparing properties side by side incredibly easy. Will definitely use again.',
    image: userImg2,
    property: 'City Studio',
  },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ))}
  </div>
);

const Review = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="reviews" className="py-24 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full mb-4">
            Reviews
          </span>
          <h2 className="text-4xl font-bold text-blue-900 dark:text-white">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm">
            Real stories from real customers who found their perfect property through Constructor.
          </p>

          {/* Overall Rating */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <div className="flex gap-1">
              {[1,2,3,4,5].map((s) => (
                <svg key={s} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
            <span className="text-lg font-bold text-gray-800 dark:text-white">4.8</span>
            <span className="text-gray-500 text-sm">based on 5,200+ reviews</span>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, index) => (
            <article
              key={review.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col gap-4 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start">
                <StarRating rating={review.rating} />
                <span className="text-xs text-gray-400">{review.date}</span>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                &quot;{review.text}&quot;
              </p>

              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <Image
                  src={review.image}
                  alt={review.name}
                  width={44}
                  height={44}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.location}</p>
                </div>
                <span className="ml-auto text-xs text-blue-500 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                  {review.property}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/about"
            className="inline-block px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-lg transition-colors text-sm"
          >
            Read All Reviews
          </a>
        </div>
      </div>
    </section>
  );
};

export default Review;
