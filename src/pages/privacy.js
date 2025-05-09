import React from 'react';
import Head from 'next/head';

const PrivacyPage = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - Real Estate</title>
        <meta name="description" content="Read our privacy policy to understand how we protect your data" />
      </Head>

      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
            {[
              {
                title: 'Introduction',
                content: 'Real Estate ("we", "us", "our", or "Company") respects the privacy of our users ("user" or "you"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.',
              },
              {
                title: 'Information We Collect',
                content: 'We collect information you provide directly (name, email, phone, address, payment information) and information collected automatically (IP address, browser type, pages visited, referring URL, cookies). We also collect information from third parties like payment processors.',
              },
              {
                title: 'How We Use Your Information',
                content: 'We use your information to process transactions, send promotional communications, improve our services, enforce our terms, and comply with legal obligations. We may also use it for analytics and marketing purposes.',
              },
              {
                title: 'Data Security',
                content: 'We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.',
              },
              {
                title: 'Cookie Policy',
                content: 'We use cookies to enhance your experience on our website. Cookies help us remember your preferences, understand how you use our site, and improve our services. You can control cookies through your browser settings.',
              },
              {
                title: 'Third-Party Services',
                content: 'We use third-party services for payment processing, analytics, and email communications. These providers are obligated to maintain the confidentiality and security of your information.',
              },
              {
                title: 'Your Rights',
                content: 'You have the right to access, correct, or delete your personal information. You may also opt-out of marketing communications at any time. Contact us to exercise these rights.',
              },
              {
                title: 'Data Retention',
                content: 'We retain your personal information for as long as necessary to provide our services. You can request deletion of your account and associated data at any time.',
              },
              {
                title: 'International Data Transfers',
                content: 'Your information may be transferred to, stored in, and processed in countries other than your country of residence. By using our services, you consent to such transfers.',
              },
              {
                title: 'Contact Us',
                content: 'If you have questions about this Privacy Policy or our privacy practices, please contact us at privacy@realestate.com or by mail at 123 Main Street, New York, NY 10001.',
              },
            ].map((section, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>
            ))}

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-2">GDPR Compliance</h3>
              <p className="text-gray-700">
                We comply with the General Data Protection Regulation (GDPR) and other applicable data protection laws. If you are located in the EU, you have additional rights regarding your personal data.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-4">
              <p className="text-gray-700">
                <strong>Last Updated:</strong> January 1, 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;
