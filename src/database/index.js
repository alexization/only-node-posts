const mariadb = require('mariadb');
const config = require('../config');
const AppError = require('../utils/AppError');

const pool = mariadb.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    port: config.db.port,
});

async function query(sql, params) {
    let conn;
    try {
        conn = await pool.getConnection();
        return await conn.query(sql, params);
    } catch (error) {
        console.log('Database Query Error: ', error);
        throw new AppError(`Database Query Error: ${error.message}`, 500);
    } finally {
        if (conn) conn.release();
    }
}

async function transaction(transactionFn) {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.beginTransaction();

        const result = await transactionFn(conn);

        await conn.commit();
        return result;
    } catch (error) {
        if (conn) await conn.rollback();
        console.log('Database Transaction Error: ', error);
        throw new AppError(`Database Transaction Error: ${error.message}`, 500);
    } finally {
        if (conn) conn.release();
    }
}

module.exports = {
    query, transaction,
};