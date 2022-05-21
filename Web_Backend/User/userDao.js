
// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  //const insertUserInfoParams = [name, ID, hashedPassword, 'active'];
  const insertUserInfoQuery = `
        INSERT INTO User(name, ID, password, status)
        VALUES (?, ?, ?, ?);
    `;
  const insertUserInfoRow = await connection.query(
    insertUserInfoQuery,
    insertUserInfoParams
  );

  return insertUserInfoRow;
}

// userId 회원 조회
async function selectUserId(connection, ID) {
  const selectUserIdQuery = `
                 SELECT name, ID 
                 FROM User 
                 WHERE ID = ?;
                 `;
  const [userRow] = await connection.query(selectUserIdQuery, ID);
  return userRow;
}


// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT name, ID, password
        FROM User 
        WHERE ID = ? AND password = ?;`;
  const selectUserPasswordRow = await connection.query(
      selectUserPasswordQuery,
      selectUserPasswordParams
  );

  return selectUserPasswordRow;
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, ID) {
  const selectUserAccountQuery = `
        SELECT status, ID
        FROM User 
        WHERE ID = ?;`;
  const selectUserAccountRow = await connection.query(
      selectUserAccountQuery,
      ID
  );
  return selectUserAccountRow[0];
}

async function updateUserInfo(connection, id, nickname) {
  const updateUserQuery = `
  UPDATE UserInfo 
  SET nickname = ?
  WHERE id = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [nickname, id]);
  return updateUserRow[0];
}


module.exports = {
  selectUserId,
  insertUserInfo,
  selectUserPassword,
  selectUserAccount,
  updateUserInfo,
};
