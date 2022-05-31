from importlib_metadata import version
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import tensorflow as tf

from tensorflow.python.keras.layers import Input, Dense
from tensorflow.python.keras import layers, losses
from tensorflow.python.keras.models import Model, load_model

from flask import Flask, url_for, redirect, render_template, request, jsonify, make_response
from flask_mysqldb import MySQL
from flask_restful import Resource, Api

from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler, StandardScaler, RobustScaler
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from sqlalchemy import create_engine

import MySQLdb
import pymysql
import seaborn as sns
import re
import datetime
import os
import shutil
import glob
import json
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

#Flask Restful API로 읽어들일 APP을 지정
app = Flask(__name__) #Flask 객체
api = Api(app)
db = MySQL (app)

#Flask router 설정
@app.route("/")
def main():
    csv_path = 'C:\\Users\\정원\\Desktop\\Garden\\광운대학교\\케챱\\CIC\\csv'
    done_path = 'C:\\Users\\정원\\Desktop\\Garden\\광운대학교\\케챱\\CIC\\done'
    all_files = glob.glob(csv_path + "/*.csv")

    for filename in all_files:
        data = pd.read_csv(filename)
        shutil.move(filename, done_path)
        break

    data["Timestamp"] = data["Timestamp"].str.replace('오전', 'AM', regex=True).replace('오후', 'PM',regex=True)
    data["Timestamp"] = pd.to_datetime(data["Timestamp"])

    protocol_value = {
        0 : 'HOPPORT',
        1 : 'ICMP',
        2 : 'IGMP',
        3 : 'GGP',
        4 : 'IPv4',
        5 : 'ST',
        6 : 'TCP',
        7 : 'CBT',
        8 : 'EGP',
        9 : 'IGP',
        10 : 'BBN-RCC-MON',
        11 : 'NVP-II',
        12 : 'PUP',
        13 : 'ARGUS',
        14 : 'EMCON',
        15 : 'XNET',
        16 : 'CHAOS',
        17 : 'UDP',
        18 : 'MUX',
        19 : 'DCN-MEAS',
        20 : 'HMP',
        21 : 'PRM',
        22 : 'XNS-IDP',
        23 : 'TRUNK-1',
        24 : 'TRUNK-2',
        25 : 'LEAF-1',
        26 : 'LEAF-2',
        27 : 'RDP',
        28 : 'IRTP',
        29 : 'ISO-TP4',
        30 : 'NETBLT',
        31 : 'MFE-NSP',
        32 : 'MERIT-INP',
        33 : 'DCCP',
        34 : '3PC',
        35 : 'IDPR',
        36 : 'XTP',
        37 : 'DDP',
        38 : 'IDPR-CMTP',
        39 : 'TP++',
        40 : 'IL',
        41 : 'IPv6',
        42 : 'SDRP',
        43 : 'IPv6-Route',
        44 : 'IPv6-Frag',
        45 : 'IDRP',
        46 : 'RSVP',
        47 : 'GRE',
        48 : 'DSR',
        49 : 'BNA',
        50 : 'ESP',
        51 : 'AH',
        52 : 'I-NLSP',
        53 : 'SWIPE',
        54 : 'NARP',
        55 : 'MOBILE',
        56 : 'TSLP',
        57 : 'SKIP',
        58 : 'IPv6-ICMP',
        59 : 'IPv6-NoNxt',
        60 : 'IPv6-Opts',
        61 : 'UNKNOWN',
        62 : 'CFTP',
        63 : 'UNKNOWN',
        64 : 'SAT-EXPAK',
        65 : 'KRYPTOLAN',
        66 : 'RVD',
        67 : 'IPPC',
        68 : 'UNKNOWN',
        69 : 'SAT-MON',
        70 : 'VISA',
        71 : 'IPCV',
        72 : 'CPNX',
        73 : 'CPHB',
        74 : 'WSN',
        75: 'PVP',
        76 : 'BR-SAT-MON',
        77 : 'SUN-ND',
        78 : 'WB-MON',
        79 : 'WB-EXPAK',
        80 : 'ISO-IP',
        81 : 'VMTP', 
        82 : 'SECURE-VMTP',
        83 : 'VINES',
        84 : 'TTP/IPTM',
        85 : 'NSFNET-IGP',
        86 : 'DGP',
        87 : 'TCF',
        88 : 'EIGRP',
        89 : 'OSPF',
        90 : 'Sprite-RPC',
        91 : 'LARP',
        92 : 'MTP',
        93 : 'AX.25',
        94 : 'OS',
        95 : 'MICP',
        96 : 'SCC-SP',
        97 : 'ETHERIP',
        98 : 'ENCAP',
        99 : 'UNKNOWN',
        100 : 'GMTP',
        101 : 'IFMP',
        102 : 'PNNI',
        103 : 'PIM',
        104 : 'ARIS',
        105 : 'SCPS',
        106 : 'QNX',
        107 : 'A/N',
        108 : 'IPComp',
        109 : 'SNP',
        110 : 'Compaq-Peer',
        111 : 'IPX-in-IP',
        112 : 'VRRP',
        113 : 'PGM',
        114 : 'UNKNOWN',
        115 : 'L2TP',
        116 : 'DDX', 
        117 : 'IATP',
        118 : 'STP',
        119 : 'SRP',
        120 : 'UTI',
        121 : 'SMP',
        122 : 'SM',
        123 : 'PTP',
        124 : 'IS-IS over IPv4',
        125 : 'FIRE',
        126 : 'CRTP',
        127 : 'CRUDP',
        128 : 'SSCOPMCE',
        129 : 'IPLT',
        130 : 'SPS',
        131 : 'PIPE',
        132 : 'SCTP',
        133 : 'FC',
        134 : 'RSVP-E2E-IGNORE',
        135 : 'Mobility Header',
        136 : 'UDPLite',
        137 : 'MPLS-in-IP',
        138 : 'manet',
        139 : 'HIP',
        140 : 'Shim6',
        141 : 'WESP',
        142 : 'ROHC',
        143 : 'Ethernet',
        253 : 'UNKNOWN',
        254 : 'UNKNOWN', 
        255 : 'Reserved'

    }

    data = data.replace({'Protocol' : protocol_value})

    details = ["Timestamp", "Src IP", "Src Port", "Dst IP", "Dst Port", "Protocol"]
    main_features = ["Flow Duration", "Flow Bytes/s", "Flow Packets/s", "Flow IAT Mean",
                    "Fwd IAT Mean", "Bwd IAT Mean", "Active Mean", "Idle Mean"]

    dataset = data[main_features]

    Z = data[details]

    dataset = dataset.apply(pd.to_numeric, errors='coerce')
    dataset = dataset.dropna(axis=0)

    dataset = dataset.replace([np.inf, -np.inf], np.nan)
    dataset.dropna(inplace = True)

    scaler = MinMaxScaler()
    scaler.fit(dataset)
    dataset = scaler.transform(dataset)

    ## Autoencoder

    model_path = 'C:\\Users\\정원\\Desktop\\Garden\\광운대학교\\케챱\\MODEL_TEST\\autoencoder.h5'
    autoencoder = tf.keras.models.load_model(model_path)

    predictions = autoencoder.predict(dataset)

    loss = tf.keras.losses.mae(predictions, dataset) #reconstruction error
    threshold = np.mean(loss) + np.std(loss)

    predicted_label = tf.math.less(loss, threshold)

    ## Save the result

    dataset = pd.DataFrame(dataset, columns=main_features[0:8])
    Z = pd.DataFrame(Z, columns=details[0:6])

    reconstruction = pd.DataFrame(loss, columns=["recon ERR"])
    result = pd.DataFrame(predicted_label, columns=["result"])

    dataset = Z.merge(dataset, how='outer', left_index=True, right_index=True)
    dataset = dataset.merge(reconstruction, how='outer', left_index=True, right_index=True)
    dataset = dataset.merge(result, how='outer', left_index=True, right_index=True)

    dataset.columns = ['Timestamp', 'SourceIP', 'SourcePort', 'DestinationIP', 'DestinationPort', 'Protocol', 'FlowDuration', 'FlowBytes', 'FlowPackets', 'FlowIATMean', 'FwdIATMean', 'BwdIATMean', 'ActiveMean', 'IdleMean', 'reconERR', 'result']

    ## MySQL
    pymysql.install_as_MySQLdb()
    
    engine = create_engine("mysql+mysqldb://master:"+"tomatocatchup"+"@webdashboarddb.chrqiv0hwpum.ap-northeast-2.rds.amazonaws.com:3306/webDashboard?charset=utf8",encoding='utf-8')
    conn = engine.connect()
    dataset.to_sql(name='Test', con=engine, if_exists='append', index=False )
    conn.close()
      
    return 'Model Server for Catchup!'

##excute server

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=1819)

