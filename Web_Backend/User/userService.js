const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");

// user 뿐만 아니라 다른 도메인의 Provider와 Dao도 아래처럼 require하여 사용할 수 있습니다.
const userProvider = require("./userProvider");
const userDao = require("./userDao");

const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createUser = async function (name, ID, password) {
    try {
        //이름 아이디 중복검사 추가 예정


        // 비밀번호 암호화
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        // 쿼리문에 사용할 변수 값을 배열 형태로 전달
        const insertUserInfoParams = [name, ID, hashedPassword, 'active'];

        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
        console.log('추가된 회원 :', ID);
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`Dashboard - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


// TODO: After 로그인 인증 방법 (JWT)
exports.postSignIn = async function (ID, password) {
    try {
        // 이메일 여부 확인
        const IDRows = await userProvider.IDCheck(ID);
        if (IDRows.length < 1) return errResponse(baseResponse.LOGIN_ID_WRONG);

        const selectID = IDRows[0].ID

        // 비밀번호 확인 (입력한 비밀번호를 암호화한 것과 DB에 저장된 비밀번호가 일치하는 지 확인함)
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const selectUserPasswordParams = [selectID, hashedPassword];
        const passwordRows = await userProvider.passwordCheck(selectUserPasswordParams);

        if (passwordRows[0].password !== hashedPassword) {
            return errResponse(baseResponse.LOGIN_PW_WRONG);
        }

        // 계정 상태 확인
        const userInfoRows = await userProvider.accountCheck(ID);

        if (userInfoRows[0].status === "inactive") {
            return errResponse(baseResponse.LOGIN_UNREGISTER_USER);
        } 
        console.log(userInfoRows[0].ID) // DB의 userId

        //토큰 생성 Service
        let token = await jwt.sign(
            {
                userId: userInfoRows[0].ID,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
            {
                expiresIn: "365d",
                subject: "userInfo",
            } // 유효 기간 365일
        );

        return response(baseResponse.SUCCESS_LOGIN, {'userId': userInfoRows[0].ID, 'jwt': token});

    } catch (err) {
        logger.error(`Dashboard - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};
