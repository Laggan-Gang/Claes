module.exports = {
  apps: [
    {
      name: 'claes',
      script: 'claes.js',
      env_hook: {
        command: 'npm run ci && pm2 restart claes',
        cwd: '/home/hugo/Claes',
      },
    },
  ],
};
