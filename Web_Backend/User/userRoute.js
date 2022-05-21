module.exports = function(dashboard){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    // 1. 유저 생성 (회원가입) API
    dashboard.post('/dashboard/user/register', user.postUsers);

    // 로그인 하기 API (JWT 생성)
    dashboard.post('/dashboard/user/login', user.login);

    // 회원 정보 수정 API (JWT 검증 및 Validation - 메소드 체이닝 방식으로 jwtMiddleware 사용)
  //  dashboard.patch('/dashboard/users/:userId', jwtMiddleware, user.patchUsers)



};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// dashboard.get('/dashboard/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API