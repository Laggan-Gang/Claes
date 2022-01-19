const { dotaPrefsBaseUrl } = require("./config.json");
const fetch = require("node-fetch");

const UPDATE = `${dotaPrefsBaseUrl}/role`;
const GENERATE = `${dotaPrefsBaseUrl}/roles`;
const DELETE = `${dotaPrefsBaseUrl}/:user`;

module.exports = {
  parseMessage: async (message) => {
    const arr = message.split(" ");
    const command = arr[1];
    const parameters = arr.slice(2);

    let res =
      "Available commands: set | roll | delete \r\n Example: `!dota set Nisha fill 2 1 3 4 5`";
    switch (command) {
      case "set":
        const [user, ...roles] = parameters;
        res = await update(user, roles);
        break;
      case "roll":
        const users = parameters;
        res = await generate(users);
        break;
      case "delete":
        const brukare = parameters[0];
        res = await del(brukare);
        break;
      case "link":
        res = dotaPrefsBaseUrl;
        break;
    }

    return res;
  },
};

async function update(user, roles) {
  const res = await fetch(UPDATE, {
    method: "POST",
    body: JSON.stringify({
      user: user,
      roles: roles,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const body = await res.text();

  return body;
}

async function generate(users) {
  const res = await fetch(GENERATE, {
    method: "POST",
    body: JSON.stringify({
      users: users,
      json: false,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const body = await res.text();

  return body;
}

async function del(user) {
  const res = await fetch(DELETE.replace(":user", user), {
    method: "DELETE",
  });

  return res.status == 200 ? "deleted" : "something went wrong";
}
