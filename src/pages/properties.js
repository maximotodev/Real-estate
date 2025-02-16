import Head from 'next/head';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    propertyType: '',
    search: '',
  });
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.city) params.append('city', filters.city);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.bedrooms) params.append('bedrooms', filters.bedrooms);
      if (filters.propertyType) params.append('propertyType', filters.propertyType);
      if (filters.search) params.append('search', filters.search);
      params.append('page', page);
      params.append('limit', 12);

      const response = await axios.get(`/api/properties?${params}`);
      setProperties(response.data.properties);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProperties(1);
  };

  const addToWishlist = async (propertyId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to save properties');
        return;
      }

      await axios.post(
        '/api/wishlist',
        { propertyId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Added to wishlist!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to add to wishlist');
    }
  };

  return (
    <>
      <Head>
        <title>Properties - Real Estate</title>
      </Head>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Find Your Perfect Property</h1>

          {/* Search & Filters */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                  <input
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="Search properties..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                    placeholder="City"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="Min"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Max"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                  <select
                    name="bedrooms"
                    value={filters.bedrooms}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    name="propertyType"
                    value={filters.propertyType}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600"
                  >
                    <option value="">Any</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="studio">Studio</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
              >
                Search Properties
              </button>
            </form>
          </div>

          {/* Properties Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <p className="text-xl text-gray-600">Loading properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <p className="text-xl text-gray-600">No properties found</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {properties.map((property) => (
                  <div key={property._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                    {property.images?.length > 0 && (
                      <img src={property.images[0]} alt={property.title} className="w-full h-48 object-cover" />
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">{property.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{property.address}</p>

                      <div className="flex justify-between items-center mt-4">
                        <div>
                          <p className="text-3xl font-bold text-blue-600">${property.price}</p>
                          {property.pricePerMonth && <p className="text-sm text-gray-500">per month</p>}
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{property.bedrooms} Beds</p>
                          <p className="text-sm text-gray-600">{property.bathrooms || 'N/A'} Baths</p>
                        </div>
                      </div>

                      {property.rating > 0 && (
                        <p className="text-sm text-yellow-500 mt-2">
                          ⭐ {property.rating.toFixed(1)} ({property.totalReviews} reviews)
                        </p>
                      )}

                      <div className="flex gap-2 mt-4">
                        <a
                          href={`/properties/${property._id}`}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center transition duration-200"
                        >
                          View Details
                        </a>
                        <button
                          onClick={() => addToWishlist(property._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                          title="Save to Wishlist"
                        >
                          ❤️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2">
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => fetchProperties(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                      pagination.page === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-800 border border-gray-300 hover:border-blue-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <ToastContainer position="bottom-center" autoClose={3000} />
      </div>
    </>
  );
};

export default Properties;
