export class PaymentService {
  static async initiatePayment(bookingId, amount, currency = 'USD') {
    try {
      const response = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          bookingId,
          amount,
          currency,
          timestamp: new Date(),
        }),
      });

      if (!response.ok) throw new Error('Failed to initiate payment');
      return await response.json();
    } catch (error) {
      console.error('Payment initiation error:', error);
      throw error;
    }
  }

  static async processPayment(paymentId, paymentMethod, paymentDetails) {
    try {
      const response = await fetch('/api/payments/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          paymentId,
          paymentMethod, // 'credit_card', 'paypal', 'apple_pay', 'google_pay'
          paymentDetails,
          processedAt: new Date(),
        }),
      });

      if (!response.ok) throw new Error('Payment processing failed');
      return await response.json();
    } catch (error) {
      console.error('Payment processing error:', error);
      throw error;
    }
  }

  static async getPaymentHistory(userId) {
    try {
      const response = await fetch(`/api/payments/history?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch payment history');
      return await response.json();
    } catch (error) {
      console.error('Error fetching payment history:', error);
      throw error;
    }
  }

  static async refundPayment(paymentId, reason) {
    try {
      const response = await fetch(`/api/payments/${paymentId}/refund`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ reason, refundedAt: new Date() }),
      });

      if (!response.ok) throw new Error('Refund failed');
      return await response.json();
    } catch (error) {
      console.error('Refund error:', error);
      throw error;
    }
  }

  static async getPaymentStatus(paymentId) {
    try {
      const response = await fetch(`/api/payments/${paymentId}/status`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch payment status');
      return await response.json();
    } catch (error) {
      console.error('Error fetching payment status:', error);
      throw error;
    }
  }

  static async savePaymentMethod(paymentMethodDetails) {
    try {
      const response = await fetch('/api/payments/methods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          ...paymentMethodDetails,
          createdAt: new Date(),
        }),
      });

      if (!response.ok) throw new Error('Failed to save payment method');
      return await response.json();
    } catch (error) {
      console.error('Error saving payment method:', error);
      throw error;
    }
  }

  static async getPaymentMethods(userId) {
    try {
      const response = await fetch(`/api/payments/methods?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch payment methods');
      return await response.json();
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      throw error;
    }
  }

  static async deletePaymentMethod(methodId) {
    try {
      const response = await fetch(`/api/payments/methods/${methodId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete payment method');
      return await response.json();
    } catch (error) {
      console.error('Error deleting payment method:', error);
      throw error;
    }
  }
}

export default PaymentService;
