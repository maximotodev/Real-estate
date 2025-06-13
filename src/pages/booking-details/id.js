import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const BookingDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [booking, setBooking] = useState({
    _id: id,
    propertyTitle: 'Downtown Apartment',
    status: 'confirmed',
    checkInDate: '2024-06-15',
    checkOutDate: '2024-06-20',
    guestCount: 2,
    nights: 5,
    pricePerNight: 150,
    serviceFee: 37.50,
    totalPrice: 787.50,
    guestName: 'John Doe',
    guestEmail: 'john@example.com',
    guestPhone: '+1234567890',
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    transactionId: 'TXN123456',
  });
  const [activeTab, setActiveTab] = useState('overview');

  const statusColor = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <>
      <Head>
        <title>Booking Details</title>
      </Head>

      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Booking #{booking._id?.slice(-6)}</h1>
              <p className="text-gray-600 mt-2">{booking.propertyTitle}</p>
            </div>
            <span className={`px-4 py-2 rounded-full font-semibold text-sm ${statusColor[booking.status]}`}>
              {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
            </span>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex border-b">
              {['overview', 'guest', 'payment', 'timeline'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-4 font-semibold ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="p-8">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Check-in</p>
                      <p className="text-lg font-semibold">{new Date(booking.checkInDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Check-out</p>
                      <p className="text-lg font-semibold">{new Date(booking.checkOutDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Guests</p>
                      <p className="text-lg font-semibold">{booking.guestCount}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Nights</p>
                      <p className="text-lg font-semibold">{booking.nights}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4">Price Breakdown</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>${booking.pricePerNight} × {booking.nights} nights</span>
                        <span>${(booking.pricePerNight * booking.nights).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service Fee</span>
                        <span>${booking.serviceFee?.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 font-bold">
                        <span>Total</span>
                        <span className="text-blue-600 text-lg">${booking.totalPrice?.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'guest' && (
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Guest Name</p>
                    <p className="text-lg font-semibold">{booking.guestName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Email</p>
                    <p>{booking.guestEmail}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Phone</p>
                    <p>{booking.guestPhone}</p>
                  </div>
                </div>
              )}

              {activeTab === 'payment' && (
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Payment Method</p>
                    <p className="text-lg font-semibold">{booking.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Status</p>
                    <p className="text-lg font-semibold text-green-600">{booking.paymentStatus}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Transaction ID</p>
                    <p className="font-mono">{booking.transactionId}</p>
                  </div>
                </div>
              )}

              {activeTab === 'timeline' && (
                <div className="space-y-4">
                  {[{ status: 'Booking Created', icon: '📝' }, { status: 'Payment Confirmed', icon: '✅' }].map((e, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="text-2xl">{e.icon}</div>
                      <p className="font-semibold">{e.status}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetailsPage;
