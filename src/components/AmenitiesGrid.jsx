import React from 'react';

const AmenitiesGrid = ({ amenities = [], columns = 2 }) => {
  const amenityIcons = {
    wifi: {
      icon: '📶',
      label: 'WiFi',
    },
    parking: {
      icon: '🅿️',
      label: 'Parking',
    },
    pool: {
      icon: '🏊',
      label: 'Swimming Pool',
    },
    gym: {
      icon: '💪',
      label: 'Gym',
    },
    kitchen: {
      icon: '🍳',
      label: 'Full Kitchen',
    },
    laundry: {
      icon: '🧺',
      label: 'Laundry',
    },
    ac: {
      icon: '❄️',
      label: 'Air Conditioning',
    },
    heating: {
      icon: '🔥',
      label: 'Heating',
    },
    tv: {
      icon: '📺',
      label: 'TV',
    },
    washer: {
      icon: '🚿',
      label: 'Washer',
    },
    dryer: {
      icon: '🔄',
      label: 'Dryer',
    },
    dishwasher: {
      icon: '🍽️',
      label: 'Dishwasher',
    },
    balcony: {
      icon: '🏠',
      label: 'Balcony/Patio',
    },
    garden: {
      icon: '🌳',
      label: 'Garden',
    },
    cctv: {
      icon: '📹',
      label: '24/7 Security',
    },
    pets: {
      icon: '🐕',
      label: 'Pets Allowed',
    },
  };

  if (!amenities || amenities.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No amenities listed</p>
      </div>
    );
  }

  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }[columns] || 'grid-cols-2';

  return (
    <div className={`grid ${gridColsClass} gap-4`}>
      {amenities.map((amenity, index) => {
        const amenityData = amenityIcons[amenity?.toLowerCase()] || {
          icon: '✓',
          label: amenity,
        };

        return (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-2xl">{amenityData.icon}</span>
            <span className="font-semibold text-gray-900">{amenityData.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default AmenitiesGrid;
