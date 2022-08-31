<template>
  <main class="all">
    <div class="page-content">
      <div class="questions">
        <p class="subject">{{ subject }}</p>

        <br />
      </div>
      <div class="questions" v-if="this.picked == 2">
        <p v-for="(item, index) in cont" v-bind:key="index">
          <input type="checkbox" v-model="newpicked" :value="item" />
          {{ item }}
          <progress
            v-if="resultShow == true"
            id="progress"
            :value="objcont[item]"
            min="0"
            :max="totalCount"
          ></progress>
          <span v-if="resultShow == true"
            >{{ objcont[item] }}표 ({{
              ((objcont[item] / this.count) * 100).toFixed(1)
            }}%)</span
          >
          
        </p>
        
      </div>

      <div class="questions" v-if="this.picked == 1">
        <p v-for="(item, index) in cont" v-bind:key="index">
          <input
            v-if="resultShow != true" type="radio" name="radioParents" v-model="onepicked" :value="item"
          />
          <span class="item">{{ item }}
          </span><!-- cont key만 있어서 objcont을 이용해 해당 키의 값 추출 진행률 기능추가-->
          <progress
            v-if="resultShow == true"
            id="progress"
            :value="objcont[item]"
            min="0"
            :max="totalCount"
          ></progress>
          <span v-if="resultShow == true">
            {{ objcont[item] }}표 ({{
              ((objcont[item] / totalCount) * 100).toFixed(1)
            }}%)</span
          >
        </p>
      </div>
      <span class="vtPer"
        >투표한 인원: <span class="vtNum">{{ count }}</span
        >명</span
      >

      <div class="checkyn">
        <span v-if="this.picked == 2">중복체크 가능</span>
        <span v-if="this.picked == 1">한개만 체크</span>
      </div>

  
      <button class="common-button" @click="saveVote" v-if="voteYN">
        투표하기
      </button>
      <button class="common-button-disabled"  v-if="!voteYN">
        투표완료
      </button>
      <!-- <span v-if="!voteYN">이미 투표를 하셨습니다.</span> -->
      <button class="common-button" @click="goResult">
        결과보기
      </button>
      <!-- <p class="clock"> 현재시간 {{now}}</p> -->
      <div class="clock"><a class="nowtime">현재시간</a><h1 class = "h1-clock"></h1></div>


    </div>
  </main>
</template>

<script>
/* eslint-disable */
import instance  from './api/interceptor'
import Vue from 'vue'
import '@/style/Button.css'

export default {
  data() {
    return {
      body: this.$route.query,
      subject: '',
      cont: '',
      view: '',
      num: this.$route.query.num,
      picked: '',
      newpicked: [],
      contList: '',
      onepicked: '',
      totalCount: 0,
      objcont: '', //fnGetView에서만 선언되어 있어 확인 불가능하여 선언함
      resultShow: false,
      now:"00:00:00",
      count:'',
      voteYN:false,
      memberPK:this.$store.state.userId,
      boardPK:this.$route.query.num

    };
  },
  mounted() {
    this.fnGetView()
    this.voteCheck2()
    // this.clock();
  },
  methods: {

    voteCheck(){
      this.voteYN=false;
    },
    getTime(){
        var clock = document.querySelector('.h1-clock')
        const time = new Date();
        const hour = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        clock.innerHTML = `${hour<10 ? `0${hour}`:hour}:${minutes<10 ? `0${minutes}`:minutes}:${seconds<10 ? `0${seconds}`:seconds}`
},
  realTime(){
    this.getTime();
    setInterval(this.getTime, 1000) 
  },
    fnCount(){
      console.log(this.count)
      console.log(((objcont[item] / this.count) * 100).toFixed(1))
    },
 
    goResult(){ //AppResult로 가는함수
       if(this.totalCount==0){
        alert('투표결과가 없습니다.')
        return;
      }
      this.$router.push({ path: '/common/AppResult', query: this.body });

    },
   time(e){ //실시간 시계 함수
    let date = new Date();
    
    this.now=
    
    
        date.getHours()+":" 
    + date.getMinutes()+":"
    +date.getSeconds();
   },

   clock(){
    this.time();
    setInterval(this.time,1000)
   }

 
    ,
    showResultVote() {
      // 결과 보여주기
      this.resultShow = !this.resultShow;
      
    },
    saveVote() {
      // 투표 저장
      if (this.resultShow) this.resultShow = !this.resultShow;

      if (this.picked == '1') {
        //단일 체크일떄
        if (this.onepicked == '') {
          //체크가 안되있을시 알람 발생

          return alert('선택해주십시오');
        }
        //querySelectorAll 이용하여 각각 데이터 배열로 가져오기 for문으로 한번에 해결 가능
        console.log(
          'picked 1',
          document.querySelectorAll(
            '.questions > p > input[type="radio"]:checked' // <--- 쿼리셀렉터 계층선택자 문법확인.
          )
        );
        this.objcont[this.onepicked]++;
      } else if (this.picked == '2') {
        if (this.newpicked.length == 0) {
          return alert('선택해주십시오');
        }
        console.log(
          'picked 2',
          document.querySelectorAll(
            '.questions > p > input[type="checkbox"]:checked'
          )
        );
        for (var i = 0; i < this.newpicked.length; i++) {
          this.objcont[this.newpicked[i]]++;
        }

        
      }
      let reqData = {
        num: this.num, //해당 투표게시물
        cont: JSON.stringify(this.objcont), //투표 JSON
        memberPK:this.$store.state.userId

      };

      console.log('중간에껴넣기')

      instance
        .post('http://192.168.0.89:3000/api/board/save', reqData)
        .then((res) => {
          console.log('res', res);
          if (res.status == 200) {
            alert('투표하셨습니다.')
            this.goVote();
            this.$router.push({ path: '/common/AppResult', query: this.body });
            //정상일떄
            //this.$router.push({ path: '/common/AppBefore', query: this.body });
            // this.$router.push({ path: '/common/AppResult', query: this.body });
          } else {
            alert('시스템 관리자에게 문의바랍니다.');
          }  

        })
        .catch((err) => {
          alert('세션이 만료되어 로그아웃합니다.')
          localStorage.removeItem('email'),
        localStorage.removeItem('password')
        localStorage.removeItem('voteYN')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userId')
        this.$store.commit('currentUser',null)
        this.$store.commit('currentToken',null)
        this.$store.commit('currentRefresh',null)
        this.$cookies.remove("accessToken");
        this.$cookies.remove("refreshToken");
        this.$cookies.remove("userId");
        this.$router.push('/')
});


    },
    goVote(){ //boardPK랑 memberPK axios 보내는 함수
      let reqData = {
        boardPK:this.num,
        memberPK:this.$store.state.userId
      }
      console.log(reqData)
      instance.post('http://192.168.0.89:3000/api/board/voteYN',reqData)
      .then((res)=>{
        console.log(res)
      })
    },
    voteCheck2(){ 
            var boardPK = this.num;
            var memberPK = this.$store.state.userId
            console.log(boardPK)
            console.log(memberPK)

            this.$axios.get(`http://192.168.0.89:3000/api/board/voteCheck?boardPK=${this.boardPK}&memberPK=${this.memberPK}`) 
            .then((res)=>{
                console.log(res.data)
                
                this.voteYN=res.data.result
                console.log(this.voteYN)
                
                
            })
        },
    fnGetView() {
      this.$axios
        .get('http://192.168.0.89:3000/api/board/' + this.body.num, {
          params: this.body,
        })
        .then((res) => {
          this.view = res.data.view[0];
          this.subject = this.view.subject;
          this.temp = this.view.cont.replace();
          this.contList = this.temp.split()[0];
          // string임!! contList를 객체화시켜야함..
          this.objcont = JSON.parse(this.contList);
          // 이게 진짜 객체
          this.cont = Object.keys(JSON.parse(this.view.cont));

          for (var item of Object.values(this.objcont)) {
            this.totalCount += item; // a, b, c
          }

          // 어레이
          this.picked = this.view.checkyn;
          this.count = this.view.count;
          this.realTime();
        })
        .catch((err) => {
          console.log(err);
        });
        console.log('여기밑에다가 mounted관련쓰기')
        const accessToken = Vue.$cookies.get('accessToken',accessToken)
        const refreshToken = Vue.$cookies.get('refreshToken',refreshToken)

      console.log('accessToken',accessToken)
      console.log('refreshToken',refreshToken)
      if(refreshToken==null){
        alert('세션이 만료되어 로그아웃합니다.')
        localStorage.removeItem('email'),
        localStorage.removeItem('password')
        localStorage.removeItem('voteYN')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userId')
        this.$store.commit('currentUser',null)
        this.$store.commit('currentToken',null)
        this.$store.commit('currentRefresh',null)
        this.$cookies.remove("accessToken");
        this.$cookies.remove("refreshToken");
        this.$cookies.remove("userId");
        this.$router.push('/')
      }

    },

    fnResult() {
      this.fnCheck();
      this.$router.push({ path: '/common/AppResult', query: this.body });
    },
  },
  watch: {
    newpicked: function () {
      //this.CheckTest();
    },
    onepicked: function () {
      //this.CheckConsole();
    },
  },
};
</script>

<style scoped>
.nowtime{
  font-size: 14px;
  font-weight: bold;
  

}

.clock {
  color:var(--color-header);
  font-size: 10px;
  padding-top: 30px;
  
}
.checkyn {
  color: grey;
  font-size: 12px;
  padding-bottom: 6px;
}
.subject {
  padding-top: 20px;
  font-size: 20px;
  word-break: break-all;
}
.mdl-button__ripple-container {
  background: rgba(158, 158, 158, 0.2);
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  background-color: rgb(255, 135, 155);
  padding: 10px 30px;
  margin: 20px;
  cursor: pointer;
}
.mdl-button__ripple-container2 {
  background: rgba(158, 158, 158, 0.2);
  
  background-color: rgb(182, 182, 182);
  padding: 10px 30px;
  margin: 20px;
}

a {
  text-decoration: none;
}

/* main {
  display: block;
} */
.mdl-layout_content {
  position: relative;
  display: inline-block;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  z-index: 1;
}
.page-content {
  text-align: center;
  padding: 16px;
}
.mdl-textfield {
  position: relative;
  font-size: 16px;
  display: inline-block;
  box-sizing: border-box;
  width: 300px;
  max-width: 100%;
  margin: 0;
  padding: 20px 0;
}
.questions {
  border: 1px solid #aaa;
  border-radius: 8px;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
}
.answers,
.questions {
  margin: 16px auto;
  padding: 0 16px;
  max-width: 400px;
  background-color: #fff;
}
/* div {
  display: block;
} */
.mdl-textfield__input {
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  display: block;
  font-size: 16px;
  font-family: 'Helvetica', 'Arial', sans-serif;
  margin: 0;
  padding: 4px 0;
  width: 100%;
  background: 0 0;
  text-align: left;
  color: inherit;
}
/* .mdl-textfield__label {
  bottom: 0;
  color: rgba(0, 0, 0, 0.26);
  font-size: 16px;
  left: 0;
  right: 0;
  pointer-events: none;
  position: absolute;
  display: block;
  top: 24px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
} */

label {
  cursor: default;
}
.mdl-layout--fixed-drawer > .mdl-layout__content {
  margin-left: 240px;
}
html,
body {
  font-family: 'Helvetica', 'Arial', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}
.mdl-layout--fixed-drawer > .mdl-layout__content {
  margin-left: 240px;
}
.getUnselected {
  color: #aaa;
}
.answers {
  border: 1px solid #ccc;
  border-radius: 8px;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
}
.mdl-button {
  background: 0 0;
  border: none;
  border-radius: 2px;
  color: #000;
  position: relative;
  height: 36px;
  margin: 0;
  min-width: 64px;
  padding: 0 16px;
  display: inline-block;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0;
  overflow: hidden;
  will-change: box-shadow;
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1),
    background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  line-height: 36px;
  vertical-align: middle;
}
.mdl-button--accent.mdl-button--accent.mdl-button--raised,
.mdl-button--accent.mdl-button--accent.mdl-button--fab {
  color: rgb(66, 66, 66);
  background-color: rgb(178, 255, 89);
}
.mdl-button--accent.mdl-button--accent {
  color: rgb(178, 255, 89);
}
.mdl-button--raised {
  background: rgba(158, 158, 158, 0.2);
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
}
a,
.mdl-accordion,
.mdl-button,
.mdl-card,
.mdl-checkbox,
.mdl-dropdown-menu,
.mdl-icon-toggle,
.mdl-item,
.mdl-radio,
.mdl-slider,
.mdl-switch,
.mdl-tabs__tab {
  -webkit-tap-highlight-color: transparent;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}
button {
  appearance: auto;
  writing-mode: horizontal-tb !important;

  text-rendering: auto;

  letter-spacing: normal;
  word-spacing: normal;
  line-height: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: center;
  align-items: flex-start;
  cursor: default;
  box-sizing: border-box;

  margin: 0em;
  padding: 1px 6px;
  border-width: 2px;
  border-style: outset;
  border-image: initial;
}
.vtNum {
  font-size: 14px;
  color: rgb(185, 81, 98);
}
.vtPer {
  font-size: 12px;
  color: grey;
}
.item{
  word-break: break-all
}
</style>
