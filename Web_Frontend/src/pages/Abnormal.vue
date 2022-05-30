<template>
  <div class="row">

    <!--로딩창-->
    <div class="layerPopup" v-if="loading"><div class="spinner"></div></div>

    <div class="col-12" style="margin-top:-20px; margin-bottom: 10px">
      <h3>시간대별 이상 트래픽 양</h3>
    </div>
    <div class="col-10">
      <chart-card :chart-data="trafficByTime.data"
                  :chart-options="trafficByTime.options"
                  v-if="bytime_loaded">
          <span slot="footer">
            <i class="fa fa-circle text-info"></i> 이상 트래픽 감지 횟수
          </span>
      </chart-card>
    </div>

    <div class="col-2">
      <card class="card-plain">
        <div class="col" style="margin:20px">
          <div class="row" style="margin-bottom: 10px">
            <input type="radio" id="option1" name="name1" v-model="trafficByTimeRadioBtn" value="1" @change="fetchTrafficDataByTime" checked>
            <label for="option1">일주일</label>
          </div>

          <div class="row" style="margin-bottom: 10px">
            <input type="radio" id="option2" name="name1" v-model="trafficByTimeRadioBtn" value="2" @change="fetchTrafficDataByTime">
            <label for="option2">한 달</label>
          </div>

          <div class="row" style="margin-bottom: 10px">
            <input type="radio" id="option3" name="name1" v-model="trafficByTimeRadioBtn" value="3" @change="fetchTrafficDataByTime">
            <label for="option3">세 달</label>
          </div>
        </div>
      </card>
    </div>

    <div class="col-12" style="margin-bottom: 10px">
      <h3>일자별 이상 트래픽 양</h3>
    </div>
    <div class="col-10">
      <chart-card :chart-data="trafficByDate.data"
                  :chart-options="trafficByDate.options"
                  v-if="bydate_loaded">
          <span slot="footer">
            <i class="fa fa-circle text-info"></i> 이상 트래픽 감지 횟수
          </span>
      </chart-card>
    </div>

    <div class="col-2">
      <card class="card-plain">
        <div class="col" style="margin:20px">
          <div class="row" style="margin-bottom: 10px">
            <input type="radio" id="option4" name="name2" v-model="trafficByDateRadioBtn" value="1" @change="fetchTrafficDataByDate" checked>
            <label for="option4">일주일</label>
          </div>

          <div class="row" style="margin-bottom: 10px">
            <input type="radio" id="option5" name="name2" v-model="trafficByDateRadioBtn" value="2" @change="fetchTrafficDataByDate">
            <label for="option5">한 달</label>
          </div>

          <div class="row" style="margin-bottom: 10px">
            <input type="radio" id="option6" name="name2" v-model="trafficByDateRadioBtn" value="3" @change="fetchTrafficDataByDate">
            <label for="option6">세 달</label>
          </div>
        </div>
      </card>
    </div>

    <div class="col-12" style="margin-bottom: 10px">
      <h3>특징별 이상 트래픽 양</h3>
    </div>

    <div class="col-md-6 col-12">
      <chart-card title="Flow Duration"
                  sub-title="Duration of the flow in Microsecond"
                  :chart-data="FlowDuration.data"
                  :chart-options="FlowDuration.options"
                  v-if="feature_loaded">
          <span slot="footer">
              <i class="fa fa-circle text-info"></i>  이상 트래픽 감지 횟수
          </span>
      </chart-card>
    </div>

    <div class="col-md-6 col-12">
      <chart-card title="Flow Bytes/s"
                  sub-title="Number of flow bytes per second"
                  :chart-data="FlowBytes.data"
                  :chart-options="FlowBytes.options"
                  v-if="feature_loaded">
          <span slot="footer">
              <i class="fa fa-circle text-info"></i> 이상 트래픽 감지 횟수
          </span>
      </chart-card>
    </div>

    <div class="col-md-6 col-12">
      <chart-card title="Flow Packets/s"
                  sub-title="Number of flow packets per second"
                  :chart-data="FlowPackets.data"
                  :chart-options="FlowPackets.options"
                  v-if="feature_loaded">
          <span slot="footer">
              <i class="fa fa-circle text-info"></i> 이상 트래픽 감지 횟수
          </span>
      </chart-card>
    </div>

    <div class="col-md-6 col-12">
      <chart-card title="Flow IAT Mean"
                  sub-title="Mean time between two packets sent in the flow"
                  :chart-data="FlowIATMean.data"
                  :chart-options="FlowIATMean.options"
                  v-if="feature_loaded">
          <span slot="footer">
              <i class="fa fa-circle text-info"></i> 이상 트래픽 감지 횟수
          </span>
      </chart-card>
    </div>

    <div class="col-md-6 col-12">
      <chart-card title="Fwd IAT Mean"
                  sub-title="Mean time between two packets sent in the forward direction"
                  :chart-data="FwdIATMean.data"
                  :chart-options="FwdIATMean.options"
                  v-if="feature_loaded">
          <span slot="footer">
              <i class="fa fa-circle text-info"></i> 이상 트래픽 감지 횟수
          </span>
      </chart-card>
    </div>

    <div class="col-md-6 col-12">
      <chart-card title="Bwd IAT Mean"
                  sub-title="Mean time between two packets sent in the backward direction"
                  :chart-data="BwdIATMean.data"
                  :chart-options="BwdIATMean.options"
                  v-if="feature_loaded">
          <span slot="footer">
              <i class="fa fa-circle text-info"></i> 이상 트래픽 감지 횟수
          </span>
      </chart-card>
    </div>

    <div class="col-md-6 col-12">
      <chart-card title="Active Mean"
                  sub-title="Mean time a flow was active before becoming idle"
                  :chart-data="ActiveMean.data"
                  :chart-options="ActiveMean.options"
                  v-if="feature_loaded">
          <span slot="footer">
              <i class="fa fa-circle text-info"></i> 이상 트래픽 감지 횟수
          </span>
      </chart-card>
    </div>

    <div class="col-md-6 col-12">
      <chart-card title="Idle Mean"
                  sub-title="Mean time a flow was idle before becoming active"
                  :chart-data="IdleMean.data"
                  :chart-options="IdleMean.options"
                  v-if="feature_loaded">
          <span slot="footer">
              <i class="fa fa-circle text-info"></i> 이상 트래픽 감지 횟수
          </span>
      </chart-card>
    </div>

  </div>

</template>
<script>
import { StatsCard, ChartCard } from "@/components/index";
import Chartist from 'chartist';
export default {
  components: {
    StatsCard,
    ChartCard
  },
  data(){
    return {
      trafficByTimeRadioBtn : '1',
      trafficByDateRadioBtn : '1',
      bytime_loaded : false,
      bydate_loaded : false,
      feature_loaded : false,
      loading : true,
      trafficByTime: {
        data: {
          labels: [],
          series: [[]],
        },
        options: {
          low: 0,
          high: 1000,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3
          }),
          showLine: true,
          showPoint: false
        }
      },
      trafficByDate: {
        data: {
          labels: [],
          series: [[]],
        },
        options: {
          low: 0,
          high: 1000,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3
          }),
          showLine: true,
          showPoint: false
        }
      },
      activityChart: {
        data: {
          labels: [],
          series: [
            []
          ]
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false
          },
          height: "245px"
        }
      },
      FlowDuration: {
        data: {
          labels: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95],
          series: [
            []
          ]
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false
          },
          height: "245px"
        }
      },
      FlowBytes: {
        data: {
          labels: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95],
          series: [
            []
          ]
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false
          },
          height: "245px"
        }
      },
      FlowPackets: {
        data: {
          labels: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95],
          series: [
            []
          ]
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false
          },
          height: "245px"
        }
      },
      FlowIATMean: {
        data: {
          labels: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95],
          series: [
            []
          ]
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false
          },
          height: "245px"
        }
      },
      FwdIATMean: {
        data: {
          labels: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95],
          series: [
            []
          ]
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false
          },
          height: "245px"
        }
      },
      BwdIATMean: {
        data: {
          labels: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95],
          series: [
            []
          ]
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false
          },
          height: "245px"
        }
      },
      ActiveMean: {
        data: {
          labels: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95],
          series: [
            []
          ]
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false
          },
          height: "245px"
        }
      },
      IdleMean: {
        data: {
          labels: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95],
          series: [
            []
          ]
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false
          },
          height: "245px"
        }
      },
    }
  },
  methods: {
    getTrafficByTime(result){
      const time_label = []
      const time_series = []

      for(let i=0; i<result.length; i++){
        time_label.push(result[i].time)
        time_series.push(result[i].count)
      }

      this.trafficByTime.data.labels = time_label;
      this.trafficByTime.data.series[0] = time_series;
      this.trafficByTime.options.high = Math.max(...time_series);
    },
    getTrafficByDate(result){
      const time_label = []
      const time_series = []

      for(let i=0; i<result.length; i++){
        if(this.trafficByDateRadioBtn==='3'){
          if(i % 3 === 0){
            time_label.push(result[i].date.substr(5,))
          }
          else{
            time_label.push("");
          }
        }else{
          time_label.push(result[i].date.substr(5,)) // 일단 연도 부분 자르도록 처리함
        }
        time_series.push(result[i].count)
      }

      this.trafficByDate.data.labels = time_label;
      this.trafficByDate.data.series[0] = time_series;
      this.trafficByDate.options.high = Math.max(...time_series);
    },
    getFeatureGraphData(result){
      this.FlowDuration.data.series[0] = result.FlowDuration;
      this.FlowDuration.options.high = Math.max(...result.FlowDuration);

      this.FlowBytes.data.series[0] = result.FlowBytes;
      this.FlowBytes.options.high = Math.max(...result.FlowBytes);

      this.FlowPackets.data.series[0] = result.FlowPackets;
      this.FlowPackets.options.high = Math.max(...result.FlowPackets);

      this.FlowIATMean.data.series[0] = result.FlowIATMean;
      this.FlowIATMean.options.high = Math.max(...result.FlowIATMean);

      this.FwdIATMean.data.series[0] = result.FwdIATMean;
      this.FwdIATMean.options.high = Math.max(...result.FwdIATMean);

      this.BwdIATMean.data.series[0] = result.BwdIATMean;
      this.BwdIATMean.options.high = Math.max(...result.BwdIATMean);

      this.ActiveMean.data.series[0] = result.ActiveMean;
      this.ActiveMean.options.high = Math.max(...result.ActiveMean);

      this.IdleMean.data.series[0] = result.IdleMean;
      this.IdleMean.options.high = Math.max(...result.IdleMean);
    },
    fetchTrafficDataByDate(){
      this.bydate_loaded = false;
      this.loading = true;

      this.$axios.get(`/packet/AbnbyDate?option=${this.trafficByDateRadioBtn}`)
        .then(res=>{
          this.getTrafficByDate(res.data.result);
          this.bydate_loaded = true;
          this.loading = false;
        })
        .catch(error => {
          alert('데이터를 불러오지 못했습니다.');
          console.log(error);
        });
    },
    fetchTrafficDataByTime(){
      this.bytime_loaded = false;
      this.loading = true;

      this.$axios.get(`/packet/AbnByTime?option=${this.trafficByTimeRadioBtn}`)
        .then(res=>{
          this.getTrafficByTime(res.data.result)
          this.bytime_loaded = true;
          this.loading = false;
        })
        .catch(error => {
          alert('데이터를 불러오지 못했습니다.');
          console.log(error);
        });
    },
    fetchFeatureGraphData(){
      this.feature_loaded = false;

      this.$axios.get('/packet/byFeat')
        .then(res=>{
          this.getFeatureGraphData(res.data.result);
          this.feature_loaded = true;
        })
        .catch(error=>{
          alert('데이터를 불러오지 못했습니다.');
          console.log(error);
        })
    }
  },
  created() {
    this.fetchTrafficDataByDate();
    this.fetchTrafficDataByTime();
    this.fetchFeatureGraphData();
  }
};
</script>
<style>
label {
  margin-left: 10px;
  font-size: 20px !important;
  vertical-align: center;
  position: relative;
  top: -5px;
}
input {
  width: 20px;
  height: 20px;
  border: 1px;
}

.layerPopup {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    rgba(0,0,0,0.4);
  z-index: 1000;
  justify-content: center;
  align-items: center;
}

.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spinner 2s linear infinite;
} @keyframes spinner { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

.ct-horizontal {
  position: relative;
  left: -11px;
  top: 3px;
}

</style>
