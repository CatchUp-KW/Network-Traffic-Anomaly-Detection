const jwtMiddleware = require("../../../config/jwtMiddleware");
const modelProvider = require("./modelProvider");
const modelService = require("./modelService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const {logger} = require("../../../config/winston");


exports.getModelInfo = async function (req, res) {

    try{
        //jwt token 검증
        //const userIdx = req.verifiedToken.userIdx;

        const modelInfoResponse = await modelProvider.retrieveInfo();

        if(modelInfoResponse.length == 0){
            return res.send(errResponse(baseResponse.NO_DATA));
        }

        return res.send(response(baseResponse.SUCCESS_MODEL_INFO, modelInfoResponse));
       
    } catch (err) {
        logger.error(`getModelInfo error\n: ${err.message}`);
        return res.send(errResponse(baseResponse.CONTROLLER_ERROR));
    }
    
};

exports.postNewModel = async function(req, res) {

    var semantic_ver_regex = "^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$";

    const version = req.body.version;
    const trainedDate = req.body.trainedDate;
    const trainedTotal = req.body.trainedTotal;
    const description = req.body.description;
    
    
    if(!semantic_ver_regex.test(version)){
        return res.send(errResponse(baseResponse.VERSION_INVALID_TYPE));
    }

    //논의후 더 진행하기
    // 나머지 변수들 유효성 검사하고 traintedTotal 입력안했으면 가장 최근 학습량 가져와서 post하기 


}