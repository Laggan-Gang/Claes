const axios = require('axios');
const { laggStatsBaseUrl } = require('./config.json');

let id = '207840759087497217';

async function idRocket() {
  //const arr = meddelande.content.toLocaleLowerCase().split(' ');
  //const fejkLista = arr.slice(1);

  let aliasesData = {
    aliases: ['hugo', 'snygghugo', 'goblin', 'goblinchair bladeborne'],
    id: id,
  };

  const request = {
    baseURL: basUrl,
    url: 'alias',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: aliasesData,
    responseType: 'json',
  };

  const fRes = await axios(request);
  console.log(fRes);
  return fRes;
}

async function resRocket() {}
