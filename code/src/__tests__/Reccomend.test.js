import { getClothingRecommendation } from '../Reccomend.js';

test('getClothingRecommendation returns outfit array for valid weather type', () => {
  const result = getClothingRecommendation('rain');
  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBeGreaterThan(0);
});

test('getClothingRecommendation returns fallback for unknown condition', () => {
  const result = getClothingRecommendation('volcano');
  expect(result).toEqual(["Standard activewear"]);
});
