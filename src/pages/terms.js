import React from 'react';
import Head from 'next/head';

const TermsPage = () => {
  return (
    <>
      <Head>
        <title>Terms of Service - Real Estate</title>
        <meta name="description" content="Read our terms of service and user agreement" />
      </Head>

      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

          <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
            {[
              {
                title: '1. Acceptance of Terms',
                content: 'By accessing and using this platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
              },
              {
                title: '2. User Accounts',
                content: 'When you create an account, you must provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your password and account. You agree to accept responsibility for all activities that occur under your account.',
              },
              {
                title: '3. User Conduct',
                content: 'You agree not to engage in any conduct that restricts or inhibits anyone\'s use or enjoyment of the service. Prohibited behavior includes harassing or causing distress or inconvenience to any person, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our website.',
              },
              {
                title: '4. Intellectual Property Rights',
                content: 'The content on our platform, including but not limited to text, graphics, logos, images, and software, is the property of Real Estate or its content suppliers and is protected by international copyright laws.',
              },
              {
                title: '5. Booking and Reservations',
                content: 'All bookings are subject to availability and confirmation by the property host. We reserve the right to refuse or cancel any booking that violates our policies. Cancellation policies are clearly stated for each property.',
              },
              {
                title: '6. Payment Terms',
                content: 'Payment is due at the time of booking. We accept major credit cards, PayPal, and other payment methods. All transactions are final unless cancelled according to the property\'s cancellation policy.',
              },
              {
                title: '7. Limitation of Liability',
                content: 'Real Estate shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service, even if we have been advised of the possibility of such damages.',
              },
              {
                title: '8. Dispute Resolution',
                content: 'Any disputes arising from bookings or transactions will be handled according to our resolution process. Both parties must submit evidence, and our team will make a fair decision within 10 business days.',
              },
              {
                title: '9. Changes to Terms',
                content: 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the service following the posting of modified terms means you accept and agree to the changes.',
              },
              {
                title: '10. Termination',
                content: 'We reserve the right to terminate your account and access to our services at any time, for any reason, including violation of these terms. Upon termination, you lose the right to access the services.',
              },
            ].map((section, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>
            ))}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <p className="text-gray-700">
                <strong>Last Updated:</strong> January 1, 2024
              </p>
              <p className="text-gray-700 mt-2">
                For questions about these terms, please contact us at <a href="mailto:legal@realestate.com" className="text-blue-600 hover:underline">legal@realestate.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPage;
