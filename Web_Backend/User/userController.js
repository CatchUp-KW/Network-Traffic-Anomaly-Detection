const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("./userProvider");
const userService = require("./userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");


/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
exports.postUsers = async function (req, res) {

    /**
     * Body: email, password, nickname
     */
    const {name, ID, password} = req.body;

    // 빈 값 체크
    if (!name)
        return res.send(response(baseResponse.REGISTER_NAME_EMPTY));

    if (!ID)
        return res.send(response(baseResponse.REGISTER_ID_EMPTY));

    if (!password)
        return res.send(response(baseResponse.REGISTER_PW_EMPTY));

    //name, ID, password 형식 검사 추가 + 공백문자 검사, 공백문자 parsing, 특수문자 검사, 이름, Id형식 검사 정규식, 길이 검사


    // createUser 함수 실행을 통한 결과 값을 signUpResponse에 저장
    const registerResponse = await userService.createUser(
        name,
        ID,
        password,
    );

    // signUpResponse 값을 json으로 전달
    return res.send(registerResponse);
};



/**
 * API No. 
 * API Name : 로그인 API
 * [POST] /app/login
 * body : ID, passsword
 */
exports.login = async function (req, res) {

    const {ID, password} = req.body;
    
    if (!ID)
    return res.send(response(baseResponse.REGISTER_ID_EMPTY));

if (!password)
    return res.send(response(baseResponse.REGISTER_PW_EMPTY));
    const signInResponse = await userService.postSignIn(ID, password);

    return res.send(signInResponse);
};







// JWT 이 후 주차에 다룰 내용
/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};
