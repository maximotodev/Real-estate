import { formatters, calculations, helpers } from '../../lib/utils';

describe('Formatters', () => {
  describe('currency', () => {
    it('should format currency correctly', () => {
      const result = formatters.currency(1500.5);
      expect(result).toContain('$1,500');
    });
  });

  describe('date', () => {
    it('should format date in short format', () => {
      const date = new Date('2026-05-15');
      const result = formatters.date(date, 'short');
      expect(result).toBeTruthy();
    });
  });

  describe('phone', () => {
    it('should format 10 digit phone correctly', () => {
      const result = formatters.phone('1234567890');
      expect(result).toContain('(123)');
    });
  });

  describe('truncate', () => {
    it('should truncate text correctly', () => {
      const result = formatters.truncate('This is a very long text', 10);
      expect(result).toBe('This is a ...');
    });

    it('should not truncate short text', () => {
      const result = formatters.truncate('Short', 10);
      expect(result).toBe('Short');
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(formatters.capitalize('hello')).toBe('Hello');
    });
  });

  describe('slugify', () => {
    it('should slugify text correctly', () => {
      expect(formatters.slugify('Hello World!')).toBe('hello-world');
    });
  });

  describe('rating', () => {
    it('should round rating to 1 decimal', () => {
      expect(formatters.rating(4.55)).toBe('4.5');
    });
  });

  describe('percentage', () => {
    it('should calculate percentage', () => {
      expect(formatters.percentage(50, 100)).toBe('50.0');
    });

    it('should return 0 for zero total', () => {
      expect(formatters.percentage(50, 0)).toBe(0);
    });
  });
});

describe('Calculations', () => {
  describe('getDaysBetween', () => {
    it('should calculate days between dates', () => {
      const start = new Date('2026-05-15');
      const end = new Date('2026-05-20');
      expect(calculations.getDaysBetween(start, end)).toBe(5);
    });
  });

  describe('calculateNights', () => {
    it('should calculate nights correctly', () => {
      const result = calculations.calculateNights('2026-05-15', '2026-05-20');
      expect(result).toBe(5);
    });
  });

  describe('calculateTotalPrice', () => {
    it('should calculate total price correctly', () => {
      const result = calculations.calculateTotalPrice(150, 5);
      expect(result).toBe(750);
    });
  });

  describe('calculateAverageRating', () => {
    it('should calculate average rating', () => {
      const result = calculations.calculateAverageRating([4, 5, 3, 4]);
      expect(result).toBe('4.0');
    });

    it('should return 0 for empty array', () => {
      expect(calculations.calculateAverageRating([])).toBe(0);
    });
  });

  describe('getTotalPages', () => {
    it('should calculate total pages', () => {
      expect(calculations.getTotalPages(100, 12)).toBe(9);
    });
  });
});

describe('Helpers', () => {
  describe('getInitials', () => {
    it('should get initials from name', () => {
      expect(helpers.getInitials('John Doe')).toBe('JD');
    });
  });

  describe('generateRandomString', () => {
    it('should generate random string', () => {
      const result = helpers.generateRandomString(10);
      expect(result).toHaveLength(10);
    });
  });

  describe('chunk', () => {
    it('should chunk array correctly', () => {
      const result = helpers.chunk([1, 2, 3, 4, 5], 2);
      expect(result).toHaveLength(3);
      expect(result[0]).toEqual([1, 2]);
    });
  });

  describe('unique', () => {
    it('should return unique values', () => {
      const result = helpers.unique([1, 2, 2, 3, 3, 3]);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should return unique objects by key', () => {
      const items = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
        { id: 1, name: 'C' },
      ];
      const result = helpers.unique(items, 'id');
      expect(result).toHaveLength(2);
    });
  });

  describe('groupBy', () => {
    it('should group array by key', () => {
      const items = [
        { role: 'admin', name: 'John' },
        { role: 'user', name: 'Jane' },
        { role: 'admin', name: 'Bob' },
      ];
      const result = helpers.groupBy(items, 'role');
      expect(Object.keys(result)).toEqual(['admin', 'user']);
      expect(result.admin).toHaveLength(2);
    });
  });

  describe('sortBy', () => {
    it('should sort array ascending', () => {
      const items = [
        { name: 'C', price: 30 },
        { name: 'A', price: 10 },
        { name: 'B', price: 20 },
      ];
      const result = helpers.sortBy(items, 'price', 'asc');
      expect(result[0].price).toBe(10);
      expect(result[2].price).toBe(30);
    });

    it('should sort array descending', () => {
      const items = [
        { price: 10 },
        { price: 30 },
        { price: 20 },
      ];
      const result = helpers.sortBy(items, 'price', 'desc');
      expect(result[0].price).toBe(30);
    });
  });
});
