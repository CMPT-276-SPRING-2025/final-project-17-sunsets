export const clothingOptions = {
    clear: [
      ["T-shirt", "Shorts", "Sunglasses"],
      ["Tank top", "Cargo shorts", "Hat"],
      ["Long sleeve shirt", "Jeans", "Sneakers"],
    ],
    rain: [
      ["Rain jacket", "Waterproof shoes", "Umbrella"],
      ["Waterproof coat", "Boots", "Poncho"],
      ["Rainproof hoodie", "Gum boots", "Hat"],
    ],
    snow: [
      ["Winter coat", "Gloves", "Beanie"],
      ["Puffer jacket", "Thermal pants", "Snow boots"],
      ["Insulated jacket", "Scarf", "Wool gloves"],
    ],
    cloudy: [
      ["Light jacket", "Jeans", "Scarf"],
      ["Cardigan", "Trousers", "Boots"],
      ["Sweater", "Leggings", "Hat"],
    ],
    windy: [
      ["Windbreaker", "Tight pants", "Beanie"],
      ["Light jacket", "Cargo pants", "Gloves"],
      ["Hoodie", "Wind pants", "Cap"],
    ],
    hot: [
      ["Tank top", "Shorts", "Flip-flops"],
      ["T-shirt", "Swim trunks", "Sunglasses"],
      ["Short-sleeve shirt", "Board shorts", "Hat"],
    ],
    cold: [
      ["Sweater", "Jeans", "Boots"],
      ["Long-sleeve shirt", "Corduroy pants", "Wool hat"],
      ["Thermal jacket", "Leggings", "Scarf"],
    ],
    stormy: [
      ["Rainproof jacket", "Heavy boots", "Hoodie"],
      ["Storm jacket", "Waterproof pants", "Rubber boots"],
      ["Windproof coat", "Hiking boots", "Thermal gloves"],
    ]
  };
  
  export const getClothingRecommendation = (weather) => {
    const options = clothingOptions[weather] || [["Standard activewear"]];
    const randomSetIndex = Math.floor(Math.random() * options.length);
    const randomSet = options[randomSetIndex];
    return randomSet;
  };
  