import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropertyCard from '../components/PropertyCard';
import SearchFilters from '../components/SearchFilters';

const SearchPage = () => {
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleSearch = async () => {
      if (!router.isReady) return;

      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams(router.query);
        params.set('page', currentPage);

        const response = await fetch(`/api/properties?${params}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Search failed');

        const data = await response.json();
        setProperties(data.data || []);
        setTotalResults(data.total || 0);
      } catch (err) {
        setError(err.message);
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, [router.isReady, router.query, currentPage]);

  const handleFilter = (filters) => {
    const query = new URLSearchParams();

    if (filters.search) query.set('search', filters.search);
    if (filters.city) query.set('city', filters.city);
    if (filters.minPrice) query.set('minPrice', filters.minPrice);
    if (filters.maxPrice) query.set('maxPrice', filters.maxPrice);
    if (filters.bedrooms) query.set('bedrooms', filters.bedrooms);
    if (filters.propertyType !== 'all') query.set('type', filters.propertyType);
    if (filters.sortBy) query.set('sort', filters.sortBy);

    setCurrentPage(1);
    router.push(`/search?${query.toString()}`);
  };

  const totalPages = Math.ceil(totalResults / 12);
  const searchQuery = router.query.search || 'all properties';

  return (
    <>
      <Head>
        <title>Search Properties - Real Estate</title>
        <meta name="description" content="Search and filter properties by location, price, and amenities" />
      </Head>

      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {router.query.search ? `Results for "${router.query.search}"` : 'Search Properties'}
            </h1>
            <p className="text-gray-600">
              {loading ? 'Searching...' : `Found ${totalResults} ${totalResults === 1 ? 'property' : 'properties'}`}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p className="font-semibold">Search Error</p>
              <p>{error}</p>
            </div>
          )}

          {/* Filters */}
          <SearchFilters onFilter={handleFilter} loading={loading} />

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center min-h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : properties.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <>
              {/* Properties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {properties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === i + 1
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
