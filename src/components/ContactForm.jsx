import React from 'react';
import { useForm } from '../hooks/useForm';

const ContactForm = ({ hostId, propertyId, onSuccess }) => {
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
        // Sanitize inputs to prevent XSS
        const sanitized = {
          name: values.name.trim(),
          email: values.email.trim().toLowerCase(),
          phone: values.phone.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        };
        const response = await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            ...sanitized,
            hostId,
            propertyId,
          }),
        });

        if (response.ok) {
          form.reset();
          if (onSuccess) onSuccess();
        } else {
          throw new Error('Failed to send message');
        }
      } catch (err) {
        form.setFieldError('submit', err.message);
      }
    }
  );

  return (
    <form onSubmit={form.handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Host</h2>

      {form.errors.submit && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p className="font-semibold">{form.errors.submit}</p>
        </div>
      )}

      <div className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
          <input
            type="text"
            {...form.getFieldProps('name')}
            placeholder="John Doe"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          {form.errors.name && <p className="text-red-500 text-sm mt-1">{form.errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            {...form.getFieldProps('email')}
            placeholder="your@email.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          {form.errors.email && <p className="text-red-500 text-sm mt-1">{form.errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone (Optional)</label>
          <input
            type="tel"
            {...form.getFieldProps('phone')}
            placeholder="+1 (555) 123-4567"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          {form.errors.phone && <p className="text-red-500 text-sm mt-1">{form.errors.phone}</p>}
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
          <select
            {...form.getFieldProps('subject')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Booking Question">Booking Question</option>
            <option value="Pricing">Pricing Question</option>
            <option value="Availability">Availability Check</option>
            <option value="Other">Other</option>
          </select>
          {form.errors.subject && <p className="text-red-500 text-sm mt-1">{form.errors.subject}</p>}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
          <textarea
            {...form.getFieldProps('message')}
            placeholder="Write your message here..."
            rows="5"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
          ></textarea>
          <div className="flex justify-between items-center mt-2">
            {form.errors.message && <p className="text-red-500 text-sm">{form.errors.message}</p>}
            <span className="text-xs text-gray-500 ml-auto">
              {form.values.message.length}/1000
            </span>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Privacy:</strong> Your email address and phone number are only shared with the host after they respond to your inquiry.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={form.isSubmitting || !form.isDirty}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {form.isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
