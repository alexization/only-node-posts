require('dotenv').config();

const config = {
    db: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'jei_db',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    },
    server: {
        port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    }
};

module.exports = config;