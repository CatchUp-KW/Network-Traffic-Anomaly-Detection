const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const packetDao = require("./packetDao");


exports.retrieveDailyTotal = async function () {
    const connection = await pool.getConnection(async (conn) => conn);

    const dailyTotalResult = await packetDao.selectDailyTotal(connection);
    connection.release();

    return dailyTotalResult;
};


exports.retrieveDailyTotalweek = async function () {
    const connection = await pool.getConnection(async (conn) => conn);

    const dailyTotalweekResult = await packetDao.selectDailyTotalweek(connection);
    connection.release();

    return dailyTotalweekResult;
};

exports.retrieveDailyBenign = async function () {
    const connection = await pool.getConnection(async (conn) => conn);

    const dailyBenignResult = await packetDao.selectDailyBenign(connection);
    connection.release();

    return dailyBenignResult;
};

exports.retrieveDailyAbnormal = async function () {
    const connection = await pool.getConnection(async (conn) => conn);

    const dailyAbnormalResult = await packetDao.selectDailyAbnormal(connection);

    connection.release();

    return dailyAbnormalResult;
};

exports.retrieveToday = async function () {
    const connection = await pool.getConnection(async (conn) => conn);

    const todayResult = await packetDao.selectToday(connection);

    connection.release();

    return todayResult;
};

  
exports.retrieveIndicesList= async function (getWithPaging) {
    const connection = await pool.getConnection(async (conn) => conn);

    const pagingParams = [getWithPaging.limit, getWithPaging.offset];

    const indicesListResult = await packetDao.selectIndices(connection, pagingParams);

    connection.release();

    return indicesListResult;
};
    
exports.retrieveIndicesALL= async function () {
    const connection = await pool.getConnection(async (conn) => conn);


    const indicesListALLResult = await packetDao.selectIndicesALL(connection);

    connection.release();

    return indicesListALLResult;
};



//queryParams = {src, dst, startAt, endAt};

exports.retrieveResultPaging= async function (getWithPaging, src, dst, startAt, endAt) {
    const connection = await pool.getConnection(async (conn) => conn);

    var searchPagingResult = [];

    var params =[];

    if(src != null){//src
        if(dst != null){
            if(startAt != null){
                if(endAt != null){      //src , dst , startAt , endAt, limit, offset
                   params = [src, dst, startAt, endAt, getWithPaging.limit, getWithPaging.offset];                   
                    searchPagingResult = await packetDao.selectSearch1_pg(connection, params);
                }
                else{
                    //src && dst && startAt
                    params = [src, dst, startAt, getWithPaging.limit, getWithPaging.offset];                   
                    searchPagingResult = await packetDao.selectSearch2_pg(connection, params);}
            }

            else if(endAt != null){ //src && dst && endAt
                params = [src, dst, endAt, getWithPaging.limit, getWithPaging.offset];                   
                    searchPagingResult = await packetDao.selectSearch3_pg(connection, params);
            }
            else{
                //src && dst 
                params = [src, dst, getWithPaging.limit, getWithPaging.offset];                   
                searchPagingResult = await packetDao.selectSearch4_pg(connection, params);}
        }
        //no dst     
        else if(startAt != null){
            if(endAt != null){  //src && startAt && endAt
               params = [src, startAt, endAt, getWithPaging.limit, getWithPaging.offset];                   
                searchPagingResult = await packetDao.selectSearch5_pg(connection, params);
            }
            else{
                //src startAt
                params = [src, startAt, getWithPaging.limit, getWithPaging.offset];                   
                searchPagingResult = await packetDao.selectSearch6_pg(connection, params);
            }
            
        } 
        else if(endAt != null){  //src && endAt
            params = [src, endAt, getWithPaging.limit, getWithPaging.offset];                   
             searchPagingResult = await packetDao.selectSearch7_pg(connection, params);
         }
         else{
            // src
            params = [src, getWithPaging.limit, getWithPaging.offset];                   
            searchPagingResult = await packetDao.selectSearch8_pg(connection, params);
         }
        
    }

    else if(dst != null){ 
        if(startAt != null){
            if(endAt != null){  //dst && startAt && endAt
               params = [dst, startAt, endAt, getWithPaging.limit, getWithPaging.offset];                   
                searchPagingResult = await packetDao.selectSearch9_pg(connection, params);
            }
            else{
                //dst startAt
                params = [dst, startAt, getWithPaging.limit, getWithPaging.offset];                   
                searchPagingResult = await packetDao.selectSearch10_pg(connection, params);
            }
        } 
        else if(endAt != null){  //dst && endAt
            params = [dst, endAt, getWithPaging.limit, getWithPaging.offset];                   
             searchPagingResult = await packetDao.selectSearch11_pg(connection, params);
         }
         else{
            
            // dst
            params = [dst, getWithPaging.limit, getWithPaging.offset];                   
            searchPagingResult = await packetDao.selectSearch12_pg(connection, params);
         }
    }


    else if(startAt != null){
        if(endAt != null)  { // startAt && endAt
            params = [startAt, endAt, getWithPaging.limit, getWithPaging.offset];                   
            searchPagingResult = await packetDao.selectSearch13_pg(connection, params);
        }
        else{
            //startAt
        params = [startAt, getWithPaging.limit, getWithPaging.offset];                   
        searchPagingResult = await packetDao.selectSearch14_pg(connection, params);
        }
        
    }
    else if(endAt != null){
        params = [endAt, getWithPaging.limit, getWithPaging.offset];                   
        searchPagingResult = await packetDao.selectSearch15_pg(connection, params);
    }
    else{
        const pagingParams = [getWithPaging.limit, getWithPaging.offset];

        searchPagingResult = await packetDao.selectIndices(connection, pagingParams);
    }

    console.log('search paging params :', params);

    connection.release();

    return searchPagingResult;
};
    
exports.retrieveResultAll= async function (src, dst, startAt, endAt) {
    const connection = await pool.getConnection(async (conn) => conn);

    var searchALLResult = [];

    var params = [];

    if(src != null){//src
        if(dst != null){
            if(startAt != null){
                if(endAt != null){      //src , dst , startAt , endAt
                   params = [src, dst, startAt, endAt ];                   
                    searchALLResult = await packetDao.selectSearch1(connection, params);
                }
                else{
                    //src && dst && startAt
                    params = [src, dst, startAt ];                   
                    searchALLResult = await packetDao.selectSearch2(connection, params);}

            }

            else if(endAt != null){ //src && dst && endAt
                params = [src, dst, endAt ];                   
                    searchALLResult = await packetDao.selectSearch3(connection, params);
            }
            else{                
                //src && dst 
                params = [src, dst ];                   
                searchALLResult = await packetDao.selectSearch4(connection, params);
            }
        }

        //no dst     
        else if(startAt != null){
            if(endAt != null){  //src && startAt && endAt
               params = [src, startAt, endAt ];                   
                searchALLResult = await packetDao.selectSearch5(connection, params);
            }
            else{
                //src startAt
                params = [src, startAt ];                   
                searchALLResult = await packetDao.selectSearch6(connection, params);}
        } 
        else if(endAt != null){  //src && endAt
            params = [src, endAt ];                   
             searchALLResult = await packetDao.selectSearch7(connection, params);
         }
         else{
            // src
            params = [src ];                   
            searchALLResult = await packetDao.selectSearch8(connection, params);
         }
        
    }

    else if(dst != null){ 
        if(startAt != null){
            if(endAt != null){  //dst && startAt && endAt
               params = [dst, startAt, endAt ];                   
                searchALLResult = await packetDao.selectSearch9(connection, params);
            }
            else{
                //dst startAt
                params = [dst, startAt ];                   
                searchALLResult = await packetDao.selectSearch10(connection, params);
            }
          
        } 
        else if(endAt != null){  //dst && endAt
            params = [dst, endAt ];                   
             searchALLResult = await packetDao.selectSearch11(connection, params);
         }
        else{
            // dst
            params = [dst ];                   
            searchALLResult = await packetDao.selectSearch12(connection, params);
        }
    }


    else if(startAt != null){
        if(endAt != null)  { // startAt && endAt
            params = [startAt, endAt ];                   
            searchALLResult = await packetDao.selectSearch13(connection, params);
        }
        else{
            //startAt
            params = [startAt ];                   
            searchALLResult = await packetDao.selectSearch14(connection, params);
        }
       
    }
    else if(endAt != null){
        params = [endAt ];                   
        searchALLResult = await packetDao.selectSearch15(connection, params);
    }
    else{
        searchALLResult = await packetDao.selectIndicesALL(connection);
    }

    console.log('search all params : ', params);
    
    connection.release();

    return searchALLResult;
};

exports.retrieveAbnByTime = async function (interval) {
    const connection = await pool.getConnection(async (conn) => conn);

    const abnByTimeResult = await packetDao.selectAbByTime(connection, interval);

    connection.release();

    return abnByTimeResult;
};


exports.retrieveAbnByDate = async function (interval) {
    const connection = await pool.getConnection(async (conn) => conn);

    const abnByDateResult = await packetDao.selectAbByDate(connection, interval);

    connection.release();

    return abnByDateResult;
};



exports.retrieveByFeat = async function () {
    const connection = await pool.getConnection(async (conn) => conn);

    const abnByFeatResult = await packetDao.selectByFeat(connection);

    connection.release();

    return abnByFeatResult;
};

exports.retrieveFeed  = async function (sort) {
    const connection = await pool.getConnection(async (conn) => conn);

    const selectFeedResponse = await packetDao.selectFeed(connection, sort);

    connection.release();

    return selectFeedResponse;
};

exports.retrieveNumOfAttack = async function (interval) {
    const connection = await pool.getConnection(async (conn) => conn);

    const numOfAttackResult = await packetDao.selectNumOfAttack(connection, interval);

    connection.release();

    return numOfAttackResult;
};

exports.retrieveByAttack = async function (interval) {
    const connection = await pool.getConnection(async (conn) => conn);

    const abnByAttackResult = await packetDao.selectByAttack(connection, interval);

    connection.release();

    return abnByAttackResult;
};