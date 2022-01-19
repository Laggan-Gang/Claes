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

    let res = "Command not found";
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
        res = await del(user);
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
