module.exports = {
  // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
  apps: [
    {
      name: 'nextjs-project-init',
      script: 'npm',
      args: 'start',
      watch: ['.next'],
      ignore_watch: ['node_modules', 'logs', 'static'],
      out_file: './logs/out.log',
      error_file: './logs/err.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
    },
  ],
};
