const axios = require('axios');

let basUrl = 'http://83.251.166.89:3000';
//let fejkLista = ['hugo', 'optitod', 'dennis', 'claes', 'max'];

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
  maakepCall: async (meddelande) => {
    const arr = meddelande.content.toLocaleLowerCase().split(' ');
    const fejkLista = arr.slice(1);

    const fRes = await axios.get(`${basUrl}`);

    let todArray = fejkLista.map(async (bozo) => {
      const res = await axios.get(`${basUrl}/id/${bozo}`);
      return { namn: bozo, preferences: fRes.data[bozo], id: res.data.id };
    });

    let bajsarArray = await Promise.all(todArray);

    console.log('Här kommer bajsrakterna', bajsarArray);
    let slumpBajs = shuffleArray(bajsarArray);
    return slumpBajs;
  },
};

//async function big() {
//  const fRes = await axios.get(`${basUrl}`);
//
//  let todArray = fejkLista.map(async (bozo) => {
//    const res = await axios.get(`${basUrl}/id/${bozo}`);
//
//    console.log(bozo);
//    console.log(fRes.data[bozo]);
//    console.log(res.data.id);
//    return { namn: bozo, preferences: fRes.data[bozo], id: res.data.id };
//  });
//
//  let bajsarArray = await Promise.all(todArray);
//
//  console.log('Här kommer bajsrakterna', bajsarArray);
//  let slumpBajs = shuffleArray(bajsarArray);
//  return slumpBajs;
//  let x = 1;
//}
