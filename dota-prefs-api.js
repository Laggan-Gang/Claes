const { laggStatsBaseUrl } = require('./config.json');
const axios = require('axios');

module.exports = {
  parseMessage: async (meddelande) => {
    const arr = meddelande.content.toLocaleLowerCase().split(' ');
    const command = arr[1];
    const parameters = arr.slice(2);

    let res = {
      success: false,
      message:
        'Available commands: roles | set | link \r\n Example: `!dota set 1 5 2 fill 4 3`',
    };

    switch (command) {
      case 'set':
        const [...roles] = parameters;
        res = await save(roles, meddelande.author.toString());
        break;
      case 'roles': {
        res = await getMyPreferences(meddelande.author.toString());
        break;
      }
      case 'link':
        res.success = true;
        res.message = laggStatsBaseUrl + '/d2pos';
        break;
    }

    return res;
  },
};

async function getMyPreferences(discordId) {
  const res = await axios.default.post(laggStatsBaseUrl, {
    aliases: [discordId],
  });
  return res.data.preference.join(' -> ');
}

async function save(roles, discordId) {
  console.log(roles, discordId);
  const res = await axios.default.put(laggStatsBaseUrl, {
    id: discordId,
    preference: roles,
  });

  const body = await res.data;

  return {
    success: res.status == 200,
    message: body,
  };
}
