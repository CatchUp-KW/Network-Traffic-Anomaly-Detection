<template>
  <div class="row">
    <div class="col-12" style="margin-top:-20px; margin-bottom: 10px">
      <h3>공격 유형별 발생 빈도</h3>
    </div>

    <div class="col-7">
      <chart-card :chart-data="attackFrequency.data"
                  chart-type="Pie"
                  :chart-options="attackFrequency.options"
                  v-if="attackFrequency_loaded">
          <span slot="footer">
            <i class="fa fa-circle text-info"></i> DDoS
          </span>
          <span slot="footer">
            <i class="fa fa-circle text-warning"></i> DoS_GoldenEye
          </span>
          <span slot="footer">
            <i class="fa fa-circle text-danger"></i> DoS_Hulk
          </span>
          <span slot="footer">
            <i class="fa fa-circle text-success"></i> DoS_Slowhttptest
          </span>
      </chart-card>
    </div>

    <div class="col-2">
      <card class="card-plain">
        <div class="col" style="margin:20px">
          <div class="row" style="margin-bottom: 10px">
            <input type="radio" id="option1" name="name1" v-model="frequency_option" value="1"
                   @change="fetchFrequencyData" checked>
            <label for="option1">일주일</label>
          </div>

          <div class="row" style="margin-bottom: 10px">
            <input type="radio" id="option2" name="name1" v-model="frequency_option" value="2"
                   @change="fetchFrequencyData">
            <label for="option2">한 달</label>
          </div>

          <div class="row" style="margin-bottom: 10px">
            <input type="radio" id="option3" name="name1" v-model="frequency_option" value="3"
                   @change="fetchFrequencyData">
            <label for="option3">세 달</label>
          </div>
        </div>
      </card>
    </div>

    <div class="col-12" style="margin-bottom: 10px">
      <h3>공격 유형별 이상 탐지 횟수</h3>
    </div>

    <div class="col-10">
      <chart-card :chart-data="attackAbnormal.data"
                  chart-type="Bar"
                  
                  v-if="attackAbnormal_loaded">
          <span slot="footer">
            <i class="fa fa-circle text-info"></i> 이상 트래픽 감지 횟수
          </span>
      </chart-card>
    </div>

    <div class="col-2">
      <card class="card-plain">
        <div class="col" style="margin:20px">
          <div class="row" style="margin-bottom: 10px">
            <input type="radio" id="option4" name="name2" v-model="abnormal_option" value="1"
                   @change="fetchAbnormalData" checked>
            <label for="option4">일주일</label>
          </div>

          <div class="row" style="margin-bottom: 10px">
            <input type="radio" id="option5" name="name2" v-model="abnormal_option" value="2"
                   @change="fetchAbnormalData">
            <label for="option5">한 달</label>
          </div>

          <div class="row" style="margin-bottom: 10px">
            <input type="radio" id="option6" name="name2" v-model="abnormal_option" value="3"
                   @change="fetchAbnormalData">
            <label for="option6">세 달</label>
          </div>
        </div>
      </card>
    </div>

  </div>
</template>

<script>
import {ChartCard} from "@/components";

export default {
  components: {
    ChartCard
  },
  data() {
    return {
      attackFrequency_loaded: false,
      attackAbnormal_loaded: false,
      frequency_option: 1,
      abnormal_option: 1,
      attackFrequency: {
        data: {
          labels: [" ", " ", " "," "],
          series: [62, 32, 6]
        },
        options: {
          donut: true,
          donutWidth: 60,
          labelDirection: 'explode',
           labelOffset: 35,
           chartPadding: 20
        }
      },
      attackAbnormal: {
        data: {
          labels: [],
          series: [[]]
        },
        options: {}
      }
    }
  },
  methods: {
    fetchFrequencyData() {
      this.attackFrequency_loaded = false;
      this.$axios.get(`/packet/numOfAttack?option=${this.frequency_option}`)
        .then(res => {
          this.getFrequencyData(res.data.result)
          this.attackFrequency_loaded = true;
        })
        .catch(error => {
          alert('데이터를 불러오지 못했습니다.');
          console.log(error);
        });
    },
    fetchAbnormalData() {
      this.attackAbnormal_loaded = false;
      this.$axios.get(`/packet/byAttackType?option=${this.abnormal_option}`)
        .then(res => {
          this.getAbnormalData(res.data.result)
          console.log(res.data.result)
          this.attackAbnormal_loaded = true;
        })
        .catch(error => {
          alert('데이터를 불러오지 못했습니다.');
          console.log(error);
        });
    },
    getFrequencyData(result) {
      this.attackFrequency.data.labels = result[0]
      this.attackFrequency.data.series = result[1]
    },
    getAbnormalData(result) {
      this.attackAbnormal.data.labels = result[0]
      this.attackAbnormal.data.series[0] = result[1]
    }
  },
  created() {
    this.fetchAbnormalData()
    this.fetchFrequencyData()
  }
}
</script>
<style>
.ct-label.ct-horizontal {
  margin-left: 15px;
  word-break: break-word;
  position: relative !important;
  width: 50px !important;
  height: 50px !important;
}

.ct-bar {
  stroke-width: 30px !important; /*막대 그래프 굵기*/
}

.ct-bar:nth-child(1) {
  stroke: #FCE3F4 !important; /*막대 그래프별 색상*/
}

.ct-bar:nth-child(2) {
  stroke: #FAC4EA !important;
}

.ct-bar:nth-child(3) {
  stroke: #FAB8E6 !important;
}

.ct-bar:nth-child(4) {
  stroke: #F7A0DE !important;
}

.ct-bar:nth-child(5) {
  stroke: #F376CF !important;
}

.ct-bar:nth-child(6) {
  stroke: #ED4EC2 !important;
}

.ct-bar:nth-child(7) {
  stroke: #EC3DBC !important;
}

.ct-bar:nth-child(8) {
  stroke: #E534BC !important;
}

.ct-bar:nth-child(9) {
  stroke: #C728BD !important;
}

.ct-bar:nth-child(10) {
  stroke: #A017BE !important;
}

.ct-bar:nth-child(11) {
  stroke: #8D0FBF !important;
}

.ct-bar:nth-child(12) {
  stroke: #7304bf !important;
}

.ct-bar:nth-child(13) {
  stroke: #4B0586 !important;
}
.ct-bar:nth-child(14) {
  stroke: #420579 !important;
}
</style>
