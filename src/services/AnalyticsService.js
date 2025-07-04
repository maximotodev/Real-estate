export class AnalyticsService {
  static async trackEvent(eventName, eventData = {}) {
    try {
      const event = {
        name: eventName,
        data: eventData,
        timestamp: new Date(),
        userId: localStorage.getItem('userId'),
        sessionId: sessionStorage.getItem('sessionId'),
        url: typeof window !== 'undefined' ? window.location.pathname : null,
      };

      await fetch('/api/analytics/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }

  static async getPropertyAnalytics(propertyId) {
    try {
      const response = await fetch(`/api/analytics/properties/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch analytics');
      return await response.json();
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }

  static async getUserAnalytics(userId) {
    try {
      const response = await fetch(`/api/analytics/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch user analytics');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user analytics:', error);
      throw error;
    }
  }

  static async getPlatformAnalytics(dateRange = '30days') {
    try {
      const response = await fetch(`/api/analytics/platform?range=${dateRange}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch platform analytics');
      return await response.json();
    } catch (error) {
      console.error('Error fetching platform analytics:', error);
      throw error;
    }
  }

  static async trackPageView(pageName, pageProps = {}) {
    this.trackEvent('page_view', {
      pageName,
      ...pageProps,
    });
  }

  static async trackPropertyView(propertyId) {
    this.trackEvent('property_viewed', { propertyId });
  }

  static async trackBookingStarted(propertyId, checkInDate, checkOutDate) {
    this.trackEvent('booking_started', {
      propertyId,
      checkInDate,
      checkOutDate,
    });
  }

  static async trackSearchPerformed(searchQuery, filters) {
    this.trackEvent('search_performed', {
      query: searchQuery,
      filters,
    });
  }

  static async trackUserSignup(userType) {
    this.trackEvent('user_signup', { userType });
  }

  static async trackReviewPosted(propertyId, rating) {
    this.trackEvent('review_posted', {
      propertyId,
      rating,
    });
  }
}

export default AnalyticsService;
