module.exports = {
  apps: [
    {
      name: 'nigerian-insider-news',
      script: './index.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      ignore_watch: ['node_modules', 'logs', 'public'],
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: 'ubuntu',
      host: 'your-server-ip',
      ref: 'origin/main',
      repo: 'https://github.com/osasbenny/Nigerian-Insider-News.git',
      path: '/home/ubuntu/nigerian-insider-news',
      'post-deploy': 'npm install && npm run db:push && pm2 reload ecosystem.config.js --env production',
    },
  },
};
