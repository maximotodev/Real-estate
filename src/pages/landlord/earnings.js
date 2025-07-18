import React, { useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../../hooks/useAuth';

const LandlordEarningsPage = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [timeRange, setTimeRange] = useState('month');
  const [earnings, setEarnings] = useState({
    total: 24500,
    thisMonth: 4200,
    thisWeek: 980,
    pending: 1200,
  });

  const chartData = [
    { month: 'Jan', earnings: 3200 },
    { month: 'Feb', earnings: 3800 },
    { month: 'Mar', earnings: 4100 },
    { month: 'Apr', earnings: 3900 },
    { month: 'May', earnings: 4200 },
    { month: 'Jun', earnings: 4500 },
  ];

  const transactions = [
    { id: 1, date: '2024-05-18', property: 'Downtown Apartment', amount: 280, type: 'booking', status: 'completed' },
    { id: 2, date: '2024-05-17', property: 'Beach House', amount: 420, type: 'booking', status: 'completed' },
    { id: 3, date: '2024-05-16', property: 'Downtown Apartment', amount: 280, type: 'booking', status: 'pending' },
    { id: 4, date: '2024-05-15', property: 'Mountain Villa', amount: 550, type: 'booking', status: 'completed' },
    { id: 5, date: '2024-05-14', property: 'Downtown Apartment', amount: -5, type: 'refund', status: 'completed' },
  ];

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h1>
        </div>
      </div>
    );
  }

  const maxEarning = Math.max(...chartData.map((d) => d.earnings));

  return (
    <>
      <Head>
        <title>Earnings - Landlord Dashboard</title>
        <meta name="description" content="Track your rental earnings" />
      </Head>

      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Earnings</h1>
            <p className="text-gray-600 mt-1">Track your rental income and financial performance</p>
          </div>

          {/* Earnings Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm mb-2">Total Earnings</p>
              <p className="text-4xl font-bold text-blue-600">${earnings.total.toLocaleString()}</p>
              <p className="text-xs text-gray-600 mt-2">All time</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm mb-2">This Month</p>
              <p className="text-4xl font-bold text-green-600">${earnings.thisMonth.toLocaleString()}</p>
              <p className="text-xs text-gray-600 mt-2">May 2024</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm mb-2">This Week</p>
              <p className="text-4xl font-bold text-purple-600">${earnings.thisWeek.toLocaleString()}</p>
              <p className="text-xs text-gray-600 mt-2">May 12-18</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm mb-2">Pending</p>
              <p className="text-4xl font-bold text-orange-600">${earnings.pending.toLocaleString()}</p>
              <p className="text-xs text-gray-600 mt-2">Under review</p>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-lg shadow p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Earnings Trend</h2>
            <div className="flex items-end justify-between gap-2 h-64">
              {chartData.map((item) => (
                <div key={item.month} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gray-200 rounded-t relative overflow-hidden" style={{ height: `${(item.earnings / maxEarning) * 100}%` }}>
                    <div className="w-full h-full bg-gradient-to-t from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 transition-colors"></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{item.month}</p>
                  <p className="text-xs font-semibold text-gray-900">${item.earnings}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Time Range Filter */}
          <div className="flex gap-2 mb-6">
            {[
              { value: 'week', label: 'Week' },
              { value: 'month', label: 'Month' },
              { value: 'year', label: 'Year' },
              { value: 'all', label: 'All Time' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setTimeRange(option.value)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  timeRange === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Transactions */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Recent Transactions</h2>
            </div>

            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Property</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{new Date(tx.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{tx.property}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        tx.type === 'booking' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {tx.type === 'booking' ? 'Booking' : 'Refund'}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-right font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.amount > 0 ? '+' : ''} ${Math.abs(tx.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        tx.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {tx.status === 'completed' ? 'Completed' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Payout Info */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Payout Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 text-sm mb-2">Bank Account</p>
                <p className="font-semibold text-gray-900">****1234</p>
                <p className="text-xs text-gray-600 mt-1">Checking Account</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-2">Next Payout</p>
                <p className="font-semibold text-gray-900">May 25, 2024</p>
                <p className="text-xs text-gray-600 mt-1">Automatic transfer on Fridays</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandlordEarningsPage;
