module.exports = {
  apps: [
    {
      name: "dam-front",
      script: "npm",
      args: "run start",
      watch: false,
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
