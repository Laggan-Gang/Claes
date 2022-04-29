const { laggStatsBaseUrl } = require('./config.json');
const axios = require('axios');

const PREF_URL = laggStatsBaseUrl + '/d2pos';

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
        res = await save(roles, meddelande.author.id);
        break;
      case 'roles': {
        res = await getMyPreferences(meddelande.author.id);
        break;
      }
      case 'link':
        res.success = true;
        res.message = PREF_URL;
        break;
    }

    return res;
  },
};

async function getMyPreferences(discordId) {
  const res = await axios.default.post(PREF_URL, {
    aliases: [discordId],
  });
  const prefs = res.data?.[0]?.preference.join(' > ');

  return {
    message: prefs || 'No roles stored for you. Use `!dota set 5 2 3 fill 1 2`',
    success: !!prefs,
  };
}

async function save(roles, discordId) {
  const res = await axios.default.put(PREF_URL, {
    id: discordId,
    preference: roles,
  });

  const body = await res.data;

  return {
    success: res.status == 200,
    message: body,
  };
}
