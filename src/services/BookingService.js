export class BookingService {
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
    // Realistic pricing calculation with fees
    const basePrice = parseFloat((pricePerNight * nights).toFixed(2));
    const discount = parseFloat(((basePrice * discountPercent) / 100).toFixed(2));

    // Platform takes 5% service fee on base price
    const serviceFee = parseFloat((basePrice * 0.05).toFixed(2));

    // Tax varies by location (simulating ~10% for now)
    const tax = parseFloat(((basePrice - discount) * 0.1).toFixed(2));

    const total = basePrice - discount + serviceFee + tax;

    return {
      basePrice,
      discount,
      serviceFee,
      tax,
      total: parseFloat(total.toFixed(2)),
      nights,
    };
  }

  static validateBookingData(data) {
    const errors = {};

    if (!data.checkInDate) {
      errors.checkInDate = 'Check-in date is required';
    }

    if (!data.checkOutDate) {
      errors.checkOutDate = 'Check-out date is required';
    }

    const checkIn = new Date(data.checkInDate);
    const checkOut = new Date(data.checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn < today) {
      errors.checkInDate = 'Check-in cannot be in the past';
    }

    const nights = this.calculateNights(data.checkInDate, data.checkOutDate);
    if (nights < 1) {
      errors.checkOutDate = 'Check-out must be at least 1 night after check-in';
    }

    if (nights > 365) {
      errors.checkOutDate = 'Bookings limited to 1 year maximum';
    }

    const guestCount = parseInt(data.guests) || 0;
    if (guestCount < 1) {
      errors.guests = 'At least 1 guest required';
    }

    if (guestCount > 20) {
      errors.guests = 'Maximum 20 guests per booking';
    }

    if (!data.renterName || data.renterName.trim().length < 2) {
      errors.renterName = 'Full name required (minimum 2 characters)';
    }

    if (!this.isValidEmail(data.renterEmail)) {
      errors.renterEmail = 'Valid email address required';
    }

    if (!this.isValidPhone(data.renterPhone)) {
      errors.renterPhone = 'Valid phone number required (10+ digits)';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
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

  static getBookingStatusColor(status) {
    const colors = {
      pending: 'bg-yellow-100 border-yellow-300',
      confirmed: 'bg-blue-100 border-blue-300',
      active: 'bg-green-100 border-green-300',
      completed: 'bg-gray-100 border-gray-300',
      cancelled: 'bg-red-100 border-red-300',
      rejected: 'bg-red-100 border-red-300',
    };
    return colors[status] || 'bg-gray-100';
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

  static canCancelBooking(booking) {
    // Can only cancel pending or confirmed bookings
    if (!['pending', 'confirmed'].includes(booking.status)) {
      return false;
    }

    // Can't cancel if check-in is within 24 hours
    const checkIn = new Date(booking.checkInDate);
    const now = new Date();
    const hoursUntilCheckIn = (checkIn - now) / (1000 * 60 * 60);

    return hoursUntilCheckIn > 24;
  }

  static getRefundAmount(booking, cancelledAt) {
    // 100% refund if cancelled more than 7 days before check-in
    // 50% refund if cancelled 3-7 days before check-in
    // 0% refund if cancelled less than 3 days before check-in
    const checkIn = new Date(booking.checkInDate);
    const cancelled = new Date(cancelledAt);
    const daysUntilCheckIn = (checkIn - cancelled) / (1000 * 60 * 60 * 24);

    if (daysUntilCheckIn > 7) return booking.totalPrice;
    if (daysUntilCheckIn > 3) return booking.totalPrice * 0.5;
    return 0;
  }
}
