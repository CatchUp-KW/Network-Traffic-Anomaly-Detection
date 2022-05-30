<template>
  <div class="row">
    <div class="col-12" style="margin-top:-20px; margin-bottom: 10px">
      <h3>트래픽 이상탐지 결과</h3>
    </div>

    <!--검색창-->
    <div class="col-12">
      <card class="card-user">
        <div style="margin:10px">
          <div class="mb-3 row">
            <label for="inputSrcIp" class="col-sm-2 col-form-label">Src IP</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="inputSrcIp" v-model="inputSrcIp">
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputDestIp" class="col-sm-2 col-form-label">Dest IP</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="inputDestIp" v-model="inputDestIp">
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputStartDate" class="col-sm-2 col-form-label">Date</label>
            <div class="col-sm-4">
              <input type="date" class="form-control" id="inputStartDate" v-model="inputStartDate">
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputEndDate" class="col-sm-2 col-form-label">  </label>
            <div class="col-sm-4">
              <input type="date" class="form-control" id="inputEndDate" v-model="inputEndDate">
            </div>
          </div>
          <div class="row">
            <div class="col-12"><button v-on:click="fetchData" type="button" class="btn float-right" style="width: 130px; height:50px">SEARCH</button></div>
          </div>
        </div>
      </card>
    </div>

    <!--테이블-->
    <div class="col-12">
      <card class="card-plain">
        <div class="table-full-width table-responsive">
          <paper-table-edit type="hover" :title="table2.title" :sub-title="table2.subTitle" :data="table2.data"
                            :columns="table2.columns">
          </paper-table-edit>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { PaperTableEdit } from "@/components";
const tableColumns = ["Time", "Src IP", "Dest IP", "Protocol", "Flow Duration", "Flow Bytes/s", "Flow Packets/s", "FlowIATMean", "FwdIATMean", "BwdIATMean", "ActiveMean", "IdleMean", "Attack", "Result"];
const tableData = [];

export default {
  props : ['sourceIp','destinationIP','type','date'],
  components: {
    PaperTableEdit,
  },
  data() {
    return {
      inputSrcIp: "",
      inputDestIp: "",
      inputStartDate: "",
      inputEndDate: "",
      table2: {
        title: "Table on Plain Background",
        subTitle: "Here is a subtitle for this table",
        columns: [...tableColumns],
        data: [...tableData]
      }
    };
  },
  methods: {
    fetchData(){
      const src_ip = this.inputSrcIp.trim();
      const dest_ip = this.inputDestIp.trim();
      const start_date = this.inputStartDate;
      const end_date = this.inputEndDate;

      console.log(src_ip, dest_ip, start_date, end_date);

      this.$axios.get(`/packet/search?curPage=&pageSize=&src=${src_ip}&dst=${dest_ip}&startAt=${start_date}&endAt=${end_date}`)
        .then(res=>{
            this.table2.data = res.data.result;
        })
        .catch(error => {
          alert('데이터를 불러오지 못했습니다.');
          console.log(error);
        })
    }
  },
  created() {
    if(this.$route.query.type == "Source"){
       this.inputSrcIp = this.$route.query.sourceIP
       this.inputStartDate = this.$route.query.date
       this.inputEndDate = this.$route.query.date
    }else if(this.$route.query.type == "Destination"){
      this.inputDestIp = this.$route.query.destinationIP
      this.inputStartDate = this.$route.query.date
       this.inputEndDate = this.$route.query.date
    }

    this.fetchData();
  }
};
</script>
<style>
.form-control {
  background-color: #f4f3ee !important;
}

.col-form-label {
  color : #66615B !important;
  font-weight: 900 !important;
}
</style>
