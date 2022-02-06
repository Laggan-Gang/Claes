const axios = require('axios');
const { dotaPrefsBaseUrl } = require('./config.json');

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
  maakepCall: async (meddelandeContent) => {
    const arr = meddelandeContent.toLocaleLowerCase().split(' ');

    if(arr.length != 5){
      throw Error(`Maakep magic only works on 5 potential medlems`);
    }

    const fRes = await axios.get(`${dotaPrefsBaseUrl}`);

    let todArray = fejkLista.map(async (bozo) => {
      const res = await axios.get(`${dotaPrefsBaseUrl}/id/${bozo}`);
      return { namn: bozo, preferences: fRes.data[bozo], id: res.data.id };
    });

    let bajsarArray = await Promise.all(todArray);

    console.log('Här kommer bajsrakterna', bajsarArray);
    let slumpBajs = shuffleArray(bajsarArray);
    return slumpBajs;
  },
};
