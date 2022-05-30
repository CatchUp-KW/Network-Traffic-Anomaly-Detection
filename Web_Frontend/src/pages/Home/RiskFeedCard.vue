<template>


  <card class="card-feed">
       <div class="row">
      <div class="offset-8">
        
        <div v-if="alertName == '위험'">
         <card class = "card-red" style=" width: 60px; height: 5px" >
           
          <h6 class="text-center bold">
          <slot name="alert"></slot>
         </h6>
          </card>
          </div>

          <div v-else-if="alertName == '주의'">
          <card class = "card-orange" style=" width: 60px; height: 5px" >
            <h6 class="text-center bold">
          <slot name="alert"></slot>
          </h6>
            </card>
          </div>

          <div v-else >
             <card class = "card-yellow" style=" width: 60px; height: 5px" >
               <h6 class="text-center bold">
          <slot name="alert"></slot>
          </h6>
               </card>
               </div>
               </div>
        </div>
       
      
      <h4 class="text-center">
        <slot name="ipType"></slot>
        <slot name="IP"></slot>
         
    </h4>
    
    
    <div>
        <p class="description text-center bold">
            <slot name="date"></slot>
      </p>
    </div>

    <h6 class="text-right">
    관련 패킷 <slot name="count"></slot>건
    </h6>
   
  
  </card>
 
</template>

<script>
export default {
  name: 'RiskFeedCard',
  props : ['alertName'],
  data() {
    return {
     details :{
          date: "2022-02-28",
          count: 12,
          sourceIP: "",
          destinationIP: "192.168.1.255",
          alert: '위험',
          ipType: ""

        },
    };
  },
  methods: {
   
  }
};
</script>
<style>
h6{
    color: #f35337
}
</style>
