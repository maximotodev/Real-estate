import React, { useState } from 'react';

const DateRangePicker = ({ onSelect, minDate = new Date() }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [nights, setNights] = useState(0);

  const handleStartDateChange = (e) => {
    const date = e.target.value;
    setStartDate(date);

    if (date && endDate) {
      const start = new Date(date);
      const end = new Date(endDate);
      const nightCount = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setNights(Math.max(1, nightCount));
      onSelect?.({ startDate: date, endDate, nights: Math.max(1, nightCount) });
    }
  };

  const handleEndDateChange = (e) => {
    const date = e.target.value;
    setEndDate(date);

    if (startDate && date) {
      const start = new Date(startDate);
      const end = new Date(date);
      const nightCount = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setNights(Math.max(1, nightCount));
      onSelect?.({ startDate, endDate: date, nights: Math.max(1, nightCount) });
    }
  };

  const handleClear = () => {
    setStartDate('');
    setEndDate('');
    setNights(0);
  };

  const minDateString = minDate.toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Select Dates</h3>

      <div className="space-y-4">
        {/* Check-in Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Check-in</label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            min={minDateString}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <p className="text-xs text-gray-600 mt-1">Select your arrival date</p>
        </div>

        {/* Check-out Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Check-out</label>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            min={startDate || minDateString}
            disabled={!startDate}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <p className="text-xs text-gray-600 mt-1">Select your departure date</p>
        </div>

        {/* Night Count */}
        {nights > 0 && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Total Nights</span>
              <span className="text-2xl font-bold text-blue-600">{nights}</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleClear}
            disabled={!startDate && !endDate}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear
          </button>
          <button
            disabled={!startDate || !endDate}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
