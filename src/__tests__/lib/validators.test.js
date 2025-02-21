import { validators } from '../../lib/validators';

describe('Validators - Email', () => {
  it('should validate standard emails', () => {
    expect(validators.email('john@example.com')).toBe(true);
    expect(validators.email('user.name@domain.co.uk')).toBe(true);
    expect(validators.email('test+tag@subdomain.example.org')).toBe(true);
  });

  it('should reject invalid emails', () => {
    expect(validators.email('invalid-email')).toBe(false);
    expect(validators.email('test@')).toBe(false);
    expect(validators.email('@example.com')).toBe(false);
    expect(validators.email('test@.com')).toBe(false);
    expect(validators.email('')).toBe(false);
    expect(validators.email(null)).toBe(false);
  });

  it('should handle case insensitivity', () => {
    expect(validators.email('TEST@EXAMPLE.COM')).toBe(true);
    expect(validators.email('TeSt@ExAmPlE.cOm')).toBe(true);
  });
});

describe('Validators - Password', () => {
  it('should accept strong passwords', () => {
    expect(validators.password('Password123')).toBe(true);
    expect(validators.password('MyP@ssw0rd')).toBe(true);
    expect(validators.password('Secure1Pass')).toBe(true);
  });

  it('should reject short passwords', () => {
    expect(validators.password('Pass1')).toBe(false);
    expect(validators.password('Ab1')).toBe(false);
  });

  it('should reject very long passwords', () => {
    const longPassword = 'A' + '1'.repeat(200);
    expect(validators.password(longPassword)).toBe(false);
  });

  it('should reject non-string input', () => {
    expect(validators.password(null)).toBe(false);
    expect(validators.password(undefined)).toBe(false);
    expect(validators.password(123)).toBe(false);
  });
});

describe('Validators - Phone', () => {
  it('should validate various phone formats', () => {
    expect(validators.phone('1234567890')).toBe(true);
    expect(validators.phone('(123) 456-7890')).toBe(true);
    expect(validators.phone('+1-234-567-8900')).toBe(true);
    expect(validators.phone('123-456-7890')).toBe(true);
  });

  it('should reject invalid phone numbers', () => {
    expect(validators.phone('123')).toBe(false);
    expect(validators.phone('abc')).toBe(false);
    expect(validators.phone('')).toBe(false);
  });

  it('should accept international formats', () => {
    expect(validators.phone('+447911123456')).toBe(true); // UK
    expect(validators.phone('+33123456789')).toBe(true); // France
  });
});

describe('Validators - Price', () => {
  it('should validate valid prices', () => {
    expect(validators.price(1500)).toBe(true);
    expect(validators.price(2500.50)).toBe(true);
    expect(validators.price('1000')).toBe(true);
  });

  it('should reject invalid prices', () => {
    expect(validators.price(-100)).toBe(false);
    expect(validators.price(0)).toBe(false);
    expect(validators.price('abc')).toBe(false);
    expect(validators.price(10000001)).toBe(false); // Over max
  });

  it('should handle string conversions', () => {
    expect(validators.price('1500.75')).toBe(true);
    expect(validators.price('  1000  ')).toBe(true);
  });
});

describe('Validators - Rating', () => {
  it('should validate correct ratings', () => {
    expect(validators.rating(1)).toBe(true);
    expect(validators.rating(3)).toBe(true);
    expect(validators.rating(5)).toBe(true);
  });

  it('should reject invalid ratings', () => {
    expect(validators.rating(0)).toBe(false);
    expect(validators.rating(6)).toBe(false);
    expect(validators.rating(2.5)).toBe(false); // Not integer
    expect(validators.rating(-1)).toBe(false);
  });

  it('should validate string numbers', () => {
    expect(validators.rating('4')).toBe(true);
    expect(validators.rating('5')).toBe(true);
  });
});

describe('Validators - Date Range', () => {
  it('should validate future dates', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const result = validators.dateRange(tomorrow.toISOString(), nextWeek.toISOString());
    expect(result).toBe(true);
  });

  it('should reject past check-in dates', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    expect(validators.dateRange(yesterday.toISOString(), tomorrow.toISOString())).toBe(false);
  });

  it('should reject invalid date ranges', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    // checkOut before checkIn
    expect(validators.dateRange(nextWeek.toISOString(), tomorrow.toISOString())).toBe(false);
  });
});

describe('Validators - MongoDB ID', () => {
  it('should validate valid MongoDB IDs', () => {
    expect(validators.mongooseId('507f1f77bcf86cd799439011')).toBe(true);
    expect(validators.mongooseId('507F1F77BCF86CD799439011')).toBe(true); // case insensitive
  });

  it('should reject invalid IDs', () => {
    expect(validators.mongooseId('invalid')).toBe(false);
    expect(validators.mongooseId('507f1f77bcf86cd79943901')).toBe(false); // Too short
    expect(validators.mongooseId('')).toBe(false);
    expect(validators.mongooseId(null)).toBe(false);
  });
});
