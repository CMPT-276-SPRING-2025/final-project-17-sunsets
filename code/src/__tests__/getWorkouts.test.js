import { getWorkouts } from '../getWorkouts';

global.fetch = jest.fn();

describe('getWorkouts', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('returns a list of workouts', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          { id: 1, name: 'Push Ups' },
          { id: 2, name: 'Squats' }
        ]
      }),
    });

    const workouts = await getWorkouts();
    expect(Array.isArray(workouts)).toBe(true);
    expect(workouts.length).toBeGreaterThan(0);
  });
});
