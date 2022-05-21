const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const modelDao = require("./modelDao");





exports.retrieveInfo = async function () {
    const connection = await pool.getConnection(async (conn) => conn);

    const infoResult = await modelDao.selectInfo(connection);

    connection.release();

    return infoResult;
};