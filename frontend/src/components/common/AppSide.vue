<template>
  <div class="all">
  <div class="mdl-layout_drawer">
    <span class="mdl-layout-title"
      ><span class="mdl-layout-realtitle">두일이지</span></span
    >
    <nav class="mdl-navigation">
      <button class="sideBtn" @click="goHome" v-if="userId"><span class="btnText" > New</span></button>
      <button class="sideBtn" @click="goBefore" v-if="userId"><span class="btnText" >List</span></button>
      <button class="sideBtn" @click="goLogin"  v-if="!userId"><span class="btnText">Login</span></button>
      <button class="sideBtn" @click="goRegister" v-if="!userId"><span class="btnText" >Register</span></button>
      <button class="sideBtn" @click="goLogout" v-if="userId"><span class="btnText"  >LogOut</span></button>
      <button class="sideBtn" @click="goModal" v-if="userId"><span class="btnText"  >모달창</span></button>
      <button class="sideBtn" @click="goPrac" v-if="userId"><span class="btnText"  >배치연습</span></button>
     
      <button class="sideBtn" @click="goProps" v-if="pp"><span class="btnText"  >부모</span></button>
      <button class="sideBtn" @click="goCard" v-if="pp"><span class="btnText"  >자식</span></button>
    </nav>
  </div>
  </div>
</template>

<script >
import { mapGetters } from "vuex";
import '@/style/color.css'
export default {
   data() {
    return {
      pp:false  ,
      subject:'',
      picked:'1',
      contList:[null,null],
      count:2,
      cont:''
    };
  },
  computed:{
    ...mapGetters({
      userId:'GET_USERID'
    })
  },
  

  created(){
    this.getEmail();
  },
  methods: {
    goPrac(){
      this.$router.push('/common/AppMain')
    },
    goModal(){
      this.$router.push('/AppModal')
},
    goCard(){
      this.$router.push('/common/AppCard')
    },
    goProps(){
      this.$router.push('/common/AppProps')
    },
    goHome() {
      this.$router.push('/common/AppMake'); 
    },
    goBefore() {
      this.$router.push('/common/AppBefore');
    },
    goLogin() {
      this.$router.push('/common/AppLogin');
    },
    goRegister(){
      this.$router.push('/common/AppRegister')
    },
    goLogout(){
      this.$router.push('/common/AppLogout')
    },
    getEmail(){
      var localEmail = localStorage.getItem('email');
      console.log(localEmail)
      this.$store.commit('currentUser',localEmail)
      console.log('스테이트')
      console.log(this.$store.state.userId)
    }

    // getList() {
    //   this.$axios
    //     .get('http://localhost:3000/api/board')
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .then((err) => {
    //       console.log(err);
    //     });
    // },
  },
};
</script>

<style scoped>
    #modal.modal-overlay {
            
            z-index:9;
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.25);
            backdrop-filter: blur(1.5px);
            -webkit-backdrop-filter: blur(1.5px);
            border-radius: 10px;
            border: 1px solid rgba(8, 8, 8, 0.18);
        }
        #modal .modal-window {
            z-index:10;
            background:white;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
            backdrop-filter: blur( 13.5px );
            -webkit-backdrop-filter: blur( 13.5px );
            border-radius: 10px;
            border: 1px solid rgba( 255, 255, 255, 0.18 );
            width: 400px;
            height: 500px;
            top: -100px;
            padding: 10px;
        }
        #modal .title {
            padding-left: 10px;
            display: inline;
            color: rgb(0, 0, 0);
            
        }
        #modal .title h2 {
            display: inline;
        }
        #modal .close-area {
            display: inline;
            float: right;
            padding-right: 10px;
            cursor: pointer;
            
            color:grey;
        }
        
        #modal .content {
            margin-top: 20px;
            padding: 0px 10px;
            color: rgb(0, 0, 0);
            display: flex;
            flex-direction: column;
            
        }
@media screen and (min-width: 600px) {
	.btnText {
    font-size: 20px;
	}
  .mdl-layout-realtitle{
    font-size: 20px;
  }
}
.btnText{
white-space:nowrap;
}
.all{
     overflow-y:hidden;
   overflow-x:hidden;

  height: 100%;

  
}

.mdl-layout_drawer {
  display: flex;
  flex-direction: column;
  width: 15vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color:var(--color-grey);
    text-align: center;
  height: 100vh;
  min-width: 75px;

   
}
.mdl-layout-realtitle{
  line-height: 200px;




}
.mdl-layout-title {
  color: white;
  height: 200px;
  align-items:center; /* 방향이 row 기준: 세로 중앙 정렬*/
  background-color:var(--color-sideTop);

  
}
a {
  text-decoration: none;
  color: black;
}

.mdl-navigation {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  widows: 13vw;
  padding-top: 30px;  
}
.mdl-navigation_link {
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0;
  padding: 16px 40px;
  display: flex;
  
}
html,
body {
  margin: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.sideBtn {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  /* 생략 */
  margin: 0;
  padding: 0.5rem 1rem;
  background-color: rgb(208, 208, 208);
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  min-width: 75px;
  display: inline-block;
  padding-top: 20px;
  border: none;
  cursor: pointer;
  
}
</style>
