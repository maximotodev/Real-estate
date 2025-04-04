import React, { useState } from 'react';
import Image from 'next/image';

const ImageGallery = ({ images = [], title = 'Property' }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-600 font-semibold">No images available</p>
        </div>
      </div>
    );
  }

  const mainImage = images[selectedIndex];

  return (
    <>
      {/* Main Image */}
      <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden mb-4 cursor-pointer group" onClick={() => setIsLightboxOpen(true)}>
        <Image
          src={mainImage}
          alt={`${title} - Image ${selectedIndex + 1}`}
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
          </svg>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
              selectedIndex === index
                ? 'border-blue-500 ring-2 ring-blue-400'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            aria-label={`View image ${index + 1}`}
          >
            <Image
              src={image}
              alt={`${title} thumbnail ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95">
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 text-white rounded-full hover:bg-opacity-30 transition-colors z-10"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Main Image */}
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={mainImage}
              alt={`${title} - Lightbox`}
              layout="fill"
              objectFit="contain"
            />
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
            className="absolute left-4 p-3 bg-white bg-opacity-20 text-white rounded-full hover:bg-opacity-30 transition-colors"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
            className="absolute right-4 p-3 bg-white bg-opacity-20 text-white rounded-full hover:bg-opacity-30 transition-colors"
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm font-semibold">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
