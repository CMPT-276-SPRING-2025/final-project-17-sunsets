import { getWeather } from '../getWeather';

global.fetch = jest.fn();

describe('getWeather', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('returns proper data format', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        main: { temp: 21 },
        weather: [{ main: 'Clear' }],
      }),
    });

    const result = await getWeather("New York");
    expect(result).toEqual({
      temperature: 21,
      condition: 'clear'
    });
  });
});
