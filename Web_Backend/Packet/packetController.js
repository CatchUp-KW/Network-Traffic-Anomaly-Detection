const jwtMiddleware = require("../../../config/jwtMiddleware");
const packetProvider = require("../../dashboard/Packet/packetProvider");
const packetService = require("../../dashboard/Packet/packetService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const {logger} = require("../../../config/winston");

const regexEmail = require("regex-email");



exports.getDailyTotal = async function (req, res) {

    try{
        //jwt token 검증
        const userIdx = req.verifiedToken.userIdx;

        const dailyTotalResponse = await packetProvider.retrieveDailyTotal();
        return res.send(response(baseResponse.SUCCESS_DAILY_TOTAL, dailyTotalResponse));
       
    } catch (err) {
        logger.error(`getdDailyTotal error\n: ${err.message}`);
        return res.send(errResponse(baseResponse.CONTROLLER_ERROR));
    }
    
};


exports.getDailyTotalweek = async function (req, res) {

    try{
        //jwt token 검증
        const userIdx = req.verifiedToken.userIdx;

        const dailyTotalweekResponse = await packetProvider.retrieveDailyTotalweek();
        return res.send(response(baseResponse.SUCCESS_DAILY_TOTAL, dailyTotalweekResponse));
       
    } catch (err) {
        logger.error(`getDailyTotalweek error\n: ${err.message}`);
        return res.send(errResponse(baseResponse.CONTROLLER_ERROR));
    }
    
};



exports.getDailyBenign = async function (req, res) {

    try{
        //jwt token 검증
        const userIdx = req.verifiedToken.userIdx;

        const dailyBenignResponse = await packetProvider.retrieveDailyBenign();
        return res.send(response(baseResponse.SUCCESS_DAILY_BENIGN, dailyBenignResponse));
       
    } catch (err) {
        logger.error(`getDailyBenign error\n: ${err.message}`);
        return res.send(errResponse(baseResponse.CONTROLLER_ERROR));
    }
    
};


exports.getDailyAbnormal = async function (req, res) {

    try{
        //jwt token 검증
        const userIdx = req.verifiedToken.userIdx;

        const dailyAbnormalResponse = await packetProvider.retrieveDailyAbnormal();
        return res.send(response(baseResponse.SUCCESS_DAILY_ABNORMAL, dailyAbnormalResponse));
       
    } catch (err) {
        logger.error(`getDailyAbnoraml error\n: ${err.message}`);
        return res.send(errResponse(baseResponse.CONTROLLER_ERROR));
    }
    
};


exports.getToday = async function (req, res) {

    try{
        //jwt token 검증
        const userIdx = req.verifiedToken.userIdx;

        const todayResponse = await packetProvider.retrieveToday();
        return res.send(response(baseResponse.SUCCESS_TODAY, todayResponse));
       
    } catch (err) {
        logger.error(`getToday error\n: ${err.message}`);
        return res.send(errResponse(baseResponse.CONTROLLER_ERROR));
    }
    
};


exports.getIndices = async function (req, res) {

    try{
        //jwt token 검증
        const userIdx = req.verifiedToken.userIdx;

        var curPage = req.query.curPage;
        var pageSize = req.query.pageSize;

        
        const DEFAULT_CURRENT_PAGE = 1; 
        const DEFAULT_PAGE_SIZE = 4;      
        var indicesResponse = [];  

        if(curPage && pageSize){
            if(curPage <= 0) curPage = DEFAULT_CURRENT_PAGE;
            if(pageSize <= 0) pageSize = DEFAULT_PAGE_SIZE;
            
            let getWithPaging = {
                offset : (curPage-1)*Number(pageSize),
                limit : Number(pageSize)
            };

            indicesResponse = await packetProvider.retrieveIndicesList(getWithPaging);
        } 
        else {              //if(!curPage || !pageSize){   
            indicesResponse = await packetProvider.retrieveIndicesALL();
        }
        

        return res.send(response(baseResponse.SUCCESS_INDICES, indicesResponse));
       
    } catch (err) {
        logger.error(`getIndices error\n: ${err.message}`);
        return res.send(errResponse(baseResponse.CONTROLLER_ERROR));
    }
    
};

exports.getSearchResult = async function (req, res) {

    try{
        //jwt token 검증
        const userIdx = req.verifiedToken.userIdx;

        var curPage = req.query.curPage;
        var pageSize = req.query.pageSize;

        var src = req.query.src;
        var dst = req.query.dst;

        
        var startAt = req.query.startAt;
        var endAt = req.query.endAt;


        console.log('curPage : ', curPage);
        console.log('pageSize : ', pageSize);
        console.log('src : ', src);
        console.log('dst : ', dst);
        console.log('startAt : ', startAt);
        console.log('endAt : ', endAt );

        const DEFAULT_CURRENT_PAGE = 1; 
        const DEFAULT_PAGE_SIZE = 4;      
        var searchResponse = [];  

        //startAt, endAt 유효성 검사

        if(!src){
            src = null;
        }
        if(!dst){
            dst = null;
        }
        
        const dateRangeStart = new Date('2000-01-01');
        const dateRangeEnd = new Date('2099-12-31');
        var datePattern = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/; 

        if(startAt){
            if(!datePattern.test(startAt)){     //yyyy-MM-dd 형식 검사
                return res.send(errResponse(baseResponse.STARTAT_ERROR_TYPE));  
            }

            let tempstartAt = new Date(startAt);

            if( tempstartAt < dateRangeStart || tempstartAt > dateRangeEnd){
                return res.send(errResponse(baseResponse.STARTAT_INVALID_VALUE));  
            }
        }else{
            startAt = null;
        }

        if(endAt){
            if(!datePattern.test(endAt)){     //yyyy-MM-dd 형식 검사
                return res.send(errResponse(baseResponse.ENDAT_ERROR_TYPE));  
            }

            let tempendAt = new Date(endAt);

            if( tempendAt < dateRangeStart || tempendAt > dateRangeEnd){
                return res.send(errResponse(baseResponse.ENDAT_INVALID_VALUE));
            }
        }else{
            endAt = null;
        }
        
        if(curPage && pageSize){
            if(curPage <= 0) curPage = DEFAULT_CURRENT_PAGE;
            if(pageSize <= 0) pageSize = DEFAULT_PAGE_SIZE;
            
            let getWithPaging = {
                offset : (curPage-1)*Number(pageSize),
                limit : Number(pageSize)
            };

            searchResponse = await packetProvider.retrieveResultPaging(getWithPaging, src, dst, startAt, endAt);
        } 
        else {              //if(!curPage || !pageSize){   
            searchResponse = await packetProvider.retrieveResultAll(src, dst, startAt, endAt);
        }
        

        return res.send(response(baseResponse.SUCCESS_SEARCH, searchResponse));
       
    } catch (err) {
        logger.error(`getSearchResult error\n: ${err.message}`);
        return res.send(errResponse(baseResponse.CONTROLLER_ERROR));
    }
    
};


exports.getAbnByTime = async function (req, res) {

    try{
        //jwt token 검증
        const userIdx = req.verifiedToken.userIdx;

        var option = req.query.option;
        
        let DEFAULT_INTERVAL = 6;

        var interval = DEFAULT_INTERVAL;
        
        if(typeof(option) == 'undefined'){
            interval = DEFAULT_INTERVAL;
        }
        else{            
            option = new Number(option);

            if(isNaN(option)){
                return res.send(errResponse(baseResponse.OPTION_INVALID_TYPE));  
            }
            if(option < 1 || option > 3){
                return res.send(errResponse(baseResponse.OPTION_INVALID_VALUE));  
            }

            if(option == 1){
                interval = 6;
            }
            else if(option == 2){
                interval = 29;
            }
            else if (option == 3) {
                interval = 89;
            }
        }        
        console.log('bytime interval :', interval)

        const abnByTimeResponse = await packetProvider.retrieveAbnByTime(interval);
        return res.send(response(baseResponse.SUCCESS_ABNORMAL_BY_TIME, abnByTimeResponse));
       
    } catch (err) {
        logger.error(`getAbnByTime error\n: ${err.message}`);
        return res.send(errResponse(baseResponse.CONTROLLER_ERROR));
    }
    
};


exports.getAbnByDate = async function (req, res) {

    try{
        //jwt token 검증
        const userIdx = req.verifiedToken.userIdx;

        var option = req.query.option;
        
        let DEFAULT_INTERVAL = 29;

        var interval = DEFAULT_INTERVAL;
        
        if(typeof(option) == 'undefined'){
            interval = DEFAULT_INTERVAL;
        }
        else{            
            option = new Number(option);
            if(isNaN(option)){
                return res.send(errResponse(baseResponse.OPTION_INVALID_TYPE));  
            }
            if(option < 1 || option > 3){
                return res.send(errResponse(baseResponse.OPTION_INVALID_VALUE));  
            }

            if(option == 1){
                interval = 6;
            }
            else if(option == 2){
                interval = 29;
            }
            else if (option == 3) {
                interval = 89;
            }
        }        
        console.log('byDate interval :', interval)

        const abnByDateResponse = await packetProvider.retrieveAbnByDate(interval);

        if(abnByDateResponse.length == 0){
            return res.send(errResponse(baseResponse.NO_DATA));
        }

        return res.send(response(baseResponse.SUCCESS_ABNORMAL_BY_DATE, abnByDateResponse));
       
    } catch (err) {
        logger.error(`getAbnByDate error\n: ${err.message}`);
        return res.send(errResponse(baseResponse.CONTROLLER_ERROR));
    }
    
};

exports.getByFeat = async function (req, res) {

    try{
        //jwt token 검증
        const userIdx = req.verifiedToken.userIdx;

        const byFeatResponse = await packetProvider.retrieveByFeat();

        if(byFeatResponse.length == 0){
            return res.send(errResponse(baseResponse.NO_DATA));
        }

        return res.send(response(baseResponse.SUCCESS_ABNORMAL_BY_FEAT, byFeatResponse));
       
    } catch (err) {
        logger.error(`getAbnByDate error\n: ${err.message}`);
        return res.send(errResponse(baseResponse.CONTROLLER_ERROR));
    }
    
};


exports.getFeed = async function (req, res) {

    try{
        //jwt token 검증
        const userIdx = req.verifiedToken.userIdx;

        var sort = req.query.sort; // 1: src ip sort, 2: dest
        
        
        if(typeof(sort) == 'undefined'){
            sort = 1;
        }
        else{            
            sort = new Number(sort);
            if(isNaN(sort)){
                return res.send(errResponse(baseResponse.SORT_INVALID_TYPE));  
            }
            if(sort < 1 || sort > 2){
                return res.send(errResponse(baseResponse.SORT_INVALID_VALUE));  
            }

        }        

        const getFeedResponse = await packetProvider.retrieveFeed(sort);

        if(getFeedResponse.length == 0){
            return res.send(errResponse(baseResponse.NO_DATA));
        }

        return res.send(response(baseResponse.SUCCESS_FEED, getFeedResponse));
       
    } catch (err) {
        logger.error(`getFeed error\n: ${err.message}`);
        return res.send(errResponse(baseResponse.CONTROLLER_ERROR));
    }
    
};

exports.getNumAttack = async function (req, res) {

    try{
        //jwt token 검증
        const userIdx = req.verifiedToken.userIdx;
        
        var option = req.query.option;
        
        let DEFAULT_INTERVAL = 6;

        var interval = DEFAULT_INTERVAL;
        
        if(typeof(option) == 'undefined'){
            interval = DEFAULT_INTERVAL;
        }
        else{            
            option = new Number(option);

            if(isNaN(option)){
                return res.send(errResponse(baseResponse.OPTION_INVALID_TYPE));  
            }
            if(option < 1 || option > 3){
                return res.send(errResponse(baseResponse.OPTION_INVALID_VALUE));  
            }

            if(option == 1){
                interval = 6;
            }
            else if(option == 2){
                interval = 29;
            }
            else if (option == 3) {
                interval = 89;
            }
        }        

        const attackNumResponse = await packetProvider.retrieveNumOfAttack(interval);

        return res.send(response(baseResponse.SUCCESS_NUM_ATTACK_TYPE, attackNumResponse));
       
    } catch (err) {
        logger.error(`getNumAttack error\n: ${err.message}`);
        return res.send(errResponse(baseResponse.CONTROLLER_ERROR));
    }
    
};

exports.getByAttackType = async function (req, res) {

    try{
        //jwt token 검증
        const userIdx = req.verifiedToken.userIdx;

        var option = req.query.option;
        
        let DEFAULT_INTERVAL = 6;

        var interval = DEFAULT_INTERVAL;
        
        if(typeof(option) == 'undefined'){
            interval = DEFAULT_INTERVAL;
        }
        else{            
            option = new Number(option);

            if(isNaN(option)){
                return res.send(errResponse(baseResponse.OPTION_INVALID_TYPE));  
            }
            if(option < 1 || option > 3){
                return res.send(errResponse(baseResponse.OPTION_INVALID_VALUE));  
            }

            if(option == 1){
                interval = 6;
            }
            else if(option == 2){
                interval = 29;
            }
            else if (option == 3) {
                interval = 89;
            }
        }        

        var byTypeResponse = [[ 'Bot', 'DDoS', 'DoS_GoldenEye', 'DoS_Hulk', 
                        'DoS_Slowhttptest', 'DoS_slowloris', 'FTPPatator', 'Heartbleed', 'Infiltration', 
                        'PortScan', 'SSHPatator', 'Web_Attack_Brute_Force', 'Web_Attack_Sql_Injection', 'Web_Attack_XSS' ]]

        const byAttackTypeResponse = await packetProvider.retrieveByAttack(interval);

        byTypeResponse.push(byAttackTypeResponse)

        return res.send(response(baseResponse.SUCCESS_ABNORMAL_BY_ATTACK_TYPE, byTypeResponse));
       
    } catch (err) {
        logger.error(`getNumAttack error\n: ${err.message}`);
        return res.send(errResponse(baseResponse.CONTROLLER_ERROR));
    }
    
};