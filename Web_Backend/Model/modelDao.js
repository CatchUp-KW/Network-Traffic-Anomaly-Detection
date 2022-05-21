
async function selectInfo(connection) {
  
    const modelInfoQuery  = `
        SELECT version, trainedDate, trainedTotal
        FROM Model
        ORDER BY modelIdx DESC LIMIT 1;`;

    const [modelInfoRow] = await connection.query(
        modelInfoQuery);
  
    return modelInfoRow;
};


module.exports = {
    selectInfo,
};
