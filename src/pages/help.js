import React, { useState } from 'react';
import Head from 'next/head';

const HelpPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('guests');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const helpCategories = {
    guests: {
      label: 'For Guests',
      icon: '🏠',
      articles: [
        {
          title: 'How do I search for properties?',
          content: 'Use the search bar at the top to enter your location, dates, and preferences. You can also use advanced filters to refine your search by price, amenities, property type, and more.',
        },
        {
          title: 'How do I make a booking?',
          content: 'Once you find a property you like, click "Book Now", select your check-in and check-out dates, and follow the checkout process. Payment will be securely processed.',
        },
        {
          title: 'What if I need to cancel my booking?',
          content: 'You can cancel your booking from your bookings page. Refund eligibility depends on our cancellation policy - 100% for 7+ days notice, 50% for 3-7 days, and 0% for less than 3 days.',
        },
        {
          title: 'How do I contact the host?',
          content: 'You can send a message to the host by clicking the "Contact Host" button on the property page. The host will receive your message and can respond directly.',
        },
        {
          title: 'Is my payment information secure?',
          content: 'Yes, all payments are encrypted using industry-standard SSL security. Your credit card information is never stored on our servers.',
        },
      ],
    },
    hosts: {
      label: 'For Hosts',
      icon: '🏢',
      articles: [
        {
          title: 'How do I list my property?',
          content: 'Go to your landlord dashboard, click "Add Property", and fill in the details including title, description, photos, amenities, and pricing. Your property will be reviewed and activated within 24-48 hours.',
        },
        {
          title: 'What information do I need to provide?',
          content: 'You need to provide property details, at least 5 high-quality photos, a list of amenities, house rules, cancellation policy, and pricing per night.',
        },
        {
          title: 'How do I set my pricing?',
          content: 'Set your base price per night in the property settings. You can also offer seasonal pricing and discounts for longer stays.',
        },
        {
          title: 'How do I receive payments?',
          content: 'Payments are processed automatically and transferred to your bank account within 5-7 business days after checkout.',
        },
        {
          title: 'Can I manage multiple properties?',
          content: 'Yes, you can list as many properties as you want. Manage them all from your landlord dashboard with detailed analytics for each.',
        },
      ],
    },
    technical: {
      label: 'Technical Issues',
      icon: '🔧',
      articles: [
        {
          title: 'The website is not loading properly',
          content: 'Try clearing your browser cache and cookies, or use a different browser. Make sure you have JavaScript enabled. If the problem persists, contact support.',
        },
        {
          title: 'I forgot my password',
          content: 'Click "Forgot Password" on the login page, enter your email, and follow the instructions sent to your inbox to reset your password.',
        },
        {
          title: 'I cannot upload photos',
          content: 'Ensure your image files are less than 10MB and in a supported format (JPG, PNG, WEBP). Try uploading one image at a time.',
        },
        {
          title: 'The app is slow',
          content: 'Check your internet connection speed. Try refreshing the page or restarting your browser. If slowness persists, try clearing your cache.',
        },
        {
          title: 'I\'m having payment issues',
          content: 'Ensure your payment method is valid and has sufficient funds. Try using a different card or payment method. Contact support if issues continue.',
        },
      ],
    },
    billing: {
      label: 'Billing & Payments',
      icon: '💳',
      articles: [
        {
          title: 'What are the service fees?',
          content: 'We charge a 5% service fee on the base price of each booking. Additionally, applicable local taxes are calculated at checkout.',
        },
        {
          title: 'When will I receive my refund?',
          content: 'Refunds are processed within 5-7 business days to your original payment method. You\'ll receive email confirmation when the refund is initiated.',
        },
        {
          title: 'What payment methods do you accept?',
          content: 'We accept all major credit cards, debit cards, PayPal, Apple Pay, and Google Pay.',
        },
        {
          title: 'Can I change my payment method?',
          content: 'Yes, you can update your payment method in your account settings. Changes will apply to future bookings.',
        },
        {
          title: 'How is the total price calculated?',
          content: 'Total price = (Price per night × Number of nights) + Service fee + Taxes - Any discounts applied.',
        },
      ],
    },
  };

  const currentCategory = helpCategories[selectedCategory];

  return (
    <>
      <Head>
        <title>Help Center - Real Estate</title>
        <meta name="description" content="Get help and support for using our platform" />
      </Head>

      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        {/* Hero */}
        <div className="bg-blue-600 text-white py-12 mb-12">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-xl opacity-90">Find answers and get support</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {Object.entries(helpCategories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedCategory(key);
                  setExpandedIndex(null);
                }}
                className={`p-4 rounded-lg text-center transition-all ${
                  selectedCategory === key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-900 border border-gray-200 hover:shadow'
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <p className="font-semibold text-sm">{category.label}</p>
              </button>
            ))}
          </div>

          {/* Articles List */}
          <div className="space-y-3">
            {currentCategory.articles.map((article, index) => (
              <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                >
                  <h3 className="font-semibold text-gray-900">{article.title}</h3>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {expandedIndex === index && (
                  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <p className="text-gray-700 leading-relaxed">{article.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Still need help?</h2>
            <p className="mb-6 opacity-90">Our support team is available 24/7 to assist you</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="/contact" className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                Contact Us
              </a>
              <button className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors font-semibold border border-white">
                Start Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpPage;
