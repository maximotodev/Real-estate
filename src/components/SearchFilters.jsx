import React, { useState, useCallback } from 'react';

export const SearchFilters = ({ onFilter, loading = false }) => {
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    propertyType: 'all',
    sortBy: 'newest',
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleApplyFilters = () => {
    if (onFilter) {
      onFilter(filters);
    }
    setIsOpen(false);
  };

  const handleReset = () => {
    setFilters({
      search: '',
      city: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      propertyType: 'all',
      sortBy: 'newest',
    });
  };

  const propertyTypes = ['Apartment', 'House', 'Villa', 'Condo', 'Townhouse', 'Studio'];
  const bedroomOptions = [1, 2, 3, 4, 5, '6+'];

  return (
    <div className="w-full">
      {/* Mobile Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold flex items-center justify-between"
        >
          <span>Filters & Search</span>
          <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      {/* Filter Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block bg-white rounded-lg shadow-lg p-6 mb-6`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="Property name, title..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleChange}
              placeholder="Enter city..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Min Price</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              placeholder="Min..."
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Max Price</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="Max..."
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Bedrooms */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Bedrooms</label>
            <select
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="">Any</option>
              {bedroomOptions.map((num) => (
                <option key={num} value={num}>
                  {num} Bedroom{num !== 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Property Type</label>
            <select
              name="propertyType"
              value={filters.propertyType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Types</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type.toLowerCase()}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleApplyFilters}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Apply Filters'}
          </button>
          <button
            onClick={handleReset}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
