import bcrypt from 'bcryptjs';

export class UserService {
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
  }

  static async comparePassword(password, hashedPassword) {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch {
      return false;
    }
  }

  static validateUserData(data, isRegistration = false) {
    const errors = {};

    if (isRegistration) {
      if (!data.name || typeof data.name !== 'string') {
        errors.name = 'Name is required';
      } else {
        const trimmed = data.name.trim();
        if (trimmed.length < 2) errors.name = 'Name must be at least 2 characters';
        else if (trimmed.length > 100) errors.name = 'Name cannot exceed 100 characters';
        else if (!/^[a-zA-Z\s\-']+$/.test(trimmed)) errors.name = 'Name contains invalid characters';
      }

      if (!this.isValidEmail(data.email)) errors.email = 'Valid email address required';

      const passwordErrors = this.validatePassword(data.password);
      if (passwordErrors.length > 0) errors.password = passwordErrors[0];

      if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    }

    if (data.phone && !this.isValidPhone(data.phone)) {
      errors.phone = 'Valid phone number required (10+ digits)';
    }

    if (data.bio && data.bio.length > 500) {
      errors.bio = 'Bio cannot exceed 500 characters';
    }

    if (data.website && data.website.trim()) {
      try {
        new URL(data.website);
      } catch {
        errors.website = 'Invalid website URL';
      }
    }

    return { isValid: Object.keys(errors).length === 0, errors };
  }

  static validatePassword(password) {
    if (!password || typeof password !== 'string') return ['Password is required'];

    const errors = [];
    if (password.length < 8) errors.push('Password must be at least 8 characters');
    if (password.length > 128) errors.push('Password cannot exceed 128 characters');
    if (!/[A-Z]/.test(password)) errors.push('Password must contain at least one uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('Password must contain at least one lowercase letter');
    if (!/\d/.test(password)) errors.push('Password must contain at least one number');
    return errors;
  }

  static isValidEmail(email) {
    if (!email || typeof email !== 'string') return false;
    return /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(email.toLowerCase());
  }

  static isValidPhone(phone) {
    if (!phone) return false;
    const cleaned = String(phone).replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 15;
  }

  static formatUserResponse(user) {
    return {
      id: user._id?.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone || null,
      role: user.role,
      profileImage: user.profileImage || null,
      bio: user.bio || '',
      city: user.city || null,
      website: user.website || null,
      emailVerified: user.emailVerified || false,
      averageRating: parseFloat((user.averageRating || 0).toFixed(1)),
      totalReviews: user.totalReviews || 0,
      totalBookings: user.totalBookings || 0,
      joinedAt: user.createdAt,
    };
  }

  static formatPublicProfile(user) {
    return {
      id: user._id?.toString(),
      name: user.name,
      profileImage: user.profileImage || null,
      bio: user.bio || '',
      role: user.role,
      city: user.city || null,
      averageRating: parseFloat((user.averageRating || 0).toFixed(1)),
      totalReviews: user.totalReviews || 0,
      responseRate: user.responseRate || null,
      responseTime: user.responseTime || null,
      memberSince: user.createdAt,
      verified: user.emailVerified || false,
      isSuperhost: user.isSuperhost || false,
    };
  }

  static getRoleLabel(role) {
    return { renter: 'Renter', landlord: 'Property Owner', admin: 'Administrator' }[role] || role;
  }

  static hasRole(user, requiredRole) {
    return user?.role === requiredRole;
  }

  static hasAnyRole(user, roles) {
    return Array.isArray(roles) && roles.includes(user?.role);
  }

  static canManageProperty(user, propertyLandlordId) {
    if (!user) return false;
    return user.role === 'admin' || (user.role === 'landlord' && user._id?.toString() === propertyLandlordId?.toString());
  }

  static isAdmin(user) { return this.hasRole(user, 'admin'); }
  static isLandlord(user) { return this.hasRole(user, 'landlord'); }
  static isRenter(user) { return this.hasRole(user, 'renter'); }

  static getAccountStatus(user) {
    if (!user) return 'unknown';
    if (user.banned) return 'banned';
    if (!user.emailVerified) return 'unverified';
    if (user.suspended) return 'suspended';
    return 'active';
  }

  static sanitizeInput(str) {
    if (typeof str !== 'string') return str;
    return str.trim().replace(/[<>]/g, '');
  }
}
