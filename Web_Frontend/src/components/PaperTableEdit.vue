<template>
<div>
  <table class="table" :class="tableClass">
    <thead>
    <slot name="columns">
      <th v-for="column in columns" :key="column">{{column}}</th>
    </slot>
    </thead>
    <tbody>
    <tr v-for="(item, index) in paginatedData" :key="index">
      <slot :row="item">
        <td>{{item["time"]}}</td>
        <td>{{item["src ip"]}}</td>
        <td>{{item["dest ip"]}}</td>
        <td>{{item["protocol"]}}</td>
        <td>{{item["flow duration"]}}</td>
        <td>{{item["flow bytes/s"]}}</td>
        <td>{{item["flow packets/s"]}}</td>
        <td>{{item["flowiatmean"]}}</td>
        <td>{{item["fwdiatmean"]}}</td>
        <td>{{item["bwdiatmean"]}}</td>
        <td>{{item["activemean"]}}</td>
        <td>{{item["idlemean"]}}</td>
        <td>{{item["Label"]}}</td>
        <td><img :src="getIconUrl(item['result'])" width="30"></td>
      </slot>
    </tr>
    </tbody>
  </table>

  <!--페이지네이션-->
  <div class="btn-cover col-12 text-center">
    <button :disabled="pageNum === 0" @click="prevPage" class="btn">이전</button>
    <span class="page-count" style="margin-left: 10px; margin-right: 10px">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
    <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="btn">다음</button>
  </div>

</div>
</template>
<script>
export default {
  name: 'paper-table-edit',
  data(){
    return {
      pageNum: 0
    }
  },
  props: {
    columns: Array,
    data: Array,
    type: {
      type: String, // striped | hover
      default: "striped"
    },
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    },
    pageSize: {
      type: Number,
      required: false,
      default: 10
    }
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    },
    pageCount () {
      let listLeng = this.data.length,
        listSize = this.pageSize,
        page = Math.floor(listLeng / listSize);
      if(listLeng===0) return 1;
      if (listLeng % listSize > 0) page += 1;
      return page;
    },
    paginatedData () {
      const start = this.pageNum * this.pageSize,
        end = start + this.pageSize;
      return this.data.slice(start, end);
    }
  },
  methods: {
    /*
    모델 판정 결과값에 따라 해당하는 이미지 경로 반환
    result : boolean
     */
    getIconUrl(result) {
      const true_icon = require('@/assets/img/true.png')
      const false_icon = require('@/assets/img/false.png')

      return result?true_icon:false_icon;
    },
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    }
  }
};
</script>
<style>
</style>
