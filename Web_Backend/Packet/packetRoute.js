module.exports = function(dashboard){
    const packet = require('./packetController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 일자별 데이터량 불러오기 API
    dashboard.get('/dashboard/packet/dailyTotal', jwtMiddleware, packet.getDailyTotal);

    
    dashboard.get('/dashboard/packet/dailyTotalweek', jwtMiddleware, packet.getDailyTotalweek);

    //2. 일자별 정상 데이터량 불러오기
    dashboard.get('/dashboard/packet/dailyBenign', jwtMiddleware, packet.getDailyBenign);

    //3. 일자별 비정상 데이터량 불러오기
    dashboard.get('/dashboard/packet/dailyAbnormal', jwtMiddleware, packet.getDailyAbnormal);

    
    //4. 오늘의 데이터량 불러오기
    dashboard.get('/dashboard/packet/today', jwtMiddleware, packet.getToday);


    //7. 전체 판단 결과 불러오기
    //dashboard.get('/dashboard/packet/indices', jwtMiddleware, packet.getIndices);
    dashboard.get('/dashboard/packet/indices', jwtMiddleware, packet.getIndices);
    
    //8. 판단 결과 검색값 불러오기
    dashboard.get('/dashboard/packet/search', jwtMiddleware, packet.getSearchResult);


    //9. 시간대별 이상 트래픽 양
    dashboard.get('/dashboard/packet/AbnByTime', jwtMiddleware, packet.getAbnByTime);


    //10. 일자별 이상 트래픽 양
    dashboard.get('/dashboard/packet/AbnByDate', jwtMiddleware, packet.getAbnByDate);


    //11.특징별 통계
    dashboard.get('/dashboard/packet/byFeat', jwtMiddleware, packet.getByFeat);

    
    //6.위험탐지 피드 불러오기
    dashboard.get('/dashboard/packet/feed', jwtMiddleware, packet.getFeed);


    //14. 14가지 공격 유형 빈도
    dashboard.get('/dashboard/packet/numOfAttack', jwtMiddleware, packet.getNumAttack);

    //15. 공격 유형별 이상 트래픽 양
    dashboard.get('/dashboard/packet/byAttackType', jwtMiddleware, packet.getByAttackType);

};
