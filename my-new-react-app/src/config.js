// config.js
const config = {
    server: {
        port: process.env.PORT || 3001,
    },
    api: {
        baseURL: 'http://localhost:3001/api',
    },
    // Другие настройки...
};

module.exports = config;