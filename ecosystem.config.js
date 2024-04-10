module.exports = {
    apps: [
        {
            name: 'Dashboard.js',
            script: './app.js',
            instances: 1,
            exec_mode: 'fork',
            wait_ready: true,
            listen_timeout: 50000,
            kill_timeout: 5000,
            env: {
                "NODE_ENV": "development"
            },
            env_production: {
                "NODE_ENV": "production"
            }
        }
    ]
}