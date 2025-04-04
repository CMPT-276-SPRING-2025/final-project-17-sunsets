import { getClothingRecommendation } from '../Reccomend.js';

describe('Clothing Recommendation', () => {
  it('returns a clothing array for known weather conditions', () => {
    const conditions = ['clear', 'rain', 'snow', 'clouds', 'drizzle', 'haze', 'smoke', 'thunderstorm'];

    for (const condition of conditions) {
      const result = getClothingRecommendation(condition);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      result.forEach(item => {
        expect(typeof item).toBe('string');
      });
    }
  });

  it('returns default clothing for unknown condition', () => {
    const result = getClothingRecommendation('alienstorm'); // not in clothingOptions
    expect(result).toEqual(['Standard activewear']);
  });

  it('is case insensitive', () => {
    const result = getClothingRecommendation('RaIn');
    expect(Array.isArray(result)).toBe(true);
  });
});
