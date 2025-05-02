import React, { useState } from 'react';
import Head from 'next/head';
import { useForm } from '../hooks/useForm';

const ContactPage = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm(
    {
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
    },
    async (values) => {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          setSubmitSuccess(true);
          form.reset();
          setTimeout(() => setSubmitSuccess(false), 5000);
        }
      } catch (err) {
        form.setFieldError('submit', err.message);
      }
    }
  );

  return (
    <>
      <Head>
        <title>Contact Us - Real Estate</title>
        <meta name="description" content="Get in touch with our support team" />
      </Head>

      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        {/* Hero */}
        <div className="bg-blue-600 text-white py-12 mb-12">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl opacity-90">We're here to help. Reach out anytime!</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📧</span> Email
                </h3>
                <p className="text-gray-700 mb-2">support@realestate.com</p>
                <p className="text-gray-600 text-sm">We'll respond within 24 hours</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📞</span> Phone
                </h3>
                <p className="text-gray-700 mb-2">+1 (555) 123-4567</p>
                <p className="text-gray-600 text-sm">Mon-Fri, 9am-6pm EST</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📍</span> Address
                </h3>
                <p className="text-gray-700 mb-1">123 Main Street</p>
                <p className="text-gray-700">New York, NY 10001</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🕐</span> Hours
                </h3>
                <p className="text-gray-700 text-sm mb-1">Monday - Friday: 9am - 6pm</p>
                <p className="text-gray-700 text-sm mb-1">Saturday: 10am - 4pm</p>
                <p className="text-gray-700 text-sm">Sunday: Closed</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>

                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    <p className="font-semibold">Thank you for your message!</p>
                    <p>We'll get back to you as soon as possible.</p>
                  </div>
                )}

                {form.errors.submit && (
                  <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    <p className="font-semibold">{form.errors.submit}</p>
                  </div>
                )}

                <form onSubmit={form.handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        {...form.getFieldProps('name')}
                        placeholder="Your name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      {form.errors.name && <p className="text-red-500 text-sm mt-1">{form.errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        {...form.getFieldProps('email')}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      {form.errors.email && <p className="text-red-500 text-sm mt-1">{form.errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        {...form.getFieldProps('phone')}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                      <select
                        {...form.getFieldProps('subject')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Booking Issue">Booking Issue</option>
                        <option value="Payment Issue">Payment Issue</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Partnership">Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea
                      {...form.getFieldProps('message')}
                      placeholder="Tell us what's on your mind..."
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    ></textarea>
                    {form.errors.message && <p className="text-red-500 text-sm mt-1">{form.errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={form.isSubmitting}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {form.isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
