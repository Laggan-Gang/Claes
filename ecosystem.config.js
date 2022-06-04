module.exports = {
  apps: [
    {
      name: 'claes',
      script: 'npm run startup',
      env_hook: {
        command: 'git pull && pm2 restart claes',
        cwd: '/home/hugo/Claes',
      },
    },
  ],
};
