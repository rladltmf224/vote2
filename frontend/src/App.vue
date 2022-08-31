<template>
    <div id="app">
    <!-- 추가된 헤더 컴포넌트 사용 -->
    
    
      <div class="appside"><AppSide /></div>
      <div class="subapp">
      <div class="appheader"><AppHeader /></div>
      <div class="helloworld"><HelloWorld/></div>

      </div>
    </div>
    <!-- 추가된 풋터 컴포넌트 사용 -->
</template>

<script>
import '@/style/color.css';
import AppHeader from './components/common/AppHeader'; //import 헤더 추가
import HelloWorld from './components/HelloWorld.vue';
import AppSide from './components/common/AppSide.vue';

export default {
  created(){
    this.getEmail();
  },
  computed:{
   
  },
  name: 'App',
  components: {
    AppHeader, //헤더 컴포넌트 추가
    HelloWorld,
    AppSide,
  },
  methods:{
    getEmail(){
      var localEmail = localStorage.getItem('email');
      console.log(localEmail)
      this.$store.commit('currentUser',localEmail)
      console.log('스테이트')
      console.log(this.$store.state.userId)
    }
  }
};
</script>

<style>
.clock{
  display: none;
}
#app{
  display: flex;
  height: 100vh;
}
html,body{
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;

}

.appheader{
  height: 10vh;
  width:70vw;
}
.helloworld{
  height: 90vh;
  text-align: center;
  overflow-y: auto;
}
.subapp{
  width: 85vw;
}
.appside{
  width: max-content;
  height: 100vh;
}
</style>
