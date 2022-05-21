
async function selectDailyTotal(connection) {
  
    const DailyTotalListQuery  = `
        SELECT DATE_FORMAT(total.Date, '%Y-%m-%d') as date, total.totalCount, benign.benignCount, abnormal.abnormalCount FROM
        (SELECT TD.Date, count(Packets.pktIdx) AS totalCount FROM (SELECT * FROM TempDate WHERE  date >= DATE_SUB(CURDATE(), INTERVAL 14 DAY) AND date <= CURDATE() ) AS TD
            LEFT OUTER JOIN Packets
                on TD.Date = DATE_FORMAT(Packets.Timestamp, '%Y-%m-%d')
            GROUP BY TD.Date) as total
        LEFT JOIN (
            SELECT tD.Date as date, count(Packets.pktIdx) AS benignCount FROM (SELECT * FROM TempDate WHERE  date >= DATE_SUB(CURDATE(), INTERVAL 14 DAY) AND date <= CURDATE() ) AS tD
            LEFT OUTER JOIN Packets
                on tD.Date = DATE_FORMAT(Packets.Timestamp, '%Y-%m-%d') AND Packets.result = 1
            GROUP BY tD.Date
            )as benign on total.Date = benign.date
        LEFT JOIN (
            SELECT Td.Date as date, count(Packets.pktIdx) AS abnormalCount FROM (SELECT * FROM TempDate WHERE  date >= DATE_SUB(CURDATE(), INTERVAL 14 DAY) AND date <= CURDATE() ) AS Td
            LEFT OUTER JOIN Packets
                on Td.Date = DATE_FORMAT(Packets.Timestamp, '%Y-%m-%d') AND Packets.result = 0
            GROUP BY Td.Date
            )as abnormal on total.Date = abnormal.date;`;

    const [dailyTotalRows] = await connection.query(
        DailyTotalListQuery);
  
    return dailyTotalRows;
};

async function selectDailyTotalweek(connection) {
  
    const DailyTotalweekListQuery  = `
        SELECT DATE_FORMAT(total.Date, '%Y-%m-%d') as date, total.totalCount, benign.benignCount, abnormal.abnormalCount FROM
        (SELECT TD.Date, count(Packets.pktIdx) AS totalCount FROM (SELECT * FROM TempDate WHERE  date >= DATE_SUB(CURDATE(), INTERVAL 6 DAY) AND date <= CURDATE() ) AS TD
            LEFT OUTER JOIN Packets
                on TD.Date = DATE_FORMAT(Packets.Timestamp, '%Y-%m-%d')
            GROUP BY TD.Date) as total
        LEFT JOIN (
            SELECT tD.Date as date, count(Packets.pktIdx) AS benignCount FROM (SELECT * FROM TempDate WHERE  date >= DATE_SUB(CURDATE(), INTERVAL 6 DAY) AND date <= CURDATE() ) AS tD
            LEFT OUTER JOIN Packets
                on tD.Date = DATE_FORMAT(Packets.Timestamp, '%Y-%m-%d') AND Packets.result = 1
            GROUP BY tD.Date
            )as benign on total.Date = benign.date
        LEFT JOIN (
            SELECT Td.Date as date, count(Packets.pktIdx) AS abnormalCount FROM (SELECT * FROM TempDate WHERE  date >= DATE_SUB(CURDATE(), INTERVAL 6 DAY) AND date <= CURDATE() ) AS Td
            LEFT OUTER JOIN Packets
                on Td.Date = DATE_FORMAT(Packets.Timestamp, '%Y-%m-%d') AND Packets.result = 0
            GROUP BY Td.Date
            )as abnormal on total.Date = abnormal.date;`;

    const [dailyTotalweekRows] = await connection.query(
        DailyTotalweekListQuery);
  
    return dailyTotalweekRows;
};




async function selectDailyBenign(connection) {
  
    const DailyBenignTotalListQuery = `
        SELECT DATE_FORMAT(TD.Date, '%Y-%m-%d') as date, count(Packets.pktIdx) AS benignCount FROM (SELECT * FROM TempDate WHERE  date >= DATE_SUB(CURDATE(), INTERVAL 29 DAY) AND date <= CURDATE() ) AS TD
        LEFT OUTER JOIN Packets
            on TD.Date = DATE_FORMAT(Packets.Timestamp, '%Y-%m-%d') AND Packets.result = 1
        GROUP BY TD.Date;;`;

    const [dailyBenignTotalRows] = await connection.query(
        DailyBenignTotalListQuery);
  
    return dailyBenignTotalRows;
};

async function selectDailyAbnormal(connection) {
  
    const DailyAbnormalTotalListQuery  = `
        SELECT DATE_FORMAT(TD.Date, '%Y-%m-%d') as date, count(Packets.pktIdx) AS abnormalCount FROM (SELECT * FROM TempDate WHERE  date >= DATE_SUB(CURDATE(), INTERVAL 29 DAY) AND date <= CURDATE() ) AS TD
        LEFT OUTER JOIN Packets
            on TD.Date = DATE_FORMAT(Packets.Timestamp, '%Y-%m-%d') AND Packets.result = 0
        GROUP BY TD.Date;`;

    const [dailyAbnormalTotalRows] = await connection.query(
        DailyAbnormalTotalListQuery);
  
    return dailyAbnormalTotalRows;
};


async function selectToday(connection) {
  
    const todayDataListQuery  = `
        SELECT DATE_FORMAT(today.date, '%Y-%m-%d') as date, today.total, bb.benignCount, aa.abnormalCount
        FROM
        (SELECT current_date as date,
            count(t.pktIdx) as total
            FROM Packets as t
            WHERE DATE_FORMAT(t.Timestamp, '%Y-%m-%d') = CURRENT_DATE()) as today
        LEFT OUTER JOIN (
        SELECT current_date as bdate,
            count(b.pktIdx) as benignCount
            FROM Packets as b
            WHERE DATE_FORMAT(b.Timestamp, '%Y-%m-%d') = CURRENT_DATE() AND b.result = 1) as bb
        on today.date = bb.bdate
        LEFT OUTER JOIN (
            SELECT current_date as adate,
            count(a.pktIdx) as abnormalCount
            FROM Packets as a
            WHERE DATE_FORMAT(a.Timestamp, '%Y-%m-%d') = CURRENT_DATE() AND a.result = 0) as aa
        on today.date = aa.adate;`;

    const [todayDataRows] = await connection.query(
        todayDataListQuery);
  
    return todayDataRows;
};


async function selectAbByTime(connection, interval) {
  
    const AbByTimeQuery  = `
        select TIME_FORMAT(TT.time, '%H:%i') as time, count(Packets.pktIdx) as count
        FROM
            (SELECT time FROM TempTime) as TT
            LEFT OUTER JOIN Packets
                on HOUR(TT.time) = HOUR(Packets.Timestamp) AND Packets.result = 0 AND Packets.Timestamp >= DATE_SUB(CURDATE(), INTERVAL ? DAY) AND Packets.Timestamp <= CURDATE()
        GROUP BY TT.time;`;

    const [AbByTimeRows] = await connection.query(
        AbByTimeQuery, interval);
  
    return AbByTimeRows;
};


async function selectAbByDate(connection, interval) {
  
    const AbByDateQuery  = `
        SELECT DATE_FORMAT(TD.Date, '%Y-%m-%d') as date, count(Packets.pktIdx) AS count
        FROM (SELECT * FROM TempDate WHERE  date >= DATE_SUB(CURDATE(), INTERVAL ? DAY) AND date <= CURDATE() ) AS TD
            LEFT OUTER JOIN Packets
                on TD.Date = DATE_FORMAT(Packets.Timestamp, '%Y-%m-%d') AND Packets.result = 0
        GROUP BY TD.Date;`;

    const [AbByDateRows] = await connection.query(
        AbByDateQuery, interval);
  
    return AbByDateRows;
};



async function selectIndices(connection, pagingParams) {
  
    const selectIndicesListQuery = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        ORDER BY Packets.Timestamp LIMIT ? OFFSET ?;
                  `;
    const [selectIndiceRows] = await connection.query(
        selectIndicesListQuery, 
        pagingParams);
  
    return selectIndiceRows;
};


async function selectIndicesALL(connection) {
  
    const selectIndicesListALLQuery = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        ORDER BY Packets.Timestamp;
                  `;
    const [selectIndiceALLRows] = await connection.query(
        selectIndicesListALLQuery);
  
    return selectIndiceALLRows;
};



async function selectByFeat(connection) {
  
    var selectByFeatRows =[ [], [], [], [], [], [], [], [] ]; 

    const ranges = [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95];



    var eachCount;

    var selectByFeatQuery = ``;

    for (var i = 0; i<8 ; i++){
        switch(i){
            case 0 : selectByFeatQuery = `SELECT count(reconERR) as count FROM Packets WHERE ? <= FlowDuration AND FlowDuration < ?;`; break;
            case 1 : selectByFeatQuery = `SELECT count(reconERR) as count FROM Packets WHERE ? <= FlowBytes AND FlowBytes < ?;`; break;
            case 2 : selectByFeatQuery = `SELECT count(reconERR) as count FROM Packets WHERE ? <= FlowPackets AND FlowPackets < ?;`; break;
            case 3 : selectByFeatQuery = `SELECT count(reconERR) as count FROM Packets WHERE ? <= FlowIATMean AND FlowIATMean < ?;`; break;
            case 4 : selectByFeatQuery = `SELECT count(reconERR) as count FROM Packets WHERE ? <= FwdIATMean AND FwdIATMean < ?;`; break;
            case 5 : selectByFeatQuery = `SELECT count(reconERR) as count FROM Packets WHERE ? <= BwdIATMean AND BwdIATMean < ?;`; break;
            case 6 : selectByFeatQuery = `SELECT count(reconERR) as count FROM Packets WHERE ? <= ActiveMean AND ActiveMean < ?;`; break;
            case 7 : selectByFeatQuery = `SELECT count(reconERR) as count FROM Packets WHERE ? <= IdleMean AND IdleMean < ?;`; break;
        }            
        

        for(var j = 0; j<20 ; j++){

            let rg = ranges[j];
            let rg_end = rg + 0.05;

            const params = [ rg, rg_end];

            eachCount = await connection.query(selectByFeatQuery, params);  //{count : 2}
            eachCount = eachCount[0][0].count;
            console.log('eachCount : ', eachCount);

           // console.log('eachCount.count: ', eachCount.count);

            selectByFeatRows[i].push(eachCount);
        }
    }

    const FlowDuration = selectByFeatRows[0];
    const FlowBytes = selectByFeatRows[1];
    const FlowPackets = selectByFeatRows[2]
    const FlowIATMean = selectByFeatRows[3];
    const FwdIATMean = selectByFeatRows[4];
    const BwdIATMean = selectByFeatRows[5];
    const ActiveMean = selectByFeatRows[6];
    const IdleMean = selectByFeatRows[7];

    let finalResponse = {
        FlowDuration, 
        FlowBytes,
        FlowPackets,
        FlowIATMean,
        FwdIATMean,
        BwdIATMean,
        ActiveMean,
        IdleMean
    }

  
    return finalResponse;
};



async function selectFeed(connection, sort){

    var selectFeedQuery = ``;

    if(sort == 1){
        selectFeedQuery =`
            SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d') as date, count, SourceIP, DestinationIP,
                CASE
                    WHEN count < 50 THEN '경고'
                    WHEN count >= 50 AND count <100 THEN '주의'
                    WHEN count >= 100 THEN '위험'
                END AS alert
            FROM (
                SELECT Timestamp, count(Packets.pktIdx) as count, SourceIP, DestinationIP
                FROM Packets
                GROUP BY SourceIP) as filter
            ORDER BY filter.Timestamp desc LIMIT 10;
        `;
    }
    else if(sort == 2){
        selectFeedQuery =`
            SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d') as date, count, SourceIP, DestinationIP,
            CASE
                WHEN count < 50 THEN '경고'
                WHEN count >= 50 AND count <100 THEN '주의'
                WHEN count >= 100 THEN '위험'
            END AS alert
            FROM (
                SELECT Timestamp, count(Packets.pktIdx) as count, SourceIP, DestinationIP
                FROM Packets
                GROUP BY DestinationIP) as filter
            ORDER BY filter.Timestamp desc LIMIT 10;
        `;
    }

    

    const [selectFeedRows] = await connection.query(selectFeedQuery);
  
    return selectFeedRows;
}


async function selectNumOfAttack(connection, interval) {
  
    const numAttackQuery  = `
        SELECT Label, count(*) AS count FROM Packets
        WHERE Label <> 'BENIGN'
        GROUP BY Label ORDER BY count DESC;   
        `;

    const [numAttackRows] = await connection.query(
        numAttackQuery, interval);

    var result = [[],[]]

    for (x of numAttackRows){
        result[0].push(x.Label)
        result[1].push(x.count)
    }
  
    return result;
};


async function selectByAttack(connection, interval) {
  
    const abByAttackQuery  = `
    SELECT count(pkts.pktIdx) as count
    FROM TempLabel
    LEFT JOIN
        ( SELECT pktIdx, Label
            FROM Packets
            WHERE result = 0 AND Packets.Timestamp >= DATE_SUB(CURDATE(), INTERVAL ? DAY) AND Packets.Timestamp <= CURDATE()
        ) as pkts
    on pkts.Label = TempLabel.Label 
    WHERE TempLabel.Label <> 'BENIGN'
    GROUP BY TempLabel.Label;`;

    const [abByAttackRows] = await connection.query(
        abByAttackQuery, interval);

    var result = []

    for (x of abByAttackRows){
        result.push(x.count)
    }
    
    return result;
};



async function selectSearch1_pg(connection, params) {
  
    //src , dst , startAt , endAt , limit, offset

    const selectSearch1Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE SourceIP = ? AND DestinationIP = ? AND Date(Timestamp) >= ? AND Date(Timestamp) <= ?
        ORDER BY Packets.Timestamp LIMIT ? OFFSET ?;
                  `;
    const [selectSearch1Rows] = await connection.query(selectSearch1Query, params);
  
    return selectSearch1Rows;
};

async function selectSearch2_pg(connection, params) {
  
    //src , dst , startAt ,  limit, offset
  
    const selectSearch2Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE SourceIP = ? AND DestinationIP = ? AND Date(Timestamp) >= ?
        ORDER BY Packets.Timestamp LIMIT ? OFFSET ?;
                  `;
    const [selectSearch2Rows] = await connection.query(selectSearch2Query, params);
  
    return selectSearch2Rows;
};

async function selectSearch3_pg(connection, params) {
  
    //src , dst , endAt , limit, offset

    const selectSearch3Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE SourceIP = ? AND DestinationIP = ? AND Date(Timestamp) <= ?
        ORDER BY Packets.Timestamp LIMIT ? OFFSET ?;
                  `;
    const [selectSearch3Rows] = await connection.query(selectSearch3Query, params);
  
    return selectSearch3Rows;
};


async function selectSearch4_pg(connection, params) {
  
    //src , dst , limit, offset

    const selectSearch4Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE SourceIP = ? AND DestinationIP = ?
        ORDER BY Packets.Timestamp LIMIT ? OFFSET ?;
                  `;
    const [selectSearch4Rows] = await connection.query(selectSearch4Query, params);
  
    return selectSearch4Rows;
};


async function selectSearch5_pg(connection, params) {
  
    //src , startAt , endAt , limit, offset

    const selectSearch5Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE SourceIP = ? AND Date(Timestamp) >= ? AND Date(Timestamp) <= ?
        ORDER BY Packets.Timestamp LIMIT ? OFFSET ?;
                  `;
    const [selectSearch5Rows] = await connection.query(selectSearch5Query, params);
  
    return selectSearch5Rows;
};

async function selectSearch6_pg(connection, params) {
  
    //src ,startAt , limit, offset

    const selectSearch6Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE SourceIP = ? AND Date(Timestamp) >= ?
        ORDER BY Packets.Timestamp LIMIT ? OFFSET ?;
                  `;
    const [selectSearch6Rows] = await connection.query(selectSearch6Query, params);
  
    return selectSearch6Rows;
};


async function selectSearch7_pg(connection, params) {
  
    //src , endAt , limit, offset

    const selectSearch7Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE SourceIP = ? AND Date(Timestamp) <= ?
        ORDER BY Packets.Timestamp LIMIT ? OFFSET ?;
                  `;
    const [selectSearch7Rows] = await connection.query(selectSearch7Query, params);
  
    return selectSearch7Rows;
};


async function selectSearch8_pg(connection, params) {
  
    //src ,  limit, offset

    const selectSearch8Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE SourceIP = ? 
        ORDER BY Packets.Timestamp LIMIT ? OFFSET ?;
                  `;
    const [selectSearch8Rows] = await connection.query(selectSearch8Query, params);
  
    return selectSearch8Rows;
};


async function selectSearch9_pg(connection, params) {
  
    // dst , startAt , endAt , limit, offset

    const selectSearch9Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE DestinationIP = ? AND Date(Timestamp) >= ? AND Date(Timestamp) <= ?
        ORDER BY Packets.Timestamp LIMIT ? OFFSET ?;
                  `;
    const [selectSearch9Rows] = await connection.query(selectSearch9Query, params);
  
    return selectSearch9Rows;
};

async function selectSearch10_pg(connection, params) {
  
    // dst , startAt ,limit, offset

    const selectSearch10Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE DestinationIP = ? AND Date(Timestamp) >= ?
        ORDER BY Packets.Timestamp LIMIT ? OFFSET ?;
                  `;
    const [selectSearch10Rows] = await connection.query(selectSearch10Query, params);
  
    return selectSearch10Rows;
};


async function selectSearch11_pg(connection, params) {
  
    // dst , endAt ,limit, offset

    const selectSearch11Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE DestinationIP = ? AND Date(Timestamp) <= ?
        ORDER BY Packets.Timestamp LIMIT ? OFFSET ?;
                  `;
    const [selectSearch11Rows] = await connection.query(selectSearch11Query, params);
  
    return selectSearch11Rows;
};

async function selectSearch12_pg(connection, params) {
  
    // dst, limit, offset

    const selectSearch12Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE DestinationIP = ? 
        ORDER BY Packets.Timestamp LIMIT ? OFFSET ?;
                  `;
    const [selectSearch12Rows] = await connection.query(selectSearch12Query, params);
  
    return selectSearch12Rows;
};


async function selectSearch13_pg(connection, params) {
  
    // startAt , endAt, limit, offset

    const selectSearch13Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE Date(Timestamp) >= ? AND Date(Timestamp) <= ?
        ORDER BY Packets.Timestamp LIMIT ? OFFSET ?;
                  `;
    const [selectSearch13Rows] = await connection.query(selectSearch13Query, params);
  
    return selectSearch13Rows;
};


async function selectSearch14_pg(connection, params) {
  
    // startAt , limit, offset

    const selectSearch14Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE Date(Timestamp) >= ? 
        ORDER BY Packets.Timestamp LIMIT ? OFFSET ?;
                  `;
    const [selectSearch14Rows] = await connection.query(selectSearch14Query, params);
  
    return selectSearch14Rows;
};


async function selectSearch15_pg(connection, params) {
  
    // endAt, limit, offset

    const selectSearch15Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE Date(Timestamp) <= ?
        ORDER BY Packets.Timestamp LIMIT ? OFFSET ?;
                  `;
    const [selectSearch15Rows] = await connection.query(selectSearch15Query, params);
  
    return selectSearch15Rows;
};


async function selectSearch1(connection, params) {
  
    //src , dst , startAt , endAt ,  

    const selectSearch1Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE SourceIP = ? AND DestinationIP = ? AND Date(Timestamp) >= ? AND Date(Timestamp) <= ?
        ORDER BY Packets.Timestamp  ;
                  `;
    const [selectSearch1Rows] = await connection.query(selectSearch1Query, params);
  
    return selectSearch1Rows;
};

async function selectSearch2(connection, params) {
  
    //src , dst , startAt ,   
  
    const selectSearch2Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE SourceIP = ? AND DestinationIP = ? AND Date(Timestamp) >= ?
        ORDER BY Packets.Timestamp  ;
                  `;
    const [selectSearch2Rows] = await connection.query(selectSearch2Query, params);
  
    return selectSearch2Rows;
};

async function selectSearch3(connection, params) {
  
    //src , dst , endAt ,  

    const selectSearch3Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE SourceIP = ? AND DestinationIP = ? AND Date(Timestamp) <= ?
        ORDER BY Packets.Timestamp  ;
                  `;
    const [selectSearch3Rows] = await connection.query(selectSearch3Query, params);
  
    return selectSearch3Rows;
};


async function selectSearch4(connection, params) {
  
    //src , dst ,  

    const selectSearch4Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE SourceIP = ? AND DestinationIP = ?
        ORDER BY Packets.Timestamp  ;
                  `;
    const [selectSearch4Rows] = await connection.query(selectSearch4Query, params);
  
    return selectSearch4Rows;
};


async function selectSearch5(connection, params) {
  
    //src , startAt , endAt ,  

    const selectSearch5Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE SourceIP = ? AND Date(Timestamp) >= ? AND Date(Timestamp) <= ?
        ORDER BY Packets.Timestamp  ;
                  `;
    const [selectSearch5Rows] = await connection.query(selectSearch5Query, params);
  
    return selectSearch5Rows;
};

async function selectSearch6(connection, params) {
  
    //src ,startAt ,  

    const selectSearch6Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE SourceIP = ? AND Date(Timestamp) >= ?
        ORDER BY Packets.Timestamp  ;
                  `;
    const [selectSearch6Rows] = await connection.query(selectSearch6Query, params);
  
    return selectSearch6Rows;
};


async function selectSearch7(connection, params) {
  
    //src , endAt ,  

    const selectSearch7Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE SourceIP = ? AND Date(Timestamp) <= ?
        ORDER BY Packets.Timestamp  ;
                  `;
    const [selectSearch7Rows] = await connection.query(selectSearch7Query, params);
  
    return selectSearch7Rows;
};


async function selectSearch8(connection, params) {
  
    //src ,   

    const selectSearch8Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE SourceIP = ? 
        ORDER BY Packets.Timestamp  ;
                  `;
    const [selectSearch8Rows] = await connection.query(selectSearch8Query, params);
  
    return selectSearch8Rows;
};


async function selectSearch9(connection, params) {
  
    // dst , startAt , endAt ,  

    const selectSearch9Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE DestinationIP = ? AND Date(Timestamp) >= ? AND Date(Timestamp) <= ?
        ORDER BY Packets.Timestamp  ;
                  `;
    const [selectSearch9Rows] = await connection.query(selectSearch9Query, params);
  
    return selectSearch9Rows;
};

async function selectSearch10(connection, params) {
  
    // dst , startAt , 

    const selectSearch10Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE DestinationIP = ? AND Date(Timestamp) >= ?
        ORDER BY Packets.Timestamp  ;
                  `;
    const [selectSearch10Rows] = await connection.query(selectSearch10Query, params);
  
    return selectSearch10Rows;
};


async function selectSearch11(connection, params) {
  
    // dst , endAt , 

    const selectSearch11Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE DestinationIP = ? AND Date(Timestamp) <= ?
        ORDER BY Packets.Timestamp  ;
                  `;
    const [selectSearch11Rows] = await connection.query(selectSearch11Query, params);
  
    return selectSearch11Rows;
};

async function selectSearch12(connection, params) {
  
    // dst,  

    const selectSearch12Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE DestinationIP = ? 
        ORDER BY Packets.Timestamp  ;
                  `;
    const [selectSearch12Rows] = await connection.query(selectSearch12Query, params);
  
    return selectSearch12Rows;
};


async function selectSearch13(connection, params) {
  
    // startAt , endAt,  

    const selectSearch13Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE Date(Timestamp) >= ? AND Date(Timestamp) <= ?
        ORDER BY Packets.Timestamp  ;
                  `;
    const [selectSearch13Rows] = await connection.query(selectSearch13Query, params);
  
    return selectSearch13Rows;
};


async function selectSearch14(connection, params) {
  
    // startAt ,  

    const selectSearch14Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE Date(Timestamp) >= ? 
        ORDER BY Packets.Timestamp  ;
                  `;
    const [selectSearch14Rows] = await connection.query(selectSearch14Query, params);
  
    return selectSearch14Rows;
};


async function selectSearch15(connection, params) {
  
    // endAt,  

    const selectSearch15Query = `
        SELECT DATE_FORMAT(Timestamp, '%Y-%m-%d %H:%i:%s') as time,
        SourceIP as "src ip", DestinationIP as "dest ip",
        Protocol as protocol,  FlowDuration as "flow duration",
        FlowBytes as "flow bytes/s", FlowPackets as "flow packets/s",
        FlowIATMean as flowiatmean, FwdIATMean as fwdiatmean,
        BwdIATMean as bwdiatmean , ActiveMean as activemean,
        IdleMean as idlemean, result, Label
        FROM Packets
        WHERE Date(Timestamp) <= ?
        ORDER BY Packets.Timestamp  ;
                  `;
    const [selectSearch15Rows] = await connection.query(selectSearch15Query, params);
  
    return selectSearch15Rows;
};



module.exports = {
    selectDailyTotal,
    
    selectDailyTotalweek,

    selectDailyBenign,

    selectDailyAbnormal,

    selectToday,

    selectIndices,

    selectIndicesALL,


    selectAbByTime,

    selectAbByDate,

    selectSearch1_pg,
    selectSearch2_pg,
    selectSearch3_pg,
    selectSearch4_pg,
    selectSearch5_pg,
    selectSearch6_pg,
    selectSearch7_pg,
    selectSearch8_pg,
    selectSearch9_pg,
    selectSearch10_pg,
    selectSearch11_pg,
    selectSearch12_pg,
    selectSearch13_pg,
    selectSearch14_pg,
    selectSearch15_pg,


    selectSearch1,
    selectSearch2,
    selectSearch3,
    selectSearch4,
    selectSearch5,
    selectSearch6,
    selectSearch7,
    selectSearch8,
    selectSearch9,
    selectSearch10,
    selectSearch11,
    selectSearch12,
    selectSearch13,
    selectSearch14,
    selectSearch15,

    selectByFeat,
    selectFeed,
    selectNumOfAttack,
    selectByAttack  
};
