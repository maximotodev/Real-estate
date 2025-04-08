import React, { useState } from 'react';
import Link from 'next/link';

const BookingCard = ({ booking, userType = 'guest' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const calculateNights = () => {
    const checkIn = new Date(booking.checkInDate);
    const checkOut = new Date(booking.checkOutDate);
    return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              <Link href={`/properties/${booking.propertyId}`}>
                <a className="hover:text-blue-600 transition-colors">{booking.propertyTitle}</a>
              </Link>
            </h3>
            <p className="text-sm text-gray-600">Booking ID: {booking._id}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>

        {/* Date and Nights */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Check In</p>
              <p className="text-sm font-bold text-gray-900">{formatDate(booking.checkInDate)}</p>
            </div>
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Check Out</p>
              <p className="text-sm font-bold text-gray-900">{formatDate(booking.checkOutDate)}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3 text-center">{nights} night{nights !== 1 ? 's' : ''}</p>
        </div>

        {/* Guest/Property Info */}
        {userType === 'guest' ? (
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Guest</p>
            <p className="text-sm text-gray-900">{booking.guestName}</p>
          </div>
        ) : (
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Guest</p>
            <p className="text-sm text-gray-900">{booking.guestName}</p>
            <p className="text-xs text-gray-600 mt-1">{booking.guestEmail}</p>
          </div>
        )}

        {/* Expandable Details */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2 text-blue-600 hover:text-blue-700 font-semibold text-sm mb-4 flex items-center justify-center gap-2"
        >
          <span>{isExpanded ? 'Hide' : 'Show'} Details</span>
          <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Guests</p>
                <p className="text-sm text-gray-900">{booking.guestCount}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Rooms</p>
                <p className="text-sm text-gray-900">{booking.roomsBooked || 1}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Price Breakdown</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">${booking.pricePerNight}/night × {nights} nights</span>
                  <span className="font-semibold">${(booking.pricePerNight * nights).toFixed(2)}</span>
                </div>
                {booking.serviceFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-semibold">${booking.serviceFee.toFixed(2)}</span>
                  </div>
                )}
                {booking.tax > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">${booking.tax.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <span className="font-bold">Total</span>
                  <span className="text-lg font-bold text-blue-600">${booking.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {booking.notes && (
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Notes</p>
                <p className="text-sm text-gray-700">{booking.notes}</p>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="border-t border-gray-200 pt-4 flex gap-3">
          <Link href={`/bookings/${booking._id}`}>
            <a className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold text-sm">
              View Booking
            </a>
          </Link>
          {booking.status === 'pending' && (
            <button className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-semibold text-sm">
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
