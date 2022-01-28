const { dotaPrefsBaseUrl } = require('./config.json');
const axios = require('axios');

const UPDATE = `${dotaPrefsBaseUrl}/role`;
const GENERATE = `${dotaPrefsBaseUrl}/roles`;
const DELETE = `${dotaPrefsBaseUrl}/:user`;

module.exports = {
  parseMessage: async (meddelande) => {
    const arr = meddelande.content.toLocaleLowerCase().split(' ');
    const command = arr[1];
    const parameters = arr.slice(2);

    let res = {
      success: false,
      message:
        'Available commands: set | roll | delete \r\n Example: `!dota set EternaLEnVy 1 5 2 fill 4 3`',
    };

    switch (command) {
      case 'set':
        const [user, ...roles] = parameters;
        res = await update(user, roles, meddelande.author.toString());
        break;
      case 'roll':
        const users = parameters;
        res = await generate(users);
        break;
      case 'delete':
        const brukare = parameters[0];
        res = await del(brukare);
        break;
      case 'link':
        res.success = true;
        res.message = dotaPrefsBaseUrl;
        break;
    }

    return res;
  },
};

async function update(user, roles, discordId) {
  console.log(user, roles, discordId);
  const res = await axios.default.post(UPDATE, {
    userId: discordId,
    user: user,
    roles: roles,
  });

  const body = await res.data;

  return {
    success: res.status == 200,
    message: body,
  };
}

async function generate(users) {
  const res = await axios.default.post(GENERATE, {
    users: users,
    json: false,
  });

  const body = await res.data;

  return {
    success: res.status == 200,
    message: body,
  };
}

async function del(user) {
  const res = await axios.default.delete(DELETE.replace(':user', user));

  const success = res.status == 200;
  return {
    success: success,
    message: success ? 'Deleted' : 'Something went wrong',
  };
}
