describe('Exercise Lookup Feature', () => {
    const fetchAliases = async () => {
      const res = await fetch("https://wger.de/api/v2/exercisealias/?limit=50");
      const data = await res.json();
      return data.results;
    };
  
    const filterResults = (query, all) => {
      return all.filter(item =>
        query &&
        item.alias &&
        item.alias.toLowerCase().includes(query.toLowerCase())
      );
    };
  
    it('finds matches for "jump"', async () => {
      const aliases = await fetchAliases();
      const results = filterResults("jump", aliases);
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].alias.toLowerCase()).toContain("jump");
    });
  
    it('returns empty array for gibberish "sadasd"', async () => {
      const aliases = await fetchAliases();
      const results = filterResults("sadasd", aliases);
      expect(results.length).toBe(0);
    });
  
    it('finds matches for "squat"', async () => {
      const aliases = await fetchAliases();
      const results = filterResults("squat", aliases);
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].alias.toLowerCase()).toContain("squat");
    });
  });
  