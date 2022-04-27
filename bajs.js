const axios = require('axios');
const { laggStatsBaseUrl } = require('./config.json');

//BELOW THIS LINE IS AUTHENTIC MAAKEP CODE, DO NOT MAKE ANY CHANGES AS IT IS THE ENGINE WHICH DRIVES THE ENTIRE PROJECT\\

function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//ABOVE THIS LINE IS AUTHENTIC MAAKEP CODE, DO NOT MAKE ANY CHANGES AS IT IS THE ENGINE WHICH DRIVES THE ENTIRE PROJECT\\

module.exports = {
  fetchPreferencesForGamers: async (gamers) => {
    const res = await axios.post(`${laggStatsBaseUrl}/d2pos`, {
      aliases: gamers,
    });

    const playersWithRoles = res.data.map((x) => ({
      namn: x.alias,
      id: x.id,
      preferences: x.preferences,
    }));

    const shuffled = shuffleArray(playersWithRoles);
    return shuffled;
  },
};
