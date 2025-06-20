const NOTIFICATION_TYPES = {
  BOOKING_CONFIRMED: 'booking_confirmed',
  BOOKING_CANCELLED: 'booking_cancelled',
  MESSAGE_RECEIVED: 'message_received',
  REVIEW_POSTED: 'review_posted',
  PAYMENT_RECEIVED: 'payment_received',
  PROPERTY_INQUIRY: 'property_inquiry',
  HOST_REVIEW: 'host_review',
  SYSTEM_UPDATE: 'system_update',
};

export class NotificationService {
  static async createNotification(userId, type, data) {
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          userId,
          type,
          data,
          createdAt: new Date(),
          read: false,
        }),
      });

      if (!response.ok) throw new Error('Failed to create notification');
      return await response.json();
    } catch (error) {
      console.error('Notification error:', error);
      throw error;
    }
  }

  static async getNotifications(userId) {
    try {
      const response = await fetch(`/api/notifications?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch notifications');
      return await response.json();
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }

  static async markAsRead(notificationId) {
    try {
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ read: true }),
      });

      if (!response.ok) throw new Error('Failed to mark notification as read');
      return await response.json();
    } catch (error) {
      console.error('Error marking notification:', error);
      throw error;
    }
  }

  static async deleteNotification(notificationId) {
    try {
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete notification');
      return await response.json();
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  }

  static getNotificationMessage(notification) {
    const messages = {
      [NOTIFICATION_TYPES.BOOKING_CONFIRMED]: `Your booking for ${notification.data?.propertyTitle} has been confirmed!`,
      [NOTIFICATION_TYPES.BOOKING_CANCELLED]: `Your booking has been cancelled.`,
      [NOTIFICATION_TYPES.MESSAGE_RECEIVED]: `${notification.data?.senderName} sent you a message.`,
      [NOTIFICATION_TYPES.REVIEW_POSTED]: `A new review has been posted on your property.`,
      [NOTIFICATION_TYPES.PAYMENT_RECEIVED]: `Payment of $${notification.data?.amount} has been received.`,
      [NOTIFICATION_TYPES.PROPERTY_INQUIRY]: `${notification.data?.guestName} is interested in your property.`,
      [NOTIFICATION_TYPES.HOST_REVIEW]: `You've been reviewed! ${notification.data?.rating}★`,
      [NOTIFICATION_TYPES.SYSTEM_UPDATE]: `${notification.data?.message}`,
    };

    return messages[notification.type] || 'You have a new notification.';
  }
}

export default NotificationService;
