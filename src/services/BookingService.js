/**
 * Service for booking calculations and validation
 * Handles price calculation with fees/tax, refund policies, and date validation
 */
export class BookingService {
  /**
   * Calculate number of nights between two dates
   * @param {string|Date} checkIn - Check-in date
   * @param {string|Date} checkOut - Check-out date
   * @returns {number} Number of nights
   */
  static calculateNights(checkIn, checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    const diffMs = end - start;
    const nights = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  }

  static calculateTotalPrice(pricePerNight, nights, discountPercent = 0) {
    const basePrice = parseFloat((pricePerNight * nights).toFixed(2));
    const discount = parseFloat(((basePrice * discountPercent) / 100).toFixed(2));
    const serviceFee = parseFloat((basePrice * 0.05).toFixed(2));
    const tax = parseFloat(((basePrice - discount) * 0.1).toFixed(2));
    const total = basePrice - discount + serviceFee + tax;

    return {
      basePrice,
      discount,
      serviceFee,
      tax,
      total: parseFloat(total.toFixed(2)),
      nights,
      pricePerNight,
    };
  }

  static validateBookingData(data) {
    const errors = {};

    if (!data.checkInDate) errors.checkInDate = 'Check-in date is required';
    if (!data.checkOutDate) errors.checkOutDate = 'Check-out date is required';

    const checkIn = new Date(data.checkInDate);
    const checkOut = new Date(data.checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!isNaN(checkIn) && checkIn < today) {
      errors.checkInDate = 'Check-in cannot be in the past';
    }

    const nights = this.calculateNights(data.checkInDate, data.checkOutDate);
    if (nights < 1) errors.checkOutDate = 'Check-out must be at least 1 night after check-in';
    if (nights > 365) errors.checkOutDate = 'Bookings limited to 1 year maximum';

    const guestCount = parseInt(data.guests) || 0;
    if (guestCount < 1) errors.guests = 'At least 1 guest required';
    if (guestCount > 20) errors.guests = 'Maximum 20 guests per booking';

    if (!data.renterName || data.renterName.trim().length < 2) {
      errors.renterName = 'Full name required (minimum 2 characters)';
    }
    if (!this.isValidEmail(data.renterEmail)) errors.renterEmail = 'Valid email address required';
    if (!this.isValidPhone(data.renterPhone)) errors.renterPhone = 'Valid phone number required (10+ digits)';

    return { isValid: Object.keys(errors).length === 0, errors };
  }

  static isValidEmail(email) {
    if (!email || typeof email !== 'string') return false;
    return /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(email.toLowerCase());
  }

  static isValidPhone(phone) {
    if (!phone) return false;
    const cleaned = String(phone).replace(/\D/g, '');
    return cleaned.length >= 10;
  }

  static canCancelBooking(booking) {
    if (!['pending', 'confirmed'].includes(booking.status)) return false;
    const hoursUntilCheckIn = (new Date(booking.checkInDate) - new Date()) / (1000 * 60 * 60);
    return hoursUntilCheckIn > 24;
  }

  static getRefundAmount(booking, cancelledAt = new Date()) {
    const daysUntilCheckIn = (new Date(booking.checkInDate) - new Date(cancelledAt)) / (1000 * 60 * 60 * 24);
    if (daysUntilCheckIn > 7) return booking.totalPrice;
    if (daysUntilCheckIn > 3) return parseFloat((booking.totalPrice * 0.5).toFixed(2));
    return 0;
  }

  static getRefundPolicy(daysUntilCheckIn) {
    if (daysUntilCheckIn > 7) return { percent: 100, label: 'Full refund' };
    if (daysUntilCheckIn > 3) return { percent: 50, label: '50% refund' };
    return { percent: 0, label: 'No refund' };
  }

  static getBookingStatusColor(status) {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
      active: 'bg-green-100 text-green-800 border-green-300',
      completed: 'bg-gray-100 text-gray-800 border-gray-300',
      cancelled: 'bg-red-100 text-red-800 border-red-300',
      rejected: 'bg-red-100 text-red-800 border-red-300',
    };
    return colors[status] || 'bg-gray-100 text-gray-600';
  }

  static getBookingStatusLabel(status) {
    const labels = {
      pending: 'Awaiting Confirmation',
      confirmed: 'Confirmed',
      active: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled',
      rejected: 'Rejected',
    };
    return labels[status] || status;
  }

  static getOccupancyRate(bookings, year = new Date().getFullYear()) {
    const yearBookings = bookings.filter((b) => {
      const checkIn = new Date(b.checkInDate);
      return checkIn.getFullYear() === year && b.status !== 'cancelled';
    });

    const totalNights = yearBookings.reduce((sum, b) => {
      return sum + this.calculateNights(b.checkInDate, b.checkOutDate);
    }, 0);

    return Math.min(100, Math.round((totalNights / 365) * 100));
  }

  static groupBookingsByMonth(bookings) {
    const map = {};
    bookings.forEach((booking) => {
      const month = new Date(booking.checkInDate).toLocaleString('default', { month: 'short', year: 'numeric' });
      if (!map[month]) map[month] = { month, count: 0, revenue: 0 };
      map[month].count++;
      if (booking.status !== 'cancelled') map[month].revenue += booking.totalPrice || 0;
    });
    return Object.values(map);
  }

  static formatBookingResponse(booking) {
    return {
      _id: booking._id,
      propertyId: booking.propertyId,
      propertyTitle: booking.propertyTitle,
      landlordId: booking.landlordId,
      renterId: booking.renterId,
      renterName: booking.renterName,
      renterEmail: booking.renterEmail,
      renterPhone: booking.renterPhone,
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
      guests: booking.guests,
      totalPrice: booking.totalPrice,
      status: booking.status,
      specialRequests: booking.specialRequests,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    };
  }
}
