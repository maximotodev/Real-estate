import React, { useState } from 'react';
import Head from 'next/head';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'Booking & Reservations',
      questions: [
        {
          q: 'How do I make a booking?',
          a: 'Browse properties, select your dates, and click "Book Now". You\'ll be guided through a simple checkout process. Your booking is confirmed once payment is received.',
        },
        {
          q: 'Can I modify my booking after confirmation?',
          a: 'Yes, you can modify your booking up to 7 days before check-in at no additional cost. Later modifications may incur extra fees.',
        },
        {
          q: 'What is your cancellation policy?',
          a: 'We offer flexible cancellation: 100% refund if cancelled 7+ days before check-in, 50% if 3-7 days before, and no refund if less than 3 days before.',
        },
        {
          q: 'Is there a service fee?',
          a: 'Yes, a 5% service fee is charged on the base price. Additionally, applicable local taxes are calculated at checkout.',
        },
      ],
    },
    {
      category: 'Payments & Refunds',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards, debit cards, PayPal, Apple Pay, and Google Pay for secure payments.',
        },
        {
          q: 'When will I receive my refund?',
          a: 'Refunds are processed within 5-7 business days to your original payment method. You\'ll receive a notification when the refund is initiated.',
        },
        {
          q: 'Is my payment information secure?',
          a: 'Yes, all payments are encrypted with industry-standard SSL security. We never store your full credit card details on our servers.',
        },
      ],
    },
    {
      category: 'Account & Safety',
      questions: [
        {
          q: 'How do I verify my account?',
          a: 'You can verify your account by confirming your email and phone number. We also offer additional verification options like ID verification for added security.',
        },
        {
          q: 'How do you ensure guest and host safety?',
          a: 'We verify all users, provide secure messaging, offer liability coverage, and respond quickly to safety concerns through our 24/7 support team.',
        },
        {
          q: 'Can I delete my account?',
          a: 'Yes, you can delete your account anytime from your account settings. All personal data will be removed after the deletion period.',
        },
      ],
    },
    {
      category: 'Properties & Listings',
      questions: [
        {
          q: 'How can I list my property?',
          a: 'Create an account, click "List a Property", and follow the step-by-step guide. Add photos, description, amenities, and pricing to get started.',
        },
        {
          q: 'What information do I need to provide?',
          a: 'You\'ll need property details, photos (at least 5), amenities list, house rules, cancellation policy, and pricing information.',
        },
        {
          q: 'How long does it take for my listing to be approved?',
          a: 'Most listings are approved within 24-48 hours. We may request additional information or photos for premium listings.',
        },
      ],
    },
    {
      category: 'Communication & Support',
      questions: [
        {
          q: 'Can I message the host before booking?',
          a: 'Yes! Click "Contact Host" on any property page to send a message. Hosts typically respond within 24 hours.',
        },
        {
          q: 'How do I contact customer support?',
          a: 'You can reach our support team via email, phone, or live chat available 24/7. Use the support button in your account menu.',
        },
        {
          q: 'How are disputes resolved?',
          a: 'We have a fair resolution process. Both parties can submit evidence, and our team will make a decision within 10 business days.',
        },
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Frequently Asked Questions - Real Estate</title>
        <meta name="description" content="Find answers to common questions about bookings, payments, and using our platform" />
      </Head>

      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600">Find answers to common questions about bookings, payments, and our platform</p>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-8">
            {faqs.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {/* Category Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
                  {section.category}
                </h2>

                {/* Questions */}
                <div className="space-y-3">
                  {section.questions.map((item, itemIndex) => {
                    const itemKey = `${sectionIndex}-${itemIndex}`;
                    const isOpen = openIndex === itemKey;

                    return (
                      <div key={itemKey} className="bg-white rounded-lg shadow-sm overflow-hidden">
                        {/* Question Button */}
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : itemKey)}
                          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                        >
                          <h3 className="font-semibold text-gray-900">{item.q}</h3>
                          <svg
                            className={`w-6 h-6 text-blue-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                          </svg>
                        </button>

                        {/* Answer */}
                        {isOpen && (
                          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                            <p className="text-gray-700 leading-relaxed">{item.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="mt-16 bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Still have questions?</h2>
            <p className="text-gray-700 mb-6">
              Can't find the answer you're looking for? Our friendly team is here to help.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Contact Support
              </button>
              <button className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                Email Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;
