module.exports = {
  apps: [
    {
      name: 'mihu_deploy',
      script: './src/main.js',
      cwd: './',
      watch: true,
      ignore_watch: ['logs', '.git', 'node_modules'],

      out_file: './logs/mihu_deploy_info.log',
      error_file: './logs/mihu_deploy_err.log',
      log_date_format: 'YYYY-MM-DD HH:mm',
      merge_logs: true,
      restart_delay: 1000, // 崩溃重启服务时间间隔
      max_restarts: 3 // 崩溃后重启次数
    }
  ]
}
