<template>
  <div>
    
    <div class="page-container">
        <div class="login-form-container shadow">
            <div class="login-form-right-side">
              
                <div class="top-logo-wrap">
                    <div class="logo-img">
                <img src="@/assets/img/logo.png" />
            </div>
                </div>
                <br> 
                <h1>인공지능 기반 <br>네트워크 침입 탐지 대시보드</h1>  
               <br>
                 
              <br>

                <h5>In The Forest  X  Catch-Up </h5>
            </div>
            <div class="login-form-left-side">
                <div class="logo-img">
                
            </div>
                <div class="login-input-container">
                  <img src="@/assets/img/tomato_logo.png" width="50px" height="50px" />
                    <div class="login-input-wrap input-id">
                        <i class="ti-user"></i>
                        <input placeholder="ID" type="text" id="id" v-model="id">
                    </div>
                    <div class="login-input-wrap input-password">
                        <i class="ti-lock"></i>
                        <input placeholder="Password"  type="password" id="pw" v-model="password">
                    </div>
                </div>
                
                <div class="login-btn-wrap">
                    <button class="login-btn"  v-on:click="onSubmit" >Login</button>
                </div>
            </div>
        </div>
    </div>



  </div>
</template>
<script>
export default {
  data() {
    return {
      id: '',
      password: '',
    }
  },
  methods: {
    onSubmit() {
      this.id = this.id.trim()
      this.password = this.password.trim()

      if (this.id === '' || this.password === '') {
        alert('ID와 PW를 입력해주세요');
        return
      }

      this.$axios.post(`/user/login`, {
        ID: this.id,
        password: this.password
      })
      .then(res=>{
        const result = res.data.result
        if(!result){
          alert('존재하지 않는 계정입니다')
          return
        }

        this.$store.dispatch('signIn', result)
          .then(()=>{
            this.$router.push({name: 'home'})
        })
      })
      .catch(err=>{
        alert('오류가 발생했습니다.')
        console.log(err)
      })
    }
  }

};


</script>


