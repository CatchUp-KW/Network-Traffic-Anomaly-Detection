module.exports = function(dashboard){
    const model = require('./modelController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


      // 12. 모델 정보 불러오기 API 
        dashboard.get('/dashboard/model/info', jwtMiddleware, model.getModelInfo);


        //13. 모델 정보 업데이트하기 API
        dashboard.post('/dashboard/model/update', model.postNewModel);  
};
