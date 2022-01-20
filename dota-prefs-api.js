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

    let res = {
      success: false,
      message:
        "Available commands: set | roll | delete \r\n Example: `!dota set EternaLEnVy 1 5 2 fill 4 3`",
    };

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
        res.success = false;
        res.message = dotaPrefsBaseUrl;
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

  return {
    success: res.status == 200,
    message: body,
  };
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

  return {
    success: res.status == 200,
    message: body,
  };
}

async function del(user) {
  const res = await fetch(DELETE.replace(":user", user), {
    method: "DELETE",
  });

  const success = res.status == 200;
  return {
    success: success,
    message: success ? "Deleted" : "Something went wrong",
  };
}
