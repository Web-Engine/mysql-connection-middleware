const mysql = require('promise-mysql');
const onFinished = require('on-finished');

module.exports = (config) => {
    const pool = mysql.createPool(config);
    const MySQL = {};

    MySQL.use = (autoRelease = true) => {
        return async (req, res, next) => {
            let connection = await pool.getConnection();

            let proxy = new Proxy(connection, {
                get: (target, name) => {
                    if (name !== 'release') return target[name];

                    return safeRelease;
                }
            });

            let isReleased = false;
            let safeRelease = () => {
                if (isReleased) return false;

                connection.release();
                return true;
            };

            if (autoRelease) {
                onFinished(res, safeRelease);
            }

            req.connection = proxy;
            next();
        };
    };
};