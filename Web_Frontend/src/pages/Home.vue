<template>
  <div>
    <div class="row">
      <div class="col-9">
        <!--Today Stats cards-->
          <div class="col-12">
            <div class="row">
            <h3>
              오늘 패킷 정보
              </h3>
              </div>

              <div class ="row">
                <div class ="col-4">
            <stats-card-edit>
              <div class="numbers" slot="content">
                <p>{{ todayTotalPacket.title }}</p>
                {{ todayTotalPacket.value }}
              </div>
            </stats-card-edit>
            </div>
            <div class ="col-4">
            <stats-card-edit>
              <div class="numbers" slot="content">
                <p>{{ todayBenignPacket.title }}</p>
                {{ todayBenignPacket.value }}
              </div>
             
            </stats-card-edit>
           </div>

                <div class ="col-4">
            <stats-card-edit>
              <div class="numbers" slot="content">
                <p>{{ todayAbnormalPacket.title }}</p>
                {{ todayAbnormalPacket.value }}
              </div>
             
            </stats-card-edit>
            </div>
            </div>
          </div>
        <div class="row">
          <!--Charts-->
          <div class="col-12">
            <chart-card-edit
              title="일자별 데이터량"
              sub-title="5월 넷째주"
              :chart-data="weekChart.data"
              :chart-options="weekChart.options"
              v-if="totalTraffic_loaded"
            >
              <span slot="footer">
                <i class="ti-reload"></i> Updated now
              </span>
              <div slot="legend">
                <i class="fa fa-circle text-info"></i> 전체
                <i class="fa fa-circle text-warning"></i> 정상
                <i class="fa fa-circle text-danger"></i> 비정상
              </div>
            </chart-card-edit>
          </div>
          
        </div>

          <!--AI Info Stats cards-->
          <div class="row">
            <div
              class="col-md-4"
              v-for="stats in aiStatsCards"
              :key="stats.title"
            >
              <stats-card-edit>
                <div class="numbers" slot="content">
                  <p>{{ stats.title }}</p>
                  {{ stats.value }}
                </div>
                <div class="stats" slot="footer">
                  <i :class="stats.footerIcon"></i> {{ stats.footerText }}
                </div>
              </stats-card-edit>
            </div>
          </div>
        
      </div>
    

    <!--Feed cards-->
    <div class="col-3">
      <div class="row" style="margin-bottom: 10px">
        <div class="col-5 ">
            <input type="radio" id="option1" name="name1" v-model="radioBtnFlag" value="1" @change="fetchFeedDataByType" checked>
            <label for="option1">src ip</label>
         
         </div>
         <div class="col-6">
            <input type="radio" id="option2" name="name1" v-model="radioBtnFlag" value="2" @change="fetchFeedDataByType" >
            <label for="option2">dest ip</label>
          </div>
          </div>
          <div style="overflow: scroll; height: 750px">
      <card class = "card-filled">

        <div class="row">
            <div
              class="col-md-12"
              v-for="(content,index) in riskFeedContents"
              :key="index"
            >
            <router-link :to="{ name: 'result', 
            query: { sourceIP: content.sourceIP, destinationIP: content.destinationIP, type: content.ipType, date: content.date } }">
              <risk-feed-card v-bind:alertName = content.alert>
                <div slot="alert">
                  <p>{{ content.alert }}</p>
                </div>
                <div slot="ipType">
                  <p>{{ content.ipType }}</p>
                </div>
                <div slot="IP">
                  <div v-if="radioBtnFlag == '1'">
                  <p>{{ content.sourceIP }}</p>
                  </div>
                  <div v-else>
                    <p>{{ content.destinationIP }}</p>
                    </div>
                </div>
                <div slot="date">
                  <p>{{ content.date }}</p>
                </div>
                <span slot="count">
                  {{ content.count }}
                </span>
                
              </risk-feed-card>
               </router-link>
            </div>
          </div>

      </card>
       </div>
    </div>
    </div>
  </div>
</template>
<script>
import { StatsCardEdit, ChartCardEdit, Card } from "@/components/index";
import RiskFeedCard from "./Home/RiskFeedCard.vue";
import Chartist from "chartist";
export default {
  components: {
    Card,
    StatsCardEdit,
    ChartCardEdit,
    RiskFeedCard,
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      radioBtnFlag : '1',
      totalTraffic_loaded: false,
      todayData_loaded: false,
      feedData_loaded: false,
      
      weekChart: {
        data: {
          labels: [],
          series: [[], [], []],
        },
        
        options: {
          low: 0,
          high: 1000,
          showArea: true,
          height: "280px",
          axisX: {
            showGrid: false,
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3,
          }),
          showLine: true,
          showPoint: false,
        },
      },
      todayTotalPacket: {
        title: "총 패킷수",
        value: "238742",
      },
       todayBenignPacket: {
        title: "정상 패킷수",
        value: "238742",
      },
       todayAbnormalPacket: {
        title: "비정상 패킷수",
        value: "238742",
      },
      weekTrueChart: {
        data: {
          labels: [],
          series: [[]],
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false,
          },
          height: "245px",
        },
      },
      weekFalseChart: {
        data: {
          labels: [],
          series: [[]],
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false,
          },
          height: "245px",
        },
      },
      aiStatsCards: [
        {
          title: "AI 모델 버전",
          value: "0.3.1",
          footerText: "Updated now",
          footerIcon: "ti-reload",
        },
        {
          title: "최근 학습 일자",
          value: "2022-03-21",
          footerText: "Updated now",
          footerIcon: "ti-reload",
        },
        {
          title: "누적 학습 데이터량",
          value: "90283",
          footerText: "Updated now",
          footerIcon: "ti-reload",
        },
      ],
      
      riskFeedContents: [
          {
          date: "",
          count: 0,
          sourceIP: "",
          destinationIP: "",
          alert: "",
          ipType: ""

        }
          
        ] 

    };
  },
  methods: {
    getTotalTrafficData(result) {
      const labels = [];
      const total_count = [];
      const benign_count = [];
      const abnormal_count = [];

      for(let i=0; i<result.length; i++){
        labels.push(result[i].date.substr(5,));
        total_count.push(result[i].totalCount);
        benign_count.push(result[i].benignCount);
        abnormal_count.push(result[i].abnormalCount);
      }

      this.weekChart.data.labels = labels;
      this.weekChart.data.series[0] = total_count;
      this.weekChart.data.series[1] = benign_count;
      this.weekChart.data.series[2] = abnormal_count;
      this.weekChart.options.high = Math.max(...total_count);
    },
    getTodayTrafficData(result) {
      var total = 0;
      var benign = 0;
      var abnormal = 0;

      total = result.total
      benign = result.benignCount
      abnormal = result.abnormalCount
     // total = 1
      this.todayTotalPacket.value = total
      this.todayBenignPacket.value = benign
      this.todayAbnormalPacket.value = abnormal
    },
    getAIData(result) {
      var version = 0;
      var trainedDate = 0;
      var trainedTotal = 0;

      version = result.version
      trainedDate = result.trainedDate.substr(0,10)
      trainedTotal = result.trainedTotal

      this.aiStatsCards[0].value = version
      this.aiStatsCards[1].value = trainedDate
      this.aiStatsCards[2].value = trainedTotal
     
    },
     getRiskFeedData(result) {
      
      var data = [];

      for (let i = 0; i < result.length; i++) {
        if(this.radioBtnFlag == 1){
          data.push({
          date: result[i].date,
         count: result[i].count,
          sourceIP: result[i].SourceIP,
         destinationIP: result[i].DestinationIP,
         alert: result[i].alert,
         ipType: "Source"
        })

        }else{
          data.push({
          date: result[i].date,
         count: result[i].count,
          sourceIP: result[i].SourceIP,
         destinationIP: result[i].DestinationIP,
         alert: result[i].alert,
         ipType: "Destination"
        })

        }
        
      }
      this.riskFeedContents = data

      
    },
    fetchData() {
      this.totalTraffic_loaded = false;
      this.benignTraffic_loaded = false;
      this.abnormalTraffic_loaded = false;
      this.todayData_loaded = false;
      this.feedData_loaded = false;
      this.aiData_loaded = false;

      this.$axios
        .get(`/packet/dailyTotal`)
        .then((res) => {
          this.getTotalTrafficData(res.data.result);
          this.totalTraffic_loaded = true;
        })
        .catch((error) => {
          alert("데이터를 불러오지 못했습니다.");
          console.log(error);
        });

     this.$axios
        .get(`/packet/today`)
        .then((res) => {
          this.getTodayTrafficData(res.data.result[0]);
          this.todayData_loaded = true;
        })
        .catch((error) => {
          alert("데이터를 불러오지 못했습니다.");
          console.log(error);
        });   
      this.$axios
        .get(`/model/info`)
        .then((res) => {
          this.getAIData(res.data.result[0]);
          this.aiData_loaded = true;
        })
        .catch((error) => {
          alert("데이터를 불러오지 못했습니다.");
          console.log(error);
       });   

       
    },
    fetchFeedDataByType(){
      
      this.$axios.get(`/packet/feed?sort=${this.radioBtnFlag}`)
        .then(res=>{
          this.getRiskFeedData(res.data.result)
          this.feedData_loaded = true;
         
        })
        .catch(error => {
          alert('데이터를 불러오지 못했습니다.');
          console.log(error);
        });
    },

  },
  created() {
    this.fetchData();
    this.fetchFeedDataByType();
  },
};
</script>
<style>
.card-body {
  padding: 15px 15px 10px 15px;
}

</style>
