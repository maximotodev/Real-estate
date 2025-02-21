import bcrypt from 'bcryptjs';

export class UserService {
  static async hashPassword(password) {
    try {
      // Use 12 rounds for better security (takes ~100ms)
      const salt = await bcrypt.genSalt(12);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw new Error('Password hashing failed');
    }
  }

  static async comparePassword(password, hashedPassword) {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      return false;
    }
  }

  static validateUserData(data, isRegistration = false) {
    const errors = {};

    if (isRegistration) {
      // Name validation
      if (!data.name || typeof data.name !== 'string') {
        errors.name = 'Name is required';
      } else {
        const trimmed = data.name.trim();
        if (trimmed.length < 2) {
          errors.name = 'Name must be at least 2 characters';
        } else if (trimmed.length > 100) {
          errors.name = 'Name cannot exceed 100 characters';
        } else if (!/^[a-zA-Z\s\-']+$/.test(trimmed)) {
          errors.name = 'Name contains invalid characters';
        }
      }

      // Email validation
      if (!this.isValidEmail(data.email)) {
        errors.email = 'Valid email address required';
      }

      // Password validation
      const passwordErrors = this.validatePassword(data.password);
      if (passwordErrors.length > 0) {
        errors.password = passwordErrors[0];
      }

      // Password confirmation
      if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    // Phone validation (optional but if provided, must be valid)
    if (data.phone && !this.isValidPhone(data.phone)) {
      errors.phone = 'Valid phone number required (10+ digits)';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  static validatePassword(password) {
    const errors = [];

    if (!password || typeof password !== 'string') {
      return ['Password is required'];
    }

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }

    if (password.length > 128) {
      errors.push('Password cannot exceed 128 characters');
    }

    // Check for at least one uppercase, one lowercase, one number
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    return errors;
  }

  static isValidEmail(email) {
    if (!email || typeof email !== 'string') return false;
    // RFC 5322 simplified
    const emailRegex = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;
    return emailRegex.test(email.toLowerCase());
  }

  static isValidPhone(phone) {
    if (!phone) return false;
    const cleaned = String(phone).replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 15;
  }

  static formatUserResponse(user) {
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profileImage: user.profileImage || null,
      bio: user.bio || '',
      averageRating: parseFloat((user.averageRating || 0).toFixed(1)),
      totalReviews: user.totalReviews || 0,
      totalBookings: user.totalBookings || 0,
      joinedAt: user.createdAt,
    };
  }

  static formatPublicProfile(user) {
    return {
      id: user._id.toString(),
      name: user.name,
      profileImage: user.profileImage || null,
      bio: user.bio || '',
      role: user.role,
      averageRating: parseFloat((user.averageRating || 0).toFixed(1)),
      totalReviews: user.totalReviews || 0,
      memberSince: user.createdAt,
      verified: user.emailVerified || false,
    };
  }

  static getRoleLabel(role) {
    const labels = {
      renter: 'Renter',
      landlord: 'Property Owner',
      admin: 'Administrator',
    };
    return labels[role] || role;
  }

  static hasRole(user, requiredRole) {
    if (!user || !user.role) return false;
    return user.role === requiredRole;
  }

  static hasAnyRole(user, roles) {
    if (!user || !user.role || !Array.isArray(roles)) return false;
    return roles.includes(user.role);
  }

  static canManageProperty(user, propertyLandlordId) {
    if (!user) return false;
    return user.role === 'admin' || (user.role === 'landlord' && user._id.toString() === propertyLandlordId.toString());
  }

  static isAdmin(user) {
    return this.hasRole(user, 'admin');
  }

  static isLandlord(user) {
    return this.hasRole(user, 'landlord');
  }

  static isRenter(user) {
    return this.hasRole(user, 'renter');
  }
}
